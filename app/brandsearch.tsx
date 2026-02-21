import BottomTabs from "@/components/BottomTabs";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

interface Car {
  id: string;
  name: string;
  image: any;
}

const CARS: Car[] = [
  {
    id: "1",
    name: "KIA EV6",
    image: require("../assets/images/brand/car.png"),
  },
  {
    id: "2",
    name: "KIA SELTOS",
    image: require("../assets/images/brand/car.png"),
  },
  {
    id: "3",
    name: "KIA SELTOS",
    image: require("../assets/images/brand/car.png"),
  },
];

const BRAND_LOGOS: { [key: string]: any } = {
  kia: require("../assets/images/car-type/kia.png"),
  mg: require("../assets/images/car-type/mg.png"),
  mahindra: require("../assets/images/car-type/mahindra.png"),
  tata: require("../assets/images/car-type/tata.png"),
};

export default function BrandSearchScreen() {
  const { brand = "kia" } = useLocalSearchParams<{ brand: string }>();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const brandLower = brand.toLowerCase();
  const brandLogo = BRAND_LOGOS[brandLower];

  const renderCarItem = ({ item }: { item: Car }) => (
    <View className="mb-8 items-center">
      <View className="w-full flex-row justify-start px-8 mb-2">
        <View>
          <Text className="text-xl font-bold text-black dark:text-white uppercase -mb-4">
            {item.name}
          </Text>
          <TouchableOpacity className="flex-row items-center">
            <View className="-mb-12 flex-row items-center">
              <Text className="text-xs text-gray-500 uppercase tracking-widest mr-1">
                Varients
              </Text>
              <Ionicons name="arrow-forward" size={12} color="gray" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View className="relative w-full h-48 px-4">
        <Image
          source={item.image}
          className="w-full h-full"
          resizeMode="contain"
        />
        <View className="absolute -bottom-2 right-10 rounded-full overflow-hidden dark:bg-white">
          <Image
            source={require("../assets/images/brand/360.png")}
            className="w-8 h-8"
          />
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-6 pt-12 pb-2">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons
              name="arrow-back"
              size={28}
              color={isDark ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-center justify-center flex-row mt-5 mb-2">
          {isDark ? (
            <Image
              source={require("../assets/images/brand/brandsearch-white.png")}
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <Image
              source={require("../assets/images/brand/brandsearch.png")}
              className="w-16 h-16"
            />
          )}

          {brandLogo ? (
            <Image
              source={brandLogo}
              className="w-28 h-16"
              resizeMode="contain"
            />
          ) : (
            <Text className="text-2xl font-bold text-black dark:text-white uppercase">
              {brand}
            </Text>
          )}
        </View>

        <View className="flex-row items-center justify-center mt-7 mb-6">
          <Text className="text-xs font-bold text-black dark:text-white">
            EXPERIENCE Movement that inspires
          </Text>
        </View>

        {/* Car List */}
        <FlatList
          data={CARS}
          keyExtractor={(item) => item.id}
          renderItem={renderCarItem}
          contentContainerStyle={{ paddingBottom: 120, paddingTop: 6 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Bottom Navigation */}
      <BottomTabs />
    </View>
  );
}
