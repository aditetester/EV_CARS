import { Colors } from "@/constants/theme";
import { useColorScheme } from "nativewind";
import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

interface ActionButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  className?: string;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  onPress,
  className = "",
  disabled = false,
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: isDark ? Colors.dark.emerald : Colors.light.emerald,
      }}
      className={`rounded-3xl py-4 ${
        disabled ? "opacity-50" : ""
      } ${className}`}
    >
      <Text className="text-white text-center text-xl font-bold uppercase">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
