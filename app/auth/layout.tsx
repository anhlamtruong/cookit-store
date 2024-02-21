"use client";
import { useStyles } from "@/hooks/authenticate/use_styles";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const styles = useStyles();
  return (
    <div
      style={styles.container}
      className=" h-full flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default AuthLayout;
