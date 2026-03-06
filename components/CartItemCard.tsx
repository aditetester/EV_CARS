import { Image } from "expo-image";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface CartItem {
  id: string;
  title: string;
  subtitle: string;
  originalPrice: string;
  discountPrice: string;
  expectedDelivery: string;
  image: any;
  quantity: number;
}

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <View className="bg-gray-100 dark:bg-gray-900 rounded-[32px] p-4 mb-2 flex-row items-center">
      {/* Image Container */}
      <View className="w-24 h-24 bg-white dark:bg-black rounded-2xl items-center justify-center p-2 mr-4 shadow-sm">
        <Image
          source={item.image}
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
          contentFit={isDark ? "cover" : "contain"}
        />
      </View>

      {/* Details Container */}
      <View className="flex-1">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-emerald-500 font-bold text-[12px]">
              {item.subtitle}
            </Text>
          </View>
          <TouchableOpacity onPress={() => onRemove(item.id)} className="pt-1">
            <Text className="text-xs font-bold text-black dark:text-gray-400">
              Remove
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-sm font-black text-yellow-500 uppercase leading-tight mt-1 mr-16 text-justify">
          {item.title}
        </Text>

        <View className="flex-row justify-between items-end">
          <View>
            <Text className="text-[10px] text-gray-500 font-medium italic">
              Expected Delivery
            </Text>
            <Text className="text-[10px] text-yellow-400 font-black">
              {item.expectedDelivery}
            </Text>
          </View>
          <View className="items-end">
            <View className="mb-2 items-end">
              {item.originalPrice !== "" && (
                <Text className="text-xs text-gray-400 font-bold line-through leading-none">
                  {item.originalPrice}
                </Text>
              )}
              <Text className="text-sm font-black text-yellow-500 leading-none">
                {item.discountPrice}
              </Text>
            </View>

            {/* Quantity Selector */}
            <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-white/10 px-1 py-0.5">
              <TouchableOpacity
                onPress={() => onUpdateQuantity(item.id, -1)}
                className="w-6 h-6 items-center justify-center"
              >
                <Text className="text-lg font-bold dark:text-white">-</Text>
              </TouchableOpacity>
              <View className="px-2 bg-white dark:bg-gray-700 min-w-[24px] items-center">
                <Text className="font-black text-sm dark:text-white">
                  {item.quantity}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => onUpdateQuantity(item.id, 1)}
                className="w-6 h-6 items-center justify-center"
              >
                <Text className="text-lg font-bold dark:text-white">+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItemCard;
