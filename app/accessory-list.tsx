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
import { useCart } from "../context/CartContext";

const ALL_BRANDS = [
  {
    id: "t1",
    name: "Bridgestone",
    logo: require("../assets/images/accessories-detail/b.png"),
  },
  {
    id: "t2",
    name: "MRF",
    logo: require("../assets/images/accessories-detail/mrf.png"),
  },
  {
    id: "t3",
    name: "Apollo",
    logo: require("../assets/images/accessories-detail/apollo.jpg"),
  },
  {
    id: "t4",
    name: "CEAT",
    logo: require("../assets/images/accessories-detail/ceat.jpg"),
  },
];

export const ALL_PRODUCTS: AccessoryProduct[] = [
  {
    id: "t_1",
    type: "Tyres",
    title: "CEAT APTERRA HT",
    image: require("../assets/images/accessories-detail/tyre.jpg"),
    originalPrice: "$780.50",
    discountPrice: "$680.50",
    rating: 4,
    description:
      "The Alnac offers high-quality driving precision, outstanding control.",
    options: "215/75R15 +3 Options",
    status: "available",
  },
  {
    id: "t_2",
    type: "Tyres",
    title: "Apollo Alnac 4G",
    image: require("../assets/images/accessories-detail/tyre.jpg"),
    originalPrice: "$600.00",
    discountPrice: "$550.00",
    rating: 5,
    description: "High performance tyre with excellent wet grip.",
    status: "notify",
  },
  {
    id: "b_1",
    type: "Battery",
    title: "Exide Mileage 35AH",
    image: require("../assets/images/accessories/battery.png"),
    originalPrice: "$120.00",
    discountPrice: "$105.00",
    rating: 5,
    description: "Robust design with excellent charge acceptance.",
    options: "12V 35AH",
    status: "available",
  },
  {
    id: "b_2",
    type: "Battery",
    title: "Amaron Black",
    image: require("../assets/images/accessories/battery.png"),
    originalPrice: "$110.00",
    discountPrice: "$95.00",
    rating: 4,
    description: "Zero maintenance battery with longest life.",
    options: "12V 35AH",
    status: "available",
  },
  {
    id: "l_1",
    type: "Lights",
    title: "Philips LED Headlight",
    image: require("../assets/images/accessories/lights.png"),
    originalPrice: "$85.00",
    discountPrice: "$70.00",
    rating: 3,
    description: "Bright white LED headlight for increased visibility.",
    options: "H4 6000K",
    status: "available",
  },
  {
    id: "br_1",
    type: "Brakes",
    title: "Bosch Brake Pads",
    image: require("../assets/images/accessories/brakes.png"),
    originalPrice: "$60.00",
    discountPrice: "$50.00",
    rating: 4,
    description: "Reliable brake pads with excellent stopping power.",
    options: "Front Set",
    status: "available",
  },
  {
    id: "s_1",
    type: "Suspension",
    title: "KYB Shock Absorber",
    image: require("../assets/images/accessories/suspension.png"),
    originalPrice: "$140.00",
    discountPrice: "$120.00",
    rating: 4,
    description: "Smooth ride shock absorber.",
    options: "Front",
    status: "available",
  },
  {
    id: "bp_1",
    type: "Body Parts",
    title: "Front Bumper",
    image: require("../assets/images/accessories/body-parts.png"),
    originalPrice: "$300.00",
    discountPrice: "$260.00",
    rating: 4,
    description: "Durable replacement bumper.",
    options: "Black",
    status: "available",
  },
  {
    id: "sm_1",
    type: "Side Mirror",
    title: "Electric Side Mirror",
    image: require("../assets/images/accessories/side-mirror.png"),
    originalPrice: "$95.00",
    discountPrice: "$80.00",
    rating: 4,
    description: "Adjustable electric mirror.",
    options: "Left Side",
    status: "available",
  },
  {
    id: "c_1",
    type: "Clutch",
    title: "Valeo Clutch Kit",
    image: require("../assets/images/accessories/wheel.png"),
    originalPrice: "$250.00",
    discountPrice: "$210.00",
    rating: 5,
    description: "Smooth clutch performance.",
    options: "Complete Kit",
    status: "available",
  },
];

const CATEGORY_IMAGES: Record<string, any> = {
  Tyres: require("../assets/images/accessories-detail/tyre-detail.png"),
  Battery: require("../assets/images/accessories/battery.png"),
  Lights: require("../assets/images/accessories/lights.png"),
  Brakes: require("../assets/images/accessories/brakes.png"),
  "Side Mirror": require("../assets/images/accessories/side-mirror.png"),
  Suspension: require("../assets/images/accessories/suspension.png"),
  "Body Parts": require("../assets/images/accessories/body-parts.png"),
  Clutch: require("../assets/images/accessories/wheel.png"),
  Default: require("../assets/images/accessories/header.png"),
};

export default function AccessoryListScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const { categoryTitle = "Tyres & Wheel Care" } = useLocalSearchParams() as {
    categoryTitle: string;
  };
  const { addToCart } = useCart();

  const brands = ALL_BRANDS;
  const products = ALL_PRODUCTS.filter(
    (product) => product.type === categoryTitle,
  );
  const headerImage =
    CATEGORY_IMAGES[categoryTitle] || CATEGORY_IMAGES["Default"];

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
          <SearchButton
            onPress={() =>
              router.push({
                pathname: "/accessories-search",
                params: { categoryTitle },
              })
            }
          />
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
            {brands.map((brand) => (
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
          <View
            className={`relative w-full ${categoryTitle === "Tyres" ? "h-48" : "h-32"} items-center justify-center`}
          >
            <Image
              source={headerImage}
              style={{ width: "100%", height: "100%", borderRadius: 5 }}
              contentFit="contain"
            />
          </View>
        </View>

        {/* Product List */}
        <View className="px-6 pb-8">
          {products.length > 0 ? (
            products.map((product) => (
              <AccessoryProductCard
                key={product.id}
                product={product}
                onPress={() =>
                  router.push({
                    pathname: "/accessory-detail",
                    params: { id: product.id, title: product.title },
                  })
                }
                onAddToCart={() => {
                  addToCart({
                    id: product.id,
                    title: product.title,
                    subtitle:
                      product.options || product.description.substring(0, 20),
                    originalPrice: product.originalPrice,
                    discountPrice: product.discountPrice,
                    expectedDelivery: "20th November",
                    image: product.image,
                    quantity: 1,
                  });
                }}
              />
            ))
          ) : (
            <Text className="text-center text-gray-500 mt-10">
              No products available
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
