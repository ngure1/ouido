const lightColors = {
  // Base colors
  background: "#FFFFFF",
  foreground: "#000000",

  // Card colors
  card: "#F2F2F7",
  cardForeground: "#000000",

  // Popover colors
  popover: "#F2F2F7",
  popoverForeground: "#000000",

  // Primary colors (Material UI Blue 500)
  primary: "#1976d2", // Blue 500
  primaryForeground: "#FFFFFF",

  // Secondary colors
  secondary: "#F2F2F7",
  secondaryForeground: "#18181b",

  // Muted colors
  muted: "#78788033",
  mutedForeground: "#71717a",

  // Accent colors
  accent: "#F2F2F7",
  accentForeground: "#18181b",

  // Destructive colors
  destructive: "#ef4444",
  destructiveForeground: "#FFFFFF",

  // Border and input
  border: "#C6C6C8",
  input: "#e4e4e7",
  ring: "#a1a1aa",

  // Text colors
  text: "#000000",
  textMuted: "#71717a",

  // Legacy support
  tint: "#1976d2",
  icon: "#71717a",
  tabIconDefault: "#71717a",
  tabIconSelected: "#1976d2",

  // Default buttons, links, selected tabs
  blue: "#1976d2",

  // Success states
  green: "#34C759",

  // Delete buttons, errors
  red: "#FF3B30",

  // Warning states
  orange: "#FF9500",

  yellow: "#FFCC00",
  pink: "#FF2D92",
  purple: "#AF52DE",
  teal: "#5AC8FA",
  indigo: "#5856D6",
};

const darkColors = {
  // Base colors
  background: "#121212",
  foreground: "#FFFFFF",

  // Card colors
  card: "#1E1E1E", // a bit lighter than background
  cardForeground: "#FFFFFF",

  // Popover colors
  popover: "#1E1E1E",
  popoverForeground: "#FFFFFF",

  primary: "#1e88e5", // Material UI Blue 600,
  primaryForeground: "#FFFFFF",

  // Secondary colors
  secondary: "#1C1C1E",
  secondaryForeground: "#FFFFFF",

  // Muted colors
  muted: "#78788033",
  mutedForeground: "#a1a1aa",

  // Accent colors
  accent: "#1C1C1E",
  accentForeground: "#FFFFFF",

  // Destructive colors
  destructive: "#dc2626",
  destructiveForeground: "#FFFFFF",

  // Border and input
  border: "#38383A",
  input: "rgba(255, 255, 255, 0.15)",
  ring: "#71717a",

  // Text colors
  text: "#FFFFFF",
  textMuted: "#a1a1aa",

  // Legacy support
  tint: "#42a5f5",
  icon: "#a1a1aa",
  tabIconDefault: "#a1a1aa",
  tabIconSelected: "#42a5f5",

  // Default buttons, links, selected tabs
  blue: "#42a5f5",

  // Success states
  green: "#30D158",

  // Delete buttons, errors
  red: "#FF453A",

  // Warning states
  orange: "#FF9F0A",

  yellow: "#FFD60A",
  pink: "#FF375F",
  purple: "#BF5AF2",
  teal: "#64D2FF",
  indigo: "#5E5CE6",
};

export const Colors = {
  light: lightColors,
  dark: darkColors,
};

export { darkColors, lightColors };
export type ColorKeys = keyof typeof lightColors;
