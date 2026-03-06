import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderTypeScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      {/* Header */}
      <View className="flex-row items-center px-6 pt-2 mb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons
            name="arrow-back"
            size={28}
            color={isDark ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Tell us more banner - Clickable */}
        <TouchableOpacity className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-5 mb-4 flex-row items-center justify-between border border-gray-100 dark:border-white/5">
          <View className="flex-row items-center flex-1">
            <View className="w-10 h-10 bg-white dark:bg-black rounded-full items-center justify-center mr-4">
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color={isDark ? "white" : "black"}
              />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-black text-black dark:text-white uppercase leading-tight">
                Tell us more about your vehicle
              </Text>
              <Text className="text-[10px] text-gray-500 font-medium mt-1">
                Your answers will help us enhance your shopping experience
              </Text>
            </View>
          </View>
          <View className="bg-emerald-500 px-4 py-2 rounded-full">
            <Text className="text-white text-[10px] font-black uppercase">
              Let&apos;s Go!
            </Text>
          </View>
        </TouchableOpacity>

        {/* Order Summary Card */}
        <View className="bg-gray-50 dark:bg-gray-900 rounded-[32px] mb-8 border border-gray-100 dark:border-white/5 overflow-hidden">
          <View className="p-5 pb-0">
            <View className="flex-row items-center mb-2">
              <View className="mr-3">
                <Ionicons
                  name="bag-check-outline"
                  size={32}
                  color={isDark ? "white" : "black"}
                />
              </View>
              <View>
                <Text className="text-base font-black text-black dark:text-white uppercase leading-tight">
                  Order Summary
                </Text>
                <Text className="text-[11px] text-gray-500 font-medium mt-0.5">
                  Order ID - #BEOS2031983
                </Text>
              </View>
            </View>

            {/* Product Thumbnails */}
            <View className="flex-row gap-3 mb-3">
              <View className="w-[72px] h-[72px] bg-white dark:bg-black rounded-2xl items-center justify-center border border-gray-100 dark:border-white/5">
                <Image
                  source={require("../assets/images/accessories-cart/cart-item-1.png")}
                  style={{ width: "80%", height: "80%" }}
                  contentFit="contain"
                />
              </View>
              <View className="w-[72px] h-[72px] bg-white dark:bg-black rounded-2xl items-center justify-center border border-gray-100 dark:border-white/5">
                <Image
                  source={require("../assets/images/accessories-cart/cart-item-2.png")}
                  style={{ width: "80%", height: "80%" }}
                  contentFit="contain"
                />
              </View>
              <View className="w-[72px] h-[72px] bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-white/5" />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/order-summary")}
            className="bg-emerald-500 py-4 items-center justify-center"
          >
            <Text className="text-white font-black text-[10px] tracking-widest uppercase">
              View Order Summary
            </Text>
          </TouchableOpacity>
        </View>

        {/* High-level Status Tracker */}
        <View className="mb-4 px-2">
          <View className="flex-row items-center">
            <View className="h-[2px] flex-1 bg-yellow-500" />
            <View className="h-[2px] flex-1 bg-gray-200 dark:bg-white/10" />
          </View>
          <View className="flex-row justify-between mt-[-10px]">
            <View className="items-center w-24">
              <View className="w-5 h-5 rounded-full border-4 border-yellow-500 bg-white dark:bg-black items-center justify-center">
                <View className="w-2 h-2 bg-emerald-500 rounded-full" />
              </View>
              <Text className="text-[9px] font-black text-black dark:text-white mt-1 uppercase">
                Confirmed
              </Text>
            </View>
            <View className="items-center w-24">
              <View className="w-5 h-5 rounded-full border-4 border-gray-200 dark:border-white/10 bg-white dark:bg-black" />
              <Text className="text-[9px] font-bold text-gray-400 mt-1 uppercase">
                Dispatched
              </Text>
            </View>
            <View className="items-center w-24">
              <View className="w-5 h-5 rounded-full border-4 border-gray-200 dark:border-white/10 bg-white dark:bg-black" />
              <Text className="text-[9px] font-bold text-gray-400 mt-1 uppercase">
                Delivered
              </Text>
            </View>
          </View>
        </View>

        {/* Delivery Details - Matches accessories-cart design */}
        <View className="bg-white dark:bg-black border border-gray-100 dark:border-white/10 rounded-[32px] p-6 mb-6 shadow-sm">
          <View className="flex-row items-center mb-2">
            <View className="w-12 h-12 items-center justify-center mr-3 -ml-2">
              <Image
                source={require("../assets/images/accessories-cart/delivery.png")}
                style={{ width: "100%", height: "100%" }}
                contentFit="contain"
                tintColor={isDark ? "white" : "black"}
              />
            </View>
            <View>
              <Text className="text-sm font-black text-black dark:text-white uppercase leading-tight">
                Your delivery details
              </Text>
              <Text className="text-[10px] text-gray-400 font-medium">
                Details of your current order
              </Text>
            </View>
          </View>

          <View className="h-[1px] bg-gray-50 dark:bg-white/5 mb-6 -mx-6" />

          <View className="flex-row items-center mb-6">
            <View className="w-8 h-8 items-center justify-center mr-4">
              <Ionicons
                name="location-outline"
                size={28}
                color={isDark ? "white" : "black"}
              />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-black text-black dark:text-white uppercase leading-tight">
                Delivery at Home
              </Text>
              <Text className="text-[11px] text-gray-600 dark:text-gray-400 font-medium leading-tight mt-1">
                102. LB St. Street, Calvery, Onixo, Texas, BHA 5043
              </Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="w-8 h-8 items-center justify-center mr-4">
              <Ionicons
                name="call-outline"
                size={24}
                color={isDark ? "white" : "black"}
              />
            </View>
            <Text className="text-sm font-black text-black dark:text-white">
              Nishaanth, 9515XXXXXX
            </Text>
          </View>
        </View>

        {/* Need Help Section */}
        <TouchableOpacity className="bg-gray-50 dark:bg-gray-900 rounded-[32px] px-6 py-6 mb-10 flex-row items-center border border-gray-100 dark:border-white/5">
          <View className="w-14 h-14 items-center justify-center mr-4">
            <Image
              source={require("../assets/images/accessories-cart/need-help.png")}
              style={{ width: "100%", height: "100%" }}
              contentFit="contain"
            />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-black text-black dark:text-white uppercase">
              Need Help?
            </Text>
            <Text className="text-[10px] text-gray-500 font-medium leading-tight mt-1">
              Chat with us about any issue related to your order
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={isDark ? "#3f3f46" : "#d4d4d8"}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
