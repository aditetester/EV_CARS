import CartButton from "@/components/CartButton";
import HeartButton from "@/components/HeartButton";
import ProfileButton from "@/components/ProfileButton";
import SearchBar from "@/components/SearchBar";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORIES = [
  {
    id: "1",
    title: "Battery",
    icon: require("../assets/images/accessories/battery.png"),
  },
  {
    id: "2",
    title: "Brakes",
    icon: require("../assets/images/accessories/brakes.png"),
  },
  {
    id: "3",
    title: "Tyres",
    icon: require("../assets/images/accessories/tyres.png"),
  },
  {
    id: "4",
    title: "Lights",
    icon: require("../assets/images/accessories/lights.png"),
  },
  {
    id: "5",
    title: "Side Mirror",
    icon: require("../assets/images/accessories/side-mirror.png"),
  },
  {
    id: "6",
    title: "Suspension",
    icon: require("../assets/images/accessories/suspension.png"),
  },
  {
    id: "7",
    title: "Body Parts",
    icon: require("../assets/images/accessories/body-parts.png"),
  },
  {
    id: "8",
    title: "Clutch",
    icon: require("../assets/images/accessories/wheel.png"),
  },
];

export default function AccessoriesScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <StatusBar style="auto" />

      {/* Header Section */}
      <View className="px-6 py-4 flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
            <Ionicons
              name="arrow-back"
              size={28}
              color={isDark ? "white" : "black"}
            />
          </TouchableOpacity>

          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full items-center justify-center">
              <Ionicons
                name="location-sharp"
                size={22}
                color={isDark ? Colors.dark.emerald : Colors.light.emerald}
              />
            </View>
            <View className="ml-2">
              <Text className="text-lg font-bold text-black dark:text-white">
                Location
              </Text>
              <Text className="text-xs text-gray-500 font-medium tracking-tighter">
                Texas
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          <HeartButton />
          <CartButton />
          <ProfileButton />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Search Bar Section */}
        <View className="px-6 mb-6">
          <SearchBar />
        </View>

        {/* Promo Banner Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          decelerationRate="fast"
          className="mb-8"
        >
          <View className="flex-row px-6 gap-4">
            <View className="w-[340px] h-[180px] rounded-3xl overflow-hidden bg-gray-100">
              <Image
                source={require("../assets/images/accessories/header.png")}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
              />
            </View>
            <View className="w-[340px] h-[180px] rounded-3xl overflow-hidden bg-gray-100">
              <Image
                source={require("../assets/images/accessories/header.png")}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
              />
            </View>
          </View>
        </ScrollView>

        {/* Categories Section */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-bold text-black dark:text-white mb-6">
            Categories
          </Text>
          <View className="flex-row flex-wrap justify-between gap-y-8">
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                className="items-center w-[22%]"
                onPress={() => console.log(category.title)}
              >
                <View className="w-16 h-16 items-center justify-center mb-2">
                  <Image
                    source={category.icon}
                    style={{ width: 50, height: 50 }}
                    contentFit="contain"
                  />
                </View>
                <Text
                  className="text-center text-[10px] font-semibold text-black dark:text-white"
                  numberOfLines={1}
                >
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Curated for You Section */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-bold text-black dark:text-white mb-6">
            Curated for You
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-4">
              {[1, 2, 3].map((i) => (
                <View
                  key={i}
                  className="w-[140px] h-[160px] bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-white/10"
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
