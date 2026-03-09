import AccessoryProductCard from "@/components/AccessoryProductCard";
import SearchBar from "@/components/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../context/CartContext";
import { ALL_PRODUCTS } from "./accessory-list";

export default function AccessoriesSearchScreen() {
  const { categoryTitle } = useLocalSearchParams();

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const categoryProducts = categoryTitle
    ? ALL_PRODUCTS.filter((product) => product.type === categoryTitle)
    : ALL_PRODUCTS;

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return categoryProducts;
    const query = searchQuery.toLowerCase();
    return categoryProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.type.toLowerCase().includes(query),
    );
  }, [searchQuery, categoryProducts]);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <StatusBar style="auto" />

      {/* Header Section */}
      <View className="px-6 mb-6 pt-6 flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 -ml-2 mr-2"
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color={isDark ? "white" : "black"}
          />
        </TouchableOpacity>

        <SearchBar
          autoFocus
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
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
              No products found matching &quot;{searchQuery}&quot;
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
