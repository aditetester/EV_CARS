import ActionButton from "@/components/ActionButton";
import BillRow from "@/components/BillRow";
import PaymentMethods from "@/components/PaymentMethods";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const {
    station: stationJson,
    duration,
    total: totalFromParam,
  } = useLocalSearchParams() as any;
  const station = stationJson ? JSON.parse(stationJson) : {};
  const orderTotal = totalFromParam || "8.50";
  const finalTotal = (parseFloat(orderTotal) - 1.0).toFixed(2);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const OrderDetailItem = ({
    label,
    value,
    isBold = false,
    color = "text-black dark:text-white",
  }: any) => (
    <View className="flex-1">
      <Text className="text-gray-400 text-[10px] uppercase font-bold">
        {label}
      </Text>
      <Text
        className={`${isBold ? "font-bold" : "font-medium"} ${color} text-sm mt-1`}
      >
        {value}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="flex-row items-center px-6 pt-2">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons
            name="arrow-back"
            size={28}
            color={isDark ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
      <Text className="text-center font-bold text-2xl mb-2 dark:text-white">
        Order Details
      </Text>
      <ScrollView className="px-6">
        {/* ORDER ID Box */}
        <View className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm mb-3">
          <View className="flex-row justify-between items-center">
            <Text className="text-emerald-500 font-bold text-xs uppercase">
              ORDER ID: {station.id}
            </Text>
            <TouchableOpacity>
              <Text className="text-red-500 font-bold text-xs">Remove</Text>
            </TouchableOpacity>
          </View>

          {/* Station Details Box */}
          <View className="flex-row justify-between mt-3">
            <OrderDetailItem label="Station" value={station.name} isBold />
            <OrderDetailItem label="Duration" value={duration} isBold />
            <View className="items-end">
              <Text className="text-gray-400 text-[10px] uppercase font-bold">
                Total
              </Text>
              <Text className="font-bold text-black dark:text-white text-sm mt-1">
                ${parseFloat(orderTotal).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Coins Box */}
        <View className="bg-white dark:bg-gray-900 shadow-sm rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden mb-3">
          <View className="flex-row items-center justify-between px-4 py-2">
            <View className="flex-row items-center">
              <Text className="text-black dark:text-white font-bold text-md">
                400
              </Text>
              <Image
                source={require("../assets/images/payments/coin.png")}
                style={{ width: 16, height: 16, marginHorizontal: 4 }}
              />
              <Text className="text-black dark:text-white font-bold text-md mr-2">
                Coins Applied
              </Text>
              <Image
                source={require("../assets/images/payments/right-sign.png")}
                style={{ width: 14, height: 14 }}
              />
            </View>
            <Text className="text-emerald-500 font-bold">-$1.00</Text>
          </View>
          <TouchableOpacity className="bg-gray-100 dark:bg-gray-800 py-1">
            <Text className="text-emerald-500 font-bold text-center text-xs">
              View More Offers
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bill Details */}
        <View className="bg-white dark:bg-gray-900 shadow-sm rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden px-4 py-2">
          <Text className="font-bold text-lg mb-1 dark:text-white">
            Bill details
          </Text>
          <BillRow
            label="Order Total"
            value={`$${parseFloat(orderTotal).toFixed(2)}`}
          />
          <BillRow label="Coupon Applied" value="-$1.00" isDiscount />
          <View className="h-[1px] bg-gray-100 dark:bg-gray-800 my-1" />
          <BillRow label="Total" value={`$${finalTotal}`} isTotal />
        </View>

        {/* Payment Methods Component */}
        <PaymentMethods
          finalTotal={finalTotal}
          onPaymentSuccess={() => setShowSuccessModal(true)}
        />

        {/* Payment Button */}
        <View className="my-8">
          <ActionButton
            title="PAYMENT"
            onPress={() => setShowSuccessModal(true)}
            className="bg-emerald-500 rounded-full py-4 shadow-lg shadow-emerald-200"
            textClassName="text-white font-bold text-center tracking-widest"
          />
        </View>
      </ScrollView>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View className="flex-1 bg-black/60 justify-center px-8">
          <View className="bg-white dark:bg-gray-900 rounded-[32px] p-8 items-center shadow-xl relative mt-10">
            {/* Success Checkmark */}
            <View className="absolute -top-10 bg-yellow-400 w-20 h-20 rounded-full items-center justify-center border-4 border-white dark:border-gray-900 shadow-lg">
              <Ionicons name="checkmark" size={48} color="white" />
            </View>

            <View className="mt-12 items-center mb-8">
              <Text className="text-xl font-bold text-center dark:text-white">
                Congratulations
              </Text>
              <Text className="text-gray-400 text-sm mt-1">
                Order Placed Successful
              </Text>
            </View>

            {/* Dotted Line Simulation */}
            <View className="w-full flex-row justify-between relative mb-8">
              <View className="w-full h-0 border-t border-dashed border-gray-200 dark:border-gray-800" />
            </View>

            <View className="w-full">
              <View className="mb-4">
                <Text className="text-gray-400 text-[10px] uppercase font-bold">
                  Station
                </Text>
                <Text className="font-bold text-black dark:text-white text-sm mt-1">
                  {station.name || "BR Road Charging Station"}
                </Text>
              </View>
              <View className="mb-4">
                <Text className="text-gray-400 text-[10px] uppercase font-bold">
                  Start Time
                </Text>
                <Text className="font-bold text-black dark:text-white text-sm mt-1">
                  17 Nov, 2023, 10:45 am
                </Text>
              </View>
              <View className="mb-4">
                <Text className="text-gray-400 text-[10px] uppercase font-bold">
                  Duration
                </Text>
                <Text className="font-bold text-black dark:text-white text-sm mt-1">
                  {duration || "1hr 30min"}
                </Text>
              </View>

              <View className="mb-4">
                <Text className="text-gray-400 text-[10px] uppercase font-bold">
                  Total
                </Text>
                <Text className="font-bold text-yellow-500 text-3xl mt-1">
                  ${finalTotal}
                </Text>
              </View>

              <View className="mb-4">
                <Text className="text-gray-400 text-[10px] uppercase font-bold">
                  Pay Via
                </Text>
                <Text className="font-bold text-black dark:text-white text-sm mt-1">
                  Payment Method
                </Text>
              </View>
            </View>

            <View className="w-full gap-4 mt-6">
              <ActionButton
                title="GET A ROUTE"
                onPress={() => {
                  setShowSuccessModal(false);
                  router.replace("/ev-network");
                }}
                className="bg-emerald-500 rounded-full py-4"
                textClassName="text-white font-bold text-center tracking-widest text-md"
              />
              <ActionButton
                title="ACCESS CHARGING STATION"
                onPress={() => setShowSuccessModal(false)}
                className="bg-emerald-500 rounded-full py-4"
                textClassName="text-white font-bold text-center tracking-widest text-md"
              />
            </View>
          </View>

          {/* Close Button */}
          <TouchableOpacity
            onPress={() => setShowSuccessModal(false)}
            className="mt-12 self-center bg-gray-800 w-14 h-14 rounded-full items-center justify-center shadow-lg"
          >
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
