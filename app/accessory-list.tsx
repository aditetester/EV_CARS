import AccessoryProductCard, {
  AccessoryProduct,
} from "@/components/AccessoryProductCard";
import CartButton from "@/components/CartButton";
import HeartButton from "@/components/HeartButton";
import ProfileButton from "@/components/ProfileButton";
import SearchButton from "@/components/SearchButton";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BRANDS = [
  {
    id: "1",
    name: "Bridgestone",
    logo: require("../assets/images/accessories-detail/b.png"),
  },
  {
    id: "2",
    name: "MRF",
    logo: require("../assets/images/accessories-detail/mrf.png"),
  },
  {
    id: "3",
    name: "Apollo",
    logo: require("../assets/images/accessories-detail/apollo.jpg"),
  },
  {
    id: "4",
    name: "CEAT",
    logo: require("../assets/images/accessories-detail/ceat.jpg"),
  },
];

const PRODUCTS: AccessoryProduct[] = [
  {
    id: "1",
    title: "CEAT APTERRA HT",
    image: require("../assets/images/accessories-detail/tyre.jpg"),
    originalPrice: "$780.50",
    discountPrice: "$680.50",
    rating: 4,
    description:
      "The Alnac offers high-quality driving precision, outstanding control, improved braking and impeccable stability while cornering.",
    options: "215/75R15 +3 Options",
    status: "available",
  },
  {
    id: "2",
    title: "CEAT APTERRA HT",
    image: require("../assets/images/accessories-detail/tyre.jpg"),
    originalPrice: "$780.50",
    discountPrice: "$680.50",
    rating: 4,
    description:
      "The Alnac offers high-quality driving precision, outstanding control, improved braking and impeccable stability while cornering.",
    status: "notify",
  },
  {
    id: "3",
    title: "CEAT APTERRA HT",
    image: require("../assets/images/accessories-detail/tyre.jpg"),
    originalPrice: "$780.50",
    discountPrice: "$680.50",
    rating: 4,
    description:
      "The Alnac offers high-quality driving precision, outstanding control, improved braking and impeccable stability while cornering.",
    options: "215/75R15 +1 Options",
    status: "available",
  },
];

export default function AccessoryListScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const { categoryTitle = "Tyres & Wheel Care" } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <StatusBar style="auto" />

      {/* Header Section */}
      <View className="px-6 py-2 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons
            name="arrow-back"
            size={28}
            color={isDark ? "white" : "black"}
          />
        </TouchableOpacity>

        <View className="flex-row items-center gap-1">
          <SearchButton />
          <HeartButton />
          <CartButton />
          <ProfileButton />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View className="px-6 mb-4">
          <Text className="text-2xl font-black text-black dark:text-white uppercase tracking-tighter">
            {categoryTitle}
          </Text>
        </View>

        {/* Brand Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <View className="flex-row px-6 gap-4">
            {BRANDS.map((brand) => (
              <TouchableOpacity
                key={brand.id}
                className="w-20 h-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-white/10 items-center justify-center p-2 shadow-sm"
              >
                <Image
                  source={brand.logo}
                  style={{ width: "100%", height: "100%", borderRadius: 5 }}
                  contentFit="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Technical Viz Section */}
        <View className="px-6 mb-6 items-center">
          <View className="relative w-full h-48 items-center justify-center">
            <Image
              source={require("../assets/images/accessories-detail/tyre-detail.png")}
              style={{ width: "100%", height: "100%", borderRadius: 5 }}
              contentFit="cover"
            />
          </View>
        </View>

        {/* Product List */}
        <View className="px-6 pb-8">
          {PRODUCTS.map((product) => (
            <AccessoryProductCard
              key={product.id}
              product={product}
              onPress={() =>
                router.push({
                  pathname: "/accessory-detail",
                  params: { id: product.id, title: product.title },
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
