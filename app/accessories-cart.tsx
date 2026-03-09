import ActionButton from "@/components/ActionButton";
import BillRow from "@/components/BillRow";
import CartItemCard from "@/components/CartItemCard";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../context/CartContext";

const RECOMMENDED_PRODUCTS = [
  {
    id: "rec1",
    title: "Godrej Aer-\nDashboard car...",
    image: require("../assets/images/accessories-cart/freshner.jpg"),
  },
  {
    id: "rec2",
    title: "Godrej Aer-\nDashboard car...",
    image: require("../assets/images/accessories-cart/freshner.jpg"),
  },
  {
    id: "rec3",
    title: "",
    image: null,
  },
  {
    id: "rec4",
    title: "",
    image: null,
  },
];

export default function AccessoriesCartScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const { items, updateQuantity, removeItem, addToCart } = useCart();

  // calculate total
  const itemTotal = items.reduce((sum, item) => {
    const priceStr = item.discountPrice.replace(/[^0-9.]/g, "");
    return sum + (parseFloat(priceStr) || 0) * item.quantity;
  }, 0);
  const discount = items.length > 0 ? 10 : 0;
  const billTotal = Math.max(0, itemTotal - discount);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <StatusBar style="auto" />

      {/* Header */}
      <View className="px-6 py-1 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons
            name="arrow-back"
            size={28}
            color={isDark ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Cart Title */}
        <View className="px-6 mb-2">
          <Text className="text-2xl font-black text-black dark:text-white uppercase">
            Cart
          </Text>
        </View>

        {/* Cart Items List */}
        <View className="px-6 mb-4">
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              onPress={() =>
                router.push(
                  `/payment?type=accessories&itemId=${item.id}` as any,
                )
              }
            >
              <CartItemCard
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommended Products SECTION */}
        <View className="mb-4">
          <View className="px-6 mb-3">
            <Text className="text-base font-black text-black dark:text-white">
              You may Like this too
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 24, paddingRight: 8 }}
          >
            {RECOMMENDED_PRODUCTS.map((product) => (
              <View key={product.id} className="mr-3 w-24">
                <View className="w-24 h-24 bg-gray-100 dark:bg-gray-900 rounded-2xl items-center justify-center overflow-hidden border border-gray-50 dark:border-white/5">
                  {product.image ? (
                    <Image
                      source={product.image}
                      style={{ width: "100%", height: "100%" }}
                      contentFit="cover"
                    />
                  ) : (
                    <View className="w-full h-full bg-gray-100 dark:bg-gray-900" />
                  )}
                </View>
                <View className="h-10 mt-1">
                  {product.title !== "" && (
                    <Text
                      className="text-[9px] font-black text-black dark:text-white leading-tight"
                      numberOfLines={2}
                    >
                      {product.title}
                    </Text>
                  )}
                </View>
                {product.title !== "" && (
                  <TouchableOpacity
                    className="bg-emerald-500 rounded-lg py-1.5 items-center"
                    onPress={() =>
                      addToCart({
                        id: product.id,
                        title: product.title,
                        subtitle: "Recommended Product",
                        originalPrice: "$20",
                        discountPrice: "$15",
                        expectedDelivery: "20th November",
                        image: product.image,
                        quantity: 1,
                      })
                    }
                  >
                    <Text className="text-[10px] font-black text-white uppercase">
                      ADD TO CART
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Bill Details */}
        <View className="px-6 mb-4">
          <Text className="text-lg font-black text-black dark:text-white mb-4">
            Bill Details
          </Text>
          <BillRow label="Order Total" value={`$${itemTotal.toFixed(2)}`} />
          <BillRow
            label="Product discount"
            value={`-$${discount.toFixed(2)}`}
            isDiscount
          />
          <View className="mt-2 pt-4 border-t border-gray-100 dark:border-white/10">
            <BillRow label="TOTAL" value={`$${billTotal.toFixed(2)}`} isTotal />
          </View>
        </View>

        {/* Delivery Details */}
        <View className="px-6 mb-6">
          <View className="bg-white dark:bg-black border-2 border-gray-50 dark:border-white/10 rounded-[32px] pl-6 pr-6 shadow-sm">
            {/* Top Row: Scooter Info & Edit Icon */}
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View className="w-14 h-14 items-center justify-center mr-3 -ml-3">
                  <Image
                    source={require("../assets/images/accessories-cart/delivery.png")}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="contain"
                    tintColor={isDark ? "white" : "black"}
                  />
                </View>
                <View>
                  <Text className="text-base font-black text-black dark:text-white">
                    Your delivery details
                  </Text>
                  <Text className="text-[11px] text-gray-500 font-medium">
                    Details of your current order
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather
                  name="edit"
                  size={24}
                  color={isDark ? "white" : "black"}
                />
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="h-[1px] bg-gray-100 dark:bg-white/5 mb-6 -mx-6" />

            {/* Location Row */}
            <View className="flex-row items-start mb-6">
              <View className="w-8 h-10 items-center justify-center mr-4 relative">
                <Ionicons
                  name="location-outline"
                  size={32}
                  color={isDark ? "white" : "black"}
                />
              </View>
              <View className="flex-1 ml-2">
                <Text className="text-sm font-black text-black dark:text-white">
                  Delivery at Home
                </Text>
                <Text className="text-[11px] text-gray-600 dark:text-gray-400 font-medium leading-tight mt-1">
                  102. LB St. Street, Calvery, Onixo, Texas, BHA 5043
                </Text>
              </View>
            </View>

            {/* Contact Row */}
            <View className="flex-row items-center">
              <View className="w-8 h-8 items-center justify-center mr-4">
                <Ionicons
                  name="call-outline"
                  size={26}
                  color={isDark ? "white" : "black"}
                />
              </View>
              <Text className="text-sm font-black text-black dark:text-white ml-2">
                Nishaanth, 9515XXXXXX
              </Text>
            </View>
          </View>
        </View>

        {/* PAYMENT Button */}
        <ActionButton
          title="Payment"
          onPress={() =>
            router.push("/payment?type=accessories&itemId=all" as any)
          }
          className="mr-6 ml-6 mb-2"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
