import { Colors } from "@/constants/theme";
import { useColorScheme } from "nativewind";
import React from "react";
import { TextInput, View } from "react-native";

const SearchBar: React.FC = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      style={{
        backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface,
      }}
      className="border-2 border-gray-200 dark:border-white/20 rounded-2xl flex-1 px-3 py-2"
    >
      <TextInput
        placeholder="I am looking for"
        placeholderTextColor={isDark ? Colors.dark.muted : Colors.light.muted}
        className="text-gray-600 dark:text-white"
      />
    </View>
  );
};

export default SearchBar;
