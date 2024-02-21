import { useTheme } from "@/contexts/ThemeContext";
import { useMemo } from "react";

export const useStyles = () => {
  const { themeColors, theme } = useTheme();
  const _themeObjects = themeColors[theme];
  const {
    backgroundPrimary,
    backgroundTertiary,
    backgroundPrimaryOpacity,
    textPrimary,
    textTertiary,
    textSecondary,
    borderPrimary,
    backgroundSecondary,
    hoverText,
    hoverBorder,
    hoverBackground,
  } = themeColors[theme];

  const styles = useMemo(() => {
    return {
      container: {
        background: backgroundPrimary,
        color: textPrimary,
        borderRadius: "0.5rem", // Updated borderRadius
      },
      backgroundInput: {
        background: backgroundSecondary,
        color: textSecondary,
        borderRadius: "0.5rem", // Updated borderRadius
      },
      backgroundPrimary: {
        background: backgroundPrimary,
      },
      backgroundPrimaryOpacity: {
        background: backgroundPrimaryOpacity,
      },
      backgroundSecondary: {
        background: backgroundSecondary,
      },
      backgroundTertiary: {
        background: backgroundTertiary,
      },
      containerWithBorder: {
        background: backgroundPrimary,
        color: textPrimary,
        borderColor: borderPrimary,
        borderRadius: "0.5rem", // Updated borderRadius
      },
      hoverText: {
        color: hoverText,
      },
      textPrimary: {
        color: textPrimary,
      },
      textSecondary: {
        color: textSecondary,
      },
      textTertiary: {
        color: textTertiary,
      },
      button: {
        backgroundColor: backgroundPrimary,
        color: textPrimary,
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem", // Updated borderRadius
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Added boxShadow for elevation
      },
      borderStyle: {
        borderStyle: "solid",
        borderColor: hoverBorder,
        borderRadius: "0.5rem", // Updated borderRadius
      },
      borderPrimaryColor: {
        borderColor: hoverBackground,
      },
    };
    // Add more styles as needed
  }, [
    backgroundPrimary,
    backgroundPrimaryOpacity,
    backgroundSecondary,
    borderPrimary,
    textPrimary,
    textTertiary,
    textSecondary,
    hoverBorder,
    hoverText,
    hoverBackground,
    backgroundTertiary,
  ]);

  return styles;
};
