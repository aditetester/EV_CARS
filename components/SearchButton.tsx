import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import { TouchableOpacity } from "react-native";

const SearchButton: React.FC<{ onPress?: () => void }> = ({ onPress }) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-12 h-12 bg-white dark:bg-black border-2 border-gray-100 dark:border-white/20 rounded-full items-center justify-center shadow-sm"
    >
      <Ionicons
        name="search-outline"
        size={24}
        color={isDark ? Colors.dark.emerald : Colors.light.emerald}
      />
    </TouchableOpacity>
  );
};

export default SearchButton;
