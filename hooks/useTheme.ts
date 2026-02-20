import { Colors } from "@/constants/theme";
import { useColorScheme } from "nativewind";

export const useTheme = () => {
  const { colorScheme } = useColorScheme();

  return colorScheme === "dark" ? Colors.dark : Colors.light;
};
