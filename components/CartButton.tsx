import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const CartButton: React.FC = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("/accessories-cart")}
      className="w-12 h-12 bg-white dark:bg-black border-2 border-gray-100 dark:border-white/20 rounded-full items-center justify-center shadow-sm relative"
    >
      <Ionicons
        name="cart-outline"
        size={24}
        color={isDark ? Colors.dark.text : Colors.light.text}
      />
      {/* Badge */}
      <View className="absolute top-2 right-2 w-4 h-4 bg-emerald-500 rounded-full items-center justify-center border-2 border-white dark:border-black">
        <View className="w-1.5 h-1.5 bg-white rounded-full" />
      </View>
    </TouchableOpacity>
  );
};

export default CartButton;
