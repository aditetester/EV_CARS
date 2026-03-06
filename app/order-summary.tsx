import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BillRow from "../components/BillRow";

export default function OrderSummaryScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const statusSteps = ["Confirmed", "Dispatched", "Delivered"];
  const currentStep = 0; // Confirmed

  const OrderItem = ({
    title,
    price,
    originalPrice,
    hasActiveBorder,
  }: {
    title: string;
    price: string;
    originalPrice: string;
    hasActiveBorder?: boolean;
  }) => (
    <View className="bg-gray-50 dark:bg-gray-900 rounded-[32px] p-5 mb-4 border border-gray-100 dark:border-white/5">
      <View className="flex-row">
        {/* Image Section */}
        <View className="w-24 h-24 bg-white dark:bg-black rounded-2xl mr-4 items-center justify-center p-2" />

        {/* Content Section */}
        <View className="flex-1">
          <View className="flex-row justify-between items-start mb-2">
            <Text
              className="flex-1 text-sm font-black text-black dark:text-white leading-tight pr-2"
              numberOfLines={2}
            >
              {title}
            </Text>
            <View className="items-end">
              <Text className="text-slate-400 text-sm font-bold">
                {originalPrice}
              </Text>
              <Text className="text-yellow-500 text-sm font-black mt-0.5">
                {price}
              </Text>
            </View>
          </View>

          {/* Item Status Tracker */}
          <View className="mt-4 mr-2 mb-2">
            <View className="relative w-full">
              {/* Connecting line: spans from center of first circle to center of last circle */}
              <View className="absolute top-[7px] left-[28px] right-[28px] h-[2px] bg-slate-300 dark:bg-white/20" />

              <View className="flex-row justify-between w-full relative z-10">
                {statusSteps.map((step, index) => (
                  <View key={step} className="items-center w-14">
                    <View
                      className={`w-4 h-4 rounded-full border-2 shadow-[0_1px_2px_rgba(0,0,0,0.1)] ${
                        index <= currentStep
                          ? "border-yellow-500 bg-emerald-500"
                          : "border-gray-300 bg-white"
                      }`}
                    />
                    <Text
                      className={`text-[9px] font-bold italic mt-1.5 text-center ${
                        index <= currentStep
                          ? "text-black dark:text-white"
                          : "text-gray-400"
                      }`}
                    >
                      {step}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

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
      <View className="px-6 mb-4">
        <Text className="font-black text-2xl dark:text-white uppercase">
          Order Summary
        </Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-yellow-500 text-[10px] font-black uppercase underline mr-1">
            Download Invoice
          </Text>
          <Ionicons name="download-outline" size={12} color="#EAB308" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <Text className="text-sm font-black text-black dark:text-white uppercase mb-4">
          3 items in this order
        </Text>

        <OrderItem
          title="Alloy Wheels 16 Inches for KIA EV6"
          originalPrice="$780.50"
          price="$680.50"
          hasActiveBorder
        />
        <OrderItem
          title="Alloy Wheels 16 Inches for KIA EV6"
          originalPrice="$780.50"
          price="$680.50"
        />
        <OrderItem
          title="Alloy Wheels 16 Inches for KIA EV6"
          originalPrice="$780.50"
          price="$680.50"
        />

        {/* Bill Details */}
        <View className="bg-white dark:bg-gray-900 shadow-sm rounded-3xl border border-gray-100 dark:border-white/5 px-5 py-5 mb-6 mt-4">
          <Text className="font-black text-lg mb-4 dark:text-white uppercase">
            Bill details
          </Text>
          <BillRow label="MRP" value="$2341.50" />
          <BillRow label="Product discount" value="-$300.00" isDiscount />
          <BillRow label="Item total" value="$2041.50" />
          <BillRow label="Coupon Code" value="-$250.50" isDiscount />
          <BillRow label="Delivery Charges" value="Free" />
          <View className="mt-3 pt-3 border-t border-gray-50 dark:border-white/5">
            <BillRow label="Bill total" value="$1791.00" isTotal />
          </View>
        </View>

        {/* Order details */}
        <View className="bg-white dark:bg-gray-900 shadow-sm rounded-3xl border border-gray-100 dark:border-white/5 px-5 py-5 mb-6">
          <Text className="font-black text-lg mb-4 dark:text-white uppercase">
            Order details
          </Text>

          <View className="mb-4">
            <Text className="text-gray-400 text-[10px] uppercase font-bold">
              Order id
            </Text>
            <Text className="font-black text-black dark:text-white text-xs mt-0.5">
              BEOS2030912
            </Text>
          </View>

          <View className="mb-4">
            <Text className="text-gray-400 text-[10px] uppercase font-bold">
              Payment
            </Text>
            <Text className="font-black text-black dark:text-white text-xs mt-0.5">
              Paid Online
            </Text>
          </View>

          <View className="mb-4">
            <Text className="text-gray-400 text-[10px] uppercase font-bold">
              Delivered to
            </Text>
            <Text className="font-black text-black dark:text-white text-xs mt-0.5 leading-tight">
              102. LB St. Street, Calvery, Onixo, Texas, BHA 5043
            </Text>
          </View>

          <View>
            <Text className="text-gray-400 text-[10px] uppercase font-bold">
              Order placed
            </Text>
            <Text className="font-black text-black dark:text-white text-xs mt-0.5">
              15th November 2023, 7:14PM
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
