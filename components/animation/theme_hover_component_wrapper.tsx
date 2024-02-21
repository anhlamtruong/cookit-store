import React, { useState, FC, ReactNode } from "react";

interface HoverAnimationWrapperProps {
  children: ReactNode;
  defaultStyle: React.CSSProperties | undefined;
  hoverStyle: React.CSSProperties | undefined;
}

export const HoverAnimationWrapper: FC<HoverAnimationWrapperProps> = ({
  children,
  defaultStyle,
  hoverStyle,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const appliedStyle = isHovered ? hoverStyle : defaultStyle;

  return (
    <div
      className="ease-in-out duration-300"
      style={appliedStyle ?? undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};
