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
    type,
  } = useLocalSearchParams() as any;
  const isAccessories = type === "accessories";
  const station = stationJson ? JSON.parse(stationJson) : {};
  const orderTotal = totalFromParam || (isAccessories ? "760.50" : "8.50");
  const finalTotal = isAccessories
    ? "740.50"
    : (parseFloat(orderTotal) - 1.0).toFixed(2);

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
      {isAccessories && (
        <View className="px-8">
          <Text className="font-black text-2xl dark:text-white uppercase">
            Payment
          </Text>
          <Text className="text-gray-400 text-md font-bold -mt-1">
            Order details
          </Text>
        </View>
      )}
      {!isAccessories && (
        <Text className="text-center font-bold text-2xl mb-2 dark:text-white">
          Order Details
        </Text>
      )}
      <ScrollView className="px-6">
        {/* ORDER ITEMS / ID Box */}
        {isAccessories ? (
          <View className="bg-gray-50 dark:bg-gray-900 rounded-[32px] p-4 mb-4">
            {/* Item 1 */}
            <View className="flex-row items-center mb-4">
              <View className="w-16 h-16 bg-white dark:bg-black rounded-2xl items-center justify-center p-1 mr-4 border border-gray-100 dark:border-white/5">
                <Image
                  source={require("../assets/images/accessories-cart/cart-item-1.png")}
                  style={{ width: "90%", height: "90%", borderRadius: 6 }}
                  contentFit="cover"
                />
              </View>
              <View className="flex-1">
                <Text className="text-emerald-500 font-bold text-[10px]">
                  215/75R15
                </Text>
                <Text className="text-[10px] text-gray-400 font-medium italic mt-0.5">
                  Delivery by 20th November
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-xs text-gray-400 font-bold line-through">
                  $780.50
                </Text>
                <Text className="text-sm font-black text-yellow-500">
                  $680.50
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View className="h-[1px] bg-gray-200 dark:bg-white/5 mb-4" />

            {/* Item 2 */}
            <View className="flex-row items-center">
              <View className="w-16 h-16 bg-white dark:bg-black rounded-2xl items-center justify-center p-1 mr-4 border border-gray-100 dark:border-white/5">
                <Image
                  source={require("../assets/images/accessories-cart/cart-item-2.png")}
                  style={{ width: "90%", height: "90%", borderRadius: 6 }}
                  contentFit="cover"
                />
              </View>
              <View className="flex-1">
                <Text className="text-emerald-500 font-bold text-[10px]">
                  215/75R15
                </Text>
                <Text className="text-xs font-black text-yellow-500 uppercase leading-tight mt-0.5">
                  KIA EV6 Wipers-Pack of{"\n"}2 (Set)
                </Text>
                <Text className="text-[10px] text-gray-400 font-medium italic mt-0.5">
                  Delivery by 20th November
                </Text>
              </View>
              <View className="items-end justify-end">
                <Text className="text-sm font-black text-yellow-500">
                  $80.00
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm mb-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-emerald-500 font-bold text-xs uppercase">
                ORDER ID: {station.id}
              </Text>
              <TouchableOpacity>
                <Text className="text-red-500 font-bold text-xs">Remove</Text>
              </TouchableOpacity>
            </View>

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
        )}

        {/* Coins Box */}
        <View className="bg-white dark:bg-gray-900 shadow-sm rounded-2xl border border-gray-300 dark:border-gray-800 overflow-hidden mb-4">
          <View className="flex-row items-center justify-between px-4 py-3">
            <View className="flex-row items-center">
              <Text className="text-black dark:text-white font-black text-base">
                400
              </Text>
              <Image
                source={require("../assets/images/payments/coin.png")}
                style={{ width: 20, height: 20, marginHorizontal: 6 }}
              />
              <Text className="text-black dark:text-white font-bold text-sm mr-2">
                Coins Applied
              </Text>
              <Image
                source={require("../assets/images/payments/right-sign.png")}
                style={{ width: 16, height: 16 }}
              />
            </View>
            <Text className="text-emerald-500 font-black text-sm">
              -$100.00
            </Text>
          </View>
          <TouchableOpacity className="bg-gray-100 dark:bg-gray-800 py-1.5">
            <Text className="text-emerald-500 font-bold text-center text-xs">
              View More Offers
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bill Details */}
        <View className="bg-white dark:bg-gray-900 shadow-sm rounded-2xl border border-gray-300 dark:border-gray-800 overflow-hidden px-4 py-4 mb-4">
          <Text className="font-black text-lg mb-4 dark:text-white">
            Bill details
          </Text>
          {isAccessories ? (
            <>
              <BillRow label="MRP" value="$760.50" />
              <BillRow label="Product discount" value="-$10.00" isDiscount />
              <BillRow label="Item total" value="$750.50" />
              <BillRow label="Coupon Code" value="-$10.00" isDiscount />
              <BillRow label="Delivery Charges" value="Free" />
              <View className="mt-2 pt-2 border-t border-gray-100 dark:border-white/5">
                <BillRow label="Bill total" value="$740.50" isTotal />
              </View>
            </>
          ) : (
            <>
              <BillRow
                label="Order Total"
                value={`$${parseFloat(orderTotal).toFixed(2)}`}
              />
              <BillRow label="Coupon Applied" value="-$1.00" isDiscount />
              <View className="h-[1px] bg-gray-100 dark:bg-gray-800 my-1" />
              <BillRow label="Total" value={`$${finalTotal}`} isTotal />
            </>
          )}
        </View>

        {/* Delivery Details (Accessories only) */}
        {isAccessories && (
          <View className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl p-4 mb-4">
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center">
                <View className="w-8 h-8 items-center justify-center mr-3">
                  <Ionicons name="location" size={24} color="#000" />
                </View>
                <View className="flex-1">
                  <Text className="text-md font-black text-black dark:text-white">
                    Delivery at Home
                  </Text>
                  <Text className="text-sm text-gray-500 font-medium leading-tight">
                    102. LB St. Street, Calvery, Onixo, Texas, BHA 5043
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row items-center">
              <View className="w-8 h-8 items-center justify-center mr-3">
                <Ionicons name="call-outline" size={20} color="#000" />
              </View>
              <Text className="text-md font-black text-black dark:text-white">
                Nishaanth, 9515XXXXXX
              </Text>
            </View>
          </View>
        )}

        {/* Payment Methods Component */}
        <PaymentMethods
          finalTotal={finalTotal}
          onPaymentSuccess={() => setShowSuccessModal(true)}
        />

        {/* Payment Button */}
        <View className="my-8">
          <ActionButton
            title="PAY NOW"
            onPress={() => setShowSuccessModal(true)}
            className="bg-emerald-500 rounded-full py-5 items-center justify-center"
            textClassName="text-white font-black text-center tracking-widest text-base"
          />
        </View>
      </ScrollView>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={!isAccessories}
        animationType="fade"
        onRequestClose={() => {
          setShowSuccessModal(false);
          if (isAccessories) router.replace("/order-type" as any);
        }}
      >
        <View
          className={`flex-1 ${
            isAccessories
              ? "bg-white dark:bg-black"
              : "bg-black/50 justify-center px-8"
          }`}
        >
          <View
            className={`${
              isAccessories
                ? "flex-1 justify-center p-8"
                : "bg-white dark:bg-gray-900 rounded-[32px] p-8 items-center shadow-xl relative min-h-[400px] justify-center"
            }`}
          >
            {isAccessories ? (
              <>
                <View className="items-center mb-6">
                  <Text className="text-2xl font-black text-yellow-500 text-center uppercase px-4 leading-tight">
                    Order Placed Successfully
                  </Text>
                </View>

                <View className="flex-row items-center justify-center mt-2 px-10">
                  <Text className="text-gray-500 font-medium italic text-base text-center">
                    wow! You earned 20
                  </Text>
                  <Image
                    source={require("../assets/images/payments/coin.png")}
                    style={{ width: 18, height: 18, marginHorizontal: 4 }}
                  />
                  <Text className="text-gray-500 font-medium italic text-base text-center">
                    Coins on this order
                  </Text>
                </View>
              </>
            ) : (
              <>
                {/* Success Checkmark (Station Flow) */}
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
              </>
            )}
          </View>

          {/* Close Button */}
          <TouchableOpacity
            onPress={() => {
              setShowSuccessModal(false);
              if (isAccessories) router.replace("/order-type" as any);
            }}
            className={`${
              isAccessories ? "absolute top-4 right-6" : "mt-12 self-center"
            } bg-gray-800 w-14 h-14 rounded-full items-center justify-center shadow-lg`}
          >
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
