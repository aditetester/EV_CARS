import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import { TouchableOpacity } from "react-native";

const HeartButton: React.FC = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <TouchableOpacity className="w-12 h-12 bg-white dark:bg-black border-2 border-gray-100 dark:border-white/20 rounded-full items-center justify-center shadow-sm">
      <Ionicons name="heart" size={24} color="#FF0000" />
    </TouchableOpacity>
  );
};

export default HeartButton;
