import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { TouchableOpacity } from "react-native";

const ProfileButton: React.FC = () => {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const isDark = colorScheme === "dark";

  return (
    <TouchableOpacity
      onPress={() => router.push("/profile")}
      className="w-14 h-14 bg-white dark:bg-black border-2 border-gray-200 dark:border-white/50 rounded-full items-center justify-center"
    >
      <Ionicons
        name="person-circle-outline"
        size={32}
        color={isDark ? Colors.dark.muted : Colors.light.muted}
      />
    </TouchableOpacity>
  );
};

export default ProfileButton;
