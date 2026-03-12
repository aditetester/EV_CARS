import CartButton from "@/components/CartButton";
import ProfileButton from "@/components/ProfileButton";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ALL_PRODUCTS } from "./accessory-list";

export default function AccessoryDetailScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = ALL_PRODUCTS.find((p) => p.id === id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <StatusBar style="auto" />

      {/* Header Section */}
      <View className="px-6 py-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons
            name="arrow-back"
            size={28}
            color={isDark ? "white" : "black"}
          />
        </TouchableOpacity>

        <View className="flex-row items-center gap-1">
          {/* <SearchButton onPress={() => router.push("/accessories-search")} /> */}
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
            <View className="w-12 h-12 bg-white dark:bg-black border-2 border-gray-100 dark:border-white/20 rounded-full items-center justify-center shadow-sm">
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? "#FF0000" : isDark ? "#fff" : "#000"}
              />
            </View>
          </TouchableOpacity>
          <CartButton />
          <ProfileButton />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Product Title */}
        <View className="px-6 mb-4">
          <Text className="text-xl font-black text-black dark:text-white uppercase">
            {product?.title}
          </Text>
        </View>

        {/* Product Image & Discount Section */}
        <View className="relative w-full h-60 bg-white dark:bg-gray-900 overflow-hidden items-center justify-center border-t-2 border-t-gray-100 dark:border-t-gray-700 border-b-2 border-b-gray-100 dark:border-b-gray-700">
          {/* Discount Badge - Swallow-tail Ribbon */}
          <View className="absolute top-8 left-0 z-10 flex-row">
            <View className="bg-yellow-400 pl-4 py-1.5 h-9.5 justify-center">
              <Text className="text-sm font-black text-black">18% OFF</Text>
            </View>
            <View
              style={{
                width: 0,
                height: 0,
                backgroundColor: "transparent",
                borderStyle: "solid",
                borderTopWidth: 16,
                borderBottomWidth: 16,
                borderLeftWidth: 12,
                borderTopColor: "#facc15", // yellow-400
                borderBottomColor: "#facc15", // yellow-400
                borderLeftColor: "#facc15", // yellow-400
                borderRightWidth: 12,
                borderRightColor: "transparent",
              }}
            />
          </View>

          <Image
            source={product?.image}
            style={{ width: "90%", height: "90%", borderRadius: 10 }}
            contentFit={isDark ? "cover" : "contain"}
          />
        </View>

        {/* Product Meta Info */}
        <View className="px-6 py-4">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-yellow-500 font-bold uppercase mb-1">
                APTERRA HT
              </Text>
              <Text className="text-lg font-bold text-black dark:text-white">
                {product?.title}
              </Text>
              <Text className="text-sm text-gray-500 font-medium">
                5 years warranty
              </Text>
            </View>
            <View className="items-end">
              <View className="flex-row items-center gap-2 mb-1">
                <View className="flex-row items-center">
                  {[...Array(5)].map((_, i) => (
                    <Ionicons
                      key={i}
                      name={
                        i < (product?.rating ?? 0) ? "star" : "star-outline"
                      }
                      size={14}
                      color="#FFD700"
                    />
                  ))}
                </View>
                <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                  <Ionicons
                    name={isFavorite ? "heart" : "heart"}
                    size={24}
                    color={isFavorite ? "#FF0000" : "#FF0000"}
                  />
                </TouchableOpacity>
              </View>
              <Text className="text-sm text-gray-400 line-through">
                {product?.originalPrice}
              </Text>
              <Text className="text-xl font-black text-yellow-500">
                {product?.discountPrice}
              </Text>
            </View>
          </View>

          {/* Selector and Quantity Row */}
          <View className="flex-row items-center justify-between mb-2">
            <TouchableOpacity className="border-2 border-emerald-500 rounded-full px-6 py-1">
              <Text className="text-emerald-500 font-bold">
                {product?.options}
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-full">
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-1"
              >
                <Text className="text-xl font-bold dark:text-white">-</Text>
              </TouchableOpacity>
              <View className="px-2 py-1 font-black bg-white dark:bg-gray-700">
                <Text className="px-4 font-black dark:text-white">
                  {quantity}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                className="px-4 py-1"
              >
                <Text className="text-xl font-bold dark:text-white">+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sold By Info */}
          <View className="mb-2">
            <Text className="text-sm text-black dark:text-white mb-2">
              Sold By: <Text className="font-black">BKR Traders</Text>
            </Text>

            {/* Brand Banner */}
            <View className="flex-row items-center justify-between bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-xl h-20 overflow-hidden shadow-sm">
              {/* Brand Logo Section */}
              <Image
                source={require("../assets/images/accessories-detail/mrf.png")}
                style={{ width: 100, height: 100 }}
                contentFit="contain"
              />

              {/* Center Tyres Section */}
              <Image
                source={require("../assets/images/accessories-detail/tyres.png")}
                style={{ width: 100, height: 100 }}
                contentFit="contain"
              />

              {/* Red Promo Box Section */}
              <View className="bg-[#E95440] px-2 items-center justify-center w-24 h-full">
                <Text
                  className="text-white text-[6px] font-bold tracking-widest uppercase mb-0.5 text-center"
                  numberOfLines={2}
                >
                  THIS SEASONS
                </Text>
                <Text className="text-white text-xl font-black leading-none">
                  50%
                </Text>
                <Text className="text-white text-xs font-black leading-none mb-0.5">
                  OFF
                </Text>
                <Text className="text-white text-[6px] font-bold tracking-widest uppercase text-center">
                  SALE!
                </Text>
              </View>
            </View>
          </View>

          {/* Details Section */}
          <View className="mb-2">
            <Text className="text-lg font-black text-black dark:text-white uppercase mb-2">
              Details
            </Text>
            <Text className="text-sm text-gray-500 leading-relaxed text-justify">
              {product?.description}
            </Text>
          </View>

          {/* Reviews Section */}
          <View className="mb-2">
            <Text className="text-lg font-black text-black dark:text-white uppercase mb-4">
              Reviews
            </Text>
            <View className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-white/10 shadow-sm flex-row">
              <View className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-emerald-500">
                <Image
                  source={require("../assets/images/profile/profile.png")}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                />
              </View>
              <View className="flex-1">
                <Text className="text-base font-black text-black dark:text-white">
                  Pratik Mohan
                </Text>
                <View className="flex-row items-center mb-2">
                  {[1, 2, 3, 4].map((star) => (
                    <Ionicons
                      key={star}
                      name="star"
                      size={12}
                      color="#FFD700"
                    />
                  ))}
                  <Ionicons name="star-outline" size={12} color="#FFD700" />
                </View>
                <Text className="text-xs text-gray-400 leading-relaxed text-justify">
                  The Alnac offers high-quality driving precision, outstanding
                  control, improved braking and impeccable stability while
                  cornering.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
