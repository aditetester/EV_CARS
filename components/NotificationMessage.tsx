import { Colors } from "@/constants/theme";
import { useColorScheme } from "nativewind";
import React from "react";
import { Switch, Text, View } from "react-native";

interface Props {
  icon: React.ReactNode;
  message: string;
  value: boolean;
  onToggle: () => void;
}

export default function NotificationMessage({
  icon,
  message,
  value,
  onToggle,
}: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="flex-row items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-3">
      <View className="flex-row items-center flex-1">
        <View className="w-10 items-center mr-3">{icon}</View>

        <Text className="text-sm text-black dark:text-white flex-1">
          {message}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{
          false: "#d1d5db",
          true: isDark ? Colors.dark.emerald : Colors.light.emerald,
        }}
        thumbColor="#fff"
      />
    </View>
  );
}
