"use client";

import ThemeSwitcher from "@/components/ui/theme_switcher";
import { useTheme } from "@/contexts/ThemeContext";
import { useStyles } from "@/hooks/authenticate/use_styles";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login_button";
import { Reenie_Beanie } from "next/font/google";
export const reenie_beanie = Reenie_Beanie({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});
const MainApp = () => {
  const styles = useStyles();
  return (
    <main
      style={styles.container}
      className={cn(`flex w-full flex-col items-center justify-center h-full`)}
    >
      <ThemeSwitcher></ThemeSwitcher>
      <div className=" space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold drop-shadow-md",
            reenie_beanie.className
          )}
        >
          Sassy Authy
        </h1>
        <p className="text-lg"> A sexy authentication service</p>
        <div>
          <LoginButton>
            <Button
              className="ease-in-out duration-300"
              withTheme={true}
              variant={"secondary"}
              size={"lg"}
            >
              {" "}
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
};

export default MainApp;
