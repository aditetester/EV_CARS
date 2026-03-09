import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface AccessoryProduct {
  id: string;
  type: string;
  title: string;
  image: any;
  originalPrice: string;
  discountPrice: string;
  rating: number;
  description: string;
  options?: string;
  status: "available" | "out_of_stock" | "notify";
}

interface AccessoryProductCardProps {
  product: AccessoryProduct;
  onPress?: () => void;
  onAddToCart?: () => void;
  onNotifyMe?: () => void;
}

const AccessoryProductCard: React.FC<AccessoryProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
  onNotifyMe,
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="bg-white dark:bg-gray-900 rounded-3xl p-2 mb-2 border border-gray-100 dark:border-white/10 shadow-sm"
    >
      <View className="flex-row">
        {/* Product Image */}
        <View className="w-24 h-24 items-center justify-center mr-4 mt-6">
          <Image
            source={product.image}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            contentFit={isDark ? "cover" : "contain"}
          />
        </View>

        {/* Product Details */}
        <View className="flex-1">
          <View className="flex-row justify-end items-center gap-2">
            <View className="flex-row items-center mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= product.rating ? "star" : "star-outline"}
                  size={12}
                  color="#FFD700"
                />
              ))}
            </View>
            <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={20}
                color={isFavorite ? "#FF0000" : isDark ? "#fff" : "#000"}
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-bold text-black dark:text-white">
              {product.title}
            </Text>
            <Text className="text-base text-gray-400 line-through">
              {product.originalPrice}
            </Text>
          </View>

          <View className="flex-row justify-end items-center">
            <Text className="text-base font-bold text-yellow-500">
              {product.discountPrice}
            </Text>
          </View>

          <Text
            className="text-[10px] text-gray-500 dark:text-gray-400 mb-3 text-justify"
            numberOfLines={2}
          >
            {product.description}
          </Text>

          {/* Action Row */}
          <View className="flex-row items-center justify-between">
            {product.options && (
              <View className="bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">
                <Text className="text-[10px] font-bold text-emerald-500">
                  {product.options}
                </Text>
              </View>
            )}

            {product.status === "available" ? (
              <TouchableOpacity
                onPress={onAddToCart}
                className="bg-emerald-500 px-4 py-2 rounded-lg"
              >
                <Text className="text-[10px] font-bold text-white uppercase">
                  Add to Cart
                </Text>
              </TouchableOpacity>
            ) : product.status === "notify" ? (
              <View className="flex-1 flex-row gap-2 items-center justify-between">
                <TouchableOpacity
                  onPress={onNotifyMe}
                  className="bg-yellow-400 px-3 py-1 rounded-full"
                >
                  <Text className="text-md font-bold text-black uppercase px-1">
                    Notify Me
                  </Text>
                </TouchableOpacity>
                <View className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10 opacity-50">
                  <Text className="text-md font-bold text-gray-600 uppercase dark:text-gray-200">
                    Out of Stock
                  </Text>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                onPress={onAddToCart}
                className="bg-emerald-500 px-4 py-2 rounded-full"
              >
                <Text className="text-[10px] font-bold text-white uppercase">
                  Add to Cart
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AccessoryProductCard;
