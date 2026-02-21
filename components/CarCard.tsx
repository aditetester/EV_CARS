import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CarCardProps {
  name: string;
  price: string;
  image: any;
  rating: number;
  isNew?: boolean;
  hasDiscount?: boolean;
  onPress?: () => void;
  onFavoritePress?: () => void;
}

const CarCard: React.FC<CarCardProps> = ({
  name,
  price,
  image,
  rating,
  isNew = false,
  hasDiscount = false,
  onPress,
  onFavoritePress,
}) => {
  const { colorScheme } = useColorScheme();
  const theme = useTheme();
  const isDark = colorScheme === "dark";

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={12}
          color={theme.yellow}
        />,
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="rounded-2xl border border-yellow-300 dark:border-gray-500 overflow-hidden mb-3 flex-1 mx-1.5"
    >
      {/* Image Container */}
      <View className="relative overflow-hidden items-center pt-2 px-1 bg-white dark:bg-black">
        <Image
          source={image}
          style={{ width: "90%", height: 100 }}
          contentFit="contain"
        />

        {/* NEW Badge */}
        {isNew && (
          <View className="absolute top-0 right-3 items-center">
            {/* Ribbon Body */}
            <View className="bg-yellow-400 px-1 pt-2 pb-3 items-center w-[28px]">
              <Text className="font-extrabold text-black text-[9px] leading-tight">
                NEW
              </Text>
            </View>
            {/* Notch at bottom */}
            <View className="w-0 h-0 border-l-[14px] border-r-[14px] border-b-[8px] border-solid border-l-transparent border-r-transparent border-b-white dark:border-b-black -mt-[6px]" />
          </View>
        )}
      </View>

      <View>
        {/* Info */}
        <View className="px-3 py-3 bg-yellow-50 dark:bg-gray-800">
          <Text
            className={`text-sm font-bold uppercase ${isDark ? "text-white" : "text-black"}`}
            numberOfLines={1}
          >
            {name}
          </Text>

          {/* Rating + Actions Row */}
          <View className="flex-row items-center justify-between mt-1">
            <View className="flex-row">{renderStars()}</View>
            <View className="flex-row items-center gap-2">
              {hasDiscount && (
                <TouchableOpacity
                  onPress={() => console.log("Discount pressed")}
                >
                  <Image
                    source={require("../assets/images/car-search/discount.png")}
                    style={{ width: 22, height: 22 }}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={onFavoritePress}>
                <Ionicons
                  name="heart-outline"
                  size={20}
                  color={isDark ? "white" : "#333"}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Price */}
          <Text
            className={`text-lg font-black mt-1 ${isDark ? "text-white" : "text-black"}`}
          >
            {price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CarCard;
