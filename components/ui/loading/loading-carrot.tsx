// components/LoadingCarrot.tsx

import React from "react";
import { motion } from "framer-motion";
import { CSSProperties } from "react";

interface LoadingCarrotProps {
  text?: String;
}

const LoadingCarrot: React.FC<LoadingCarrotProps> = ({
  text,
}: LoadingCarrotProps) => {
  const loadingContainer: CSSProperties = {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const carrotAnimation = {
    animate: {
      color: ["#ff0000", "#00ff00", "#0000ff", "#ff0000"], // Cycle through colors
      transition: { duration: 2, loop: Infinity, ease: "linear" },
    },
  };

  const dotAnimation = {
    animate: {
      opacity: [0, 1, 0],
      transition: { duration: 1, loop: Infinity, ease: "linear" },
    },
  };

  return (
    <div style={loadingContainer}>
      <motion.img
        src="/loading/loading-carrot.png"
        alt="Loading"
        style={{ width: "100px" }} // Adjust size as needed
        {...carrotAnimation}
      />
      <motion.div>
        {`${text ?? "Loading"} `}
        <motion.span {...dotAnimation}>.</motion.span>
        <motion.span {...dotAnimation} style={{ animationDelay: "0.2s" }}>
          .
        </motion.span>
        <motion.span {...dotAnimation} style={{ animationDelay: "0.4s" }}>
          .
        </motion.span>
      </motion.div>
    </div>
  );
};

export default LoadingCarrot;
