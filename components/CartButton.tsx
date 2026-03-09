import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../context/CartContext";

const CartButton: React.FC = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

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
      {itemCount > 0 && (
        <View className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full items-center justify-center border-2 border-white dark:border-black px-1">
          <Text className="text-[9px] font-black text-white">{itemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
