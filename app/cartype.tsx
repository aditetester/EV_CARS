import BottomTabs from "@/components/BottomTabs";
import BrandItem from "@/components/BrandItem";
import ExploreItem from "@/components/ExploreItem";
import ProfileButton from "@/components/ProfileButton";
import SearchBar from "@/components/SearchBar";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
// import { useColorScheme } from "nativewind";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function CarTypeScreen() {
  const theme = useTheme();
  const router = useRouter();
  return (
    <View className="flex-1 bg-white dark:bg-black">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Search Bar */}
        <View className="flex-row items-center justify-between px-2 py-2 mt-14 gap-2">
          <SearchBar onPress={() => router.push("/carsearch")} />
          <ProfileButton />
        </View>

        {/* Prefer To Drive */}
        <Text className="mt-6 text-md font-bold text-black dark:text-white uppercase tracking-widest">
          I Prefer To Drive
        </Text>

        <View className="flex-row justify-between mt-4">
          <ExploreItem
            title="Sedan"
            icon={require("../assets/images/car-type/car.png")}
            color={theme.yellow}
            onPress={() => console.log("Sedan")}
          />
          <ExploreItem
            title="Hatchback"
            icon={require("../assets/images/car-type/car.png")}
            color={theme.emerald}
            onPress={() => console.log("Hatchback")}
          />
          <ExploreItem
            title="SUV"
            icon={require("../assets/images/car-type/car.png")}
            color={theme.emerald}
            onPress={() => console.log("SUV")}
          />
          <ExploreItem
            title="MUV"
            icon={require("../assets/images/car-type/car.png")}
            color={theme.emerald}
            onPress={() => console.log("MUV")}
          />
        </View>

        {/* Brand Section */}
        <Text className="mt-8 mb-2 text-md font-bold text-black dark:text-white uppercase tracking-widest">
          Brand
        </Text>

        <View className="flex-row justify-center gap-10 items-center mt-4 px-6">
          <BrandItem
            source={require("../assets/images/car-type/mg.png")}
            onPress={() => console.log("MG")}
          />

          <BrandItem
            source={require("../assets/images/car-type/kia.png")}
            onPress={() => console.log("KIA")}
          />

          <BrandItem
            source={require("../assets/images/car-type/mahindra.png")}
            onPress={() => console.log("Mahindra")}
          />

          <BrandItem
            source={require("../assets/images/car-type/tata.png")}
            onPress={() => console.log("Tata")}
          />
        </View>

        {/* Banner Ad */}
        <View className="mt-6 rounded-2xl overflow-hidden border-2 border-transparent dark:border-white/50 w-full relative">
          <Image
            source={require("../assets/images/car-type/Ad.gif")}
            style={{ width: "100%", height: 230 }}
            contentFit="cover"
          />

          {/* AD+ Badge */}
          <View className="absolute right-5 bg-gray-500 dark:bg-white/80 px-2 py-1.5">
            <Text className="text-white dark:text-black text-[10px] font-semibold tracking-widest">
              AD&gt;
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomTabs />
    </View>
  );
}
