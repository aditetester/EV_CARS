import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

const COLORS = [
  { id: "grey", hex: "#5C6058" },
  { id: "red", hex: "#A1131E" },
  { id: "black", hex: "#000000" },
  { id: "yellow", hex: "#FBBF24" },
];

const SPECS = [
  {
    label: "4,456lbs",
    sub: "Weight",
    icon: require("../assets/images/car-detail/vehical.png"),
  },
  {
    label: "418km",
    sub: "Electric range",
    icon: require("../assets/images/car-detail/wheel.png"),
  },
  {
    label: "200mph",
    sub: "Top Speed",
    icon: require("../assets/images/car-detail/speed-1.png"),
  },
  {
    label: "1.99sec",
    sub: "0-100mph",
    icon: require("../assets/images/car-detail/speed.png"),
  },
  {
    label: "408hp",
    sub: "Power",
    icon: require("../assets/images/car-detail/power.png"),
  },
];

const VARIANTS = [
  { name: "EV6 GT line", type: "Automatic, Electric", price: "$ 45,980*" },
  { name: "EV6 GT line AWD", type: "Automatic, Electric", price: "$ 48,900*" },
];

const BRAND_LOGOS: { [key: string]: any } = {
  kia: require("../assets/images/car-type/kia.png"),
  mg: require("../assets/images/car-type/mg.png"),
  mahindra: require("../assets/images/car-type/mahindra.png"),
  tata: require("../assets/images/car-type/tata.png"),
};

export default function CarDetailScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const params = useLocalSearchParams();
  const {
    brand = "KIA",
    carName = "EV6",
    price = "$ 45,000",
    rating = "4",
  } = params;

  const [selectedColor, setSelectedColor] = useState("red");
  const [expandedVariant, setExpandedVariant] = useState<string | null>(null);

  const brandLower = (brand as string).toLowerCase();
  const brandLogo = BRAND_LOGOS[brandLower];

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <StatusBar barStyle="default" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 12 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-12">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center -ml-2"
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color={isDark ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>
        <View className="self-end px-2 mr-4">
          <View className="items-center">
            {brandLogo && (
              <Image
                source={brandLogo}
                className="w-12 h-6"
                resizeMode="contain"
              />
            )}
            <Text className="text-[6px] pb-1 font-bold uppercase tracking-tighter opacity-70 text-black dark:text-white">
              EXPERIENCE
            </Text>
          </View>
        </View>

        {/* Main Car Image */}
        <View className="items-center dark:px-4">
          <View className="w-full h-64 items-center justify-center dark:bg-gray-800 dark:rounded-3xl dark:border dark:border-gray-500">
            <Image
              source={require("../assets/images/car-detail/car.png")}
              className="w-full h-full mr-8"
              resizeMode="cover"
              style={{ width: width * 1.8 }}
            />
          </View>
        </View>

        {/* Title & Stats Row */}
        <View className="px-6 mt-4 flex-row justify-between items-start">
          <View>
            <Text className="text-xl font-bold dark:text-white uppercase">
              {brand} {carName}
            </Text>
            <Text className="text-lg font-bold text-black dark:text-white mt-1">
              {price}
            </Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-xs text-gray-500">On-Road Price in </Text>
              <Text className="text-xs font-bold text-orange-400 italic">
                Delhi
              </Text>
              <Ionicons
                name="location"
                size={12}
                color="#FB923C"
                className="ml-1"
              />
            </View>
          </View>

          <View className="items-end">
            <View className="flex-row gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Ionicons
                  key={s}
                  name="star"
                  size={16}
                  color={s <= Number(rating) ? "#FBBF24" : "#E5E7EB"}
                />
              ))}
            </View>
            <Text className="text-[10px] font-medium text-gray-500 mt-1">
              Over all Rating
            </Text>

            <View className="flex-row gap-1 mt-3">
              {COLORS.map((c) => (
                <TouchableOpacity
                  key={c.id}
                  onPress={() => setSelectedColor(c.id)}
                  className={`w-6 h-6 rounded-full border ${selectedColor === c.id ? "border-gray-400" : "border-transparent"}`}
                  style={{ padding: 2 }}
                >
                  <View
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: c.hex }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Mini Gallery */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-6"
          contentContainerStyle={{
            paddingHorizontal: 24,
            gap: 4,
          }}
          snapToInterval={110}
          decelerationRate="fast"
        >
          <View className="relative">
            <Image
              source={require("../assets/images/car-detail/car-detail-2.png")}
              style={{ width: 110, height: 80 }}
              className="rounded-lg dark:border dark:border-gray-500"
              resizeMode="cover"
            />
            <View className="absolute inset-0 items-center justify-center bg-black/20">
              <Ionicons name="play-circle-outline" size={24} color="white" />
            </View>
          </View>
          <Image
            source={require("../assets/images/car-detail/car-detail-2.png")}
            style={{ width: 110, height: 80 }}
            className="rounded-lg dark:border dark:border-gray-500"
            resizeMode="cover"
          />
          <Image
            source={require("../assets/images/car-detail/car-detail-3.png")}
            style={{ width: 110, height: 80 }}
            className="rounded-lg dark:border dark:border-gray-500"
            resizeMode="cover"
          />
          <Image
            source={require("../assets/images/car-detail/car-detail-4.png")}
            style={{ width: 110, height: 80 }}
            className="rounded-lg dark:border dark:border-gray-500"
            resizeMode="cover"
          />
        </ScrollView>

        {/* Specs Icons */}
        <View className="flex-row justify-between px-6 mt-8">
          {SPECS.map((spec, i) => (
            <View key={i} className="items-center">
              <Image
                source={spec.icon}
                className="w-8 h-8"
                resizeMode="contain"
                style={{ tintColor: isDark ? "white" : "black" }}
              />
              <Text className="text-[10px] font-bold mt-2 dark:text-white">
                {spec.label}
              </Text>
              <Text className="text-[8px] text-gray-400 uppercase">
                {spec.sub}
              </Text>
            </View>
          ))}
        </View>

        {/* Variants Section */}
        <View className="px-6 mt-10">
          <Text className="text-lg font-bold uppercase tracking-wider mb-4 dark:text-white">
            Varient
          </Text>
          <View className="border-t border-b border-gray-100 dark:border-gray-600">
            {VARIANTS.map((v, i) => (
              <TouchableOpacity
                key={i}
                className={`flex-row justify-between items-center py-4 ${i === 0 ? "border-b border-gray-50 dark:border-gray-600" : ""}`}
                onPress={() =>
                  setExpandedVariant(expandedVariant === v.name ? null : v.name)
                }
              >
                <View>
                  <Text className="font-bold text-sm dark:text-white">
                    {v.name}
                  </Text>
                  <Text className="text-xs text-gray-400">{v.type}</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="mr-4 items-end">
                    <Text className="font-bold text-sm dark:text-white">
                      {v.price}
                    </Text>
                    <Text className="text-[8px] text-gray-400">
                      Get On Road Price*
                    </Text>
                  </View>
                  <Ionicons
                    name={
                      expandedVariant === v.name ? "chevron-up" : "chevron-down"
                    }
                    size={20}
                    color={isDark ? "white" : "black"}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* In Detail Section */}
        <View className="px-6 mt-6">
          <Text className="text-lg font-bold uppercase tracking-wider dark:text-white">
            In Detail
          </Text>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View className="relative">
        <View className="flex-row bg-white dark:bg-black p-2 rounded-md justify-between">
          <TouchableOpacity className="flex-1 bg-[#A1131E] py-4 items-center rounded-md mr-2 mb-10">
            <Text className="text-white font-bold text-xs uppercase">
              Book Test Drive
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 bg-[#A1131E] py-4 items-center rounded-md ml-2 mb-10">
            <Text className="text-white font-bold text-xs uppercase">
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
