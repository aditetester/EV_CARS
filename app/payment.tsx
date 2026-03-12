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
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";

export default function PaymentScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const {
    station: stationJson,
    duration,
    total: totalFromParam,
    type,
    itemId,
    brand,
    carName,
    price: carPrice,
    image: carImageParam,
  } = useLocalSearchParams() as any;
  const isAccessories = type === "accessories";
  const isVehicle = type === "vehicle";
  const station = stationJson ? JSON.parse(stationJson) : {};
  const orderTotal =
    totalFromParam ||
    (isAccessories ? "760.50" : isVehicle ? carPrice : "8.50");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { addOrder } = useOrders();
  const { items: cartItems, clearCart, removeItem } = useCart();

  // Safely parse car image
  let parsedCarImage: any = null;
  try {
    parsedCarImage = carImageParam ? JSON.parse(carImageParam) : null;
  } catch {
    parsedCarImage = null;
  }

  // Which items to display: single item or all cart items
  const displayItems = isAccessories
    ? itemId && itemId !== "all"
      ? cartItems.filter((i) => i.id === itemId)
      : cartItems
    : [];

  // Compute bill totals from the displayed items
  const mrp = isVehicle
    ? parseFloat(carPrice?.replace(/[^0-9.]/g, "")) || 0
    : displayItems.reduce((sum, item) => {
        const price =
          parseFloat(item.originalPrice.replace(/[^0-9.]/g, "")) || 0;
        return sum + price * item.quantity;
      }, 0);
  const discountedTotal = isVehicle
    ? mrp
    : displayItems.reduce((sum, item) => {
        const price =
          parseFloat(item.discountPrice.replace(/[^0-9.]/g, "")) || 0;
        return sum + price * item.quantity;
      }, 0);
  const productDiscount = mrp - discountedTotal;
  const couponDiscount = isVehicle ? 0 : displayItems.length > 0 ? 10 : 0;
  const billTotal = Math.max(0, discountedTotal - couponDiscount);

  const finalTotal =
    isAccessories || isVehicle
      ? billTotal.toFixed(2)
      : (parseFloat(orderTotal) - 1.0).toFixed(2);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    if (isAccessories) {
      // Add only the displayed items as orders
      displayItems.forEach((item) => {
        addOrder({
          id: `BEOS${Math.floor(Math.random() * 100000)}`,
          title: item.title,
          dateTitle: "Expected Delivery",
          date: item.expectedDelivery || "Soon",
          image: item.image,
          type: "ACCESSORIES",
        });
      });
      // Remove only the paid item(s) from cart
      if (itemId && itemId !== "all") {
        removeItem(itemId);
      } else {
        clearCart();
      }
      router.replace("/orders");
    } else if (isVehicle) {
      addOrder({
        id: `BEOS${Math.floor(Math.random() * 100000)}`,
        title: `${brand} ${carName}`,
        dateTitle: "Expected Delivery",
        date: "Within 7 Days",
        image: parsedCarImage || require("../assets/images/car-detail/car.png"),
        type: "VEHICLE BOOKING",
      });
      router.replace("/orders");
    } else {
      addOrder({
        id: `BEOS${Math.floor(Math.random() * 100000)}`,
        title: `${station.name || "Station"} Charging\nDuration : ${duration || "1hr 30min"}`,
        dateTitle: "Delivered on",
        date: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
        }),
        image: require("../assets/images/ev-network/stations.jpg"),
        type: "CHARGING",
      });
      router.replace("/orders");
    }
  };

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
      {(isAccessories || isVehicle) && (
        <View className="px-8">
          <Text className="font-black text-2xl dark:text-white uppercase">
            Payment
          </Text>
          <Text className="text-gray-400 text-md font-bold -mt-1">
            Order details
          </Text>
        </View>
      )}
      {!isAccessories && !isVehicle && (
        <Text className="text-center font-bold text-2xl mb-2 dark:text-white">
          Order Details
        </Text>
      )}
      <ScrollView className="px-6">
        {/* ORDER ITEMS / ID Box */}
        {isAccessories ? (
          <View className="bg-gray-50 dark:bg-gray-900 rounded-[32px] p-4 mb-4">
            {displayItems.length === 0 ? (
              <Text className="text-gray-400 text-sm text-center py-4">
                No items found
              </Text>
            ) : (
              displayItems.map((item, index) => (
                <View key={item.id}>
                  {index > 0 && (
                    <View className="h-[1px] bg-gray-200 dark:bg-white/5 my-4" />
                  )}
                  <View className="flex-row items-center">
                    <View className="w-16 h-16 bg-white dark:bg-black rounded-2xl items-center justify-center p-1 mr-4 border border-gray-100 dark:border-white/5">
                      <Image
                        source={item.image}
                        style={{ width: "90%", height: "90%", borderRadius: 6 }}
                        contentFit="cover"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-emerald-500 font-bold text-[10px]">
                        {item.subtitle}
                      </Text>
                      <Text className="text-xs font-black text-yellow-500 uppercase leading-tight mt-0.5">
                        {item.title}
                      </Text>
                      <Text className="text-[10px] text-gray-400 font-medium italic mt-0.5">
                        Delivery by {item.expectedDelivery}
                      </Text>
                    </View>
                    <View className="items-end">
                      {item.originalPrice !== "" && (
                        <Text className="text-xs text-gray-400 font-bold line-through">
                          {item.originalPrice}
                        </Text>
                      )}
                      <Text className="text-sm font-black text-yellow-500">
                        {item.discountPrice}
                      </Text>
                      {item.quantity > 1 && (
                        <Text className="text-[10px] text-gray-400 font-medium mt-0.5">
                          Qty: {item.quantity}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        ) : isVehicle ? (
          <View className="bg-gray-50 dark:bg-gray-900 rounded-[32px] p-4 mb-4">
            <View className="flex-row items-center">
              <View className="w-24 h-16 bg-white dark:bg-black rounded-2xl items-center justify-center p-1 mr-4 border border-gray-100 dark:border-white/5">
                <Image
                  source={
                    parsedCarImage ||
                    require("../assets/images/car-detail/car.png")
                  }
                  style={{ width: 150, height: 150, borderRadius: 6 }}
                  contentFit="contain"
                />
              </View>
              <View className="flex-1">
                <Text className="text-emerald-500 font-bold text-[10px]">
                  {brand}
                </Text>
                <Text className="text-sm font-black text-yellow-500 uppercase leading-tight mt-0.5">
                  {carName}
                </Text>
                <Text className="text-[10px] text-gray-400 font-medium italic mt-0.5">
                  Expected Delivery: Within 7 Days
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-sm font-black text-yellow-500">
                  {carPrice}
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
              <BillRow label="MRP" value={`$${mrp.toFixed(2)}`} />
              <BillRow
                label="Product discount"
                value={`-$${productDiscount.toFixed(2)}`}
                isDiscount
              />
              <BillRow
                label="Item total"
                value={`$${discountedTotal.toFixed(2)}`}
              />
              <BillRow
                label="Coupon Code"
                value={`-$${couponDiscount.toFixed(2)}`}
                isDiscount
              />
              <BillRow label="Delivery Charges" value="Free" />
              <View className="mt-2 pt-2 border-t border-gray-100 dark:border-white/5">
                <BillRow
                  label="Bill total"
                  value={`$${billTotal.toFixed(2)}`}
                  isTotal
                />
              </View>
            </>
          ) : isVehicle ? (
            <>
              <BillRow label="Car Price" value={`$${mrp.toFixed(2)}`} />
              <BillRow label="Registration" value="Free" />
              <BillRow label="Insurance" value="Included" />
              <BillRow label="Delivery Charges" value="Free" />
              <View className="mt-2 pt-2 border-t border-gray-100 dark:border-white/5">
                <BillRow
                  label="Bill total"
                  value={`$${billTotal.toFixed(2)}`}
                  isTotal
                />
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

        {/* Delivery Details (Accessories & Vehicles) */}
        {(isAccessories || isVehicle) && (
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
        transparent={!isAccessories && !isVehicle}
        animationType="fade"
        onRequestClose={handleCloseSuccessModal}
      >
        <View
          className={`flex-1 ${
            isAccessories || isVehicle
              ? "bg-white dark:bg-black"
              : "bg-black/50 justify-center px-8"
          }`}
        >
          <View
            className={`${
              isAccessories || isVehicle
                ? "flex-1 justify-center p-8"
                : "bg-white dark:bg-gray-900 rounded-[32px] p-8 items-center shadow-xl relative min-h-[400px] justify-center"
            }`}
          >
            {isAccessories || isVehicle ? (
              <>
                <View className="items-center mb-6">
                  <Text className="text-2xl font-black text-yellow-500 text-center uppercase px-4 leading-tight">
                    Order Placed Successfully
                  </Text>
                  {isVehicle && (
                    <View className="items-center">
                      <Image
                        source={
                          parsedCarImage ||
                          require("../assets/images/car-detail/car.png")
                        }
                        style={{ width: 400, height: 400 }}
                        contentFit="contain"
                      />
                      <Text className="text-xl font-black dark:text-white uppercase">
                        {brand} {carName}
                      </Text>
                      <Text className="text-gray-500 font-bold mt-2">
                        Booking ID: BEOS{Math.floor(Math.random() * 100000)}
                      </Text>
                    </View>
                  )}
                </View>

                {!isVehicle && (
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
                )}

                {isVehicle && (
                  <View className="w-full">
                    <ActionButton
                      title="VIEW ORDERS"
                      onPress={handleCloseSuccessModal}
                      className="bg-emerald-500 rounded-full py-5 items-center justify-center"
                      textClassName="text-white font-black text-center tracking-widest text-base"
                    />
                  </View>
                )}
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
                    onPress={handleCloseSuccessModal}
                    className="bg-emerald-500 rounded-full py-4"
                    textClassName="text-white font-bold text-center tracking-widest text-md"
                  />
                </View>
              </>
            )}
          </View>

          {/* Close Button */}
          <TouchableOpacity
            onPress={handleCloseSuccessModal}
            className={`${
              isAccessories || isVehicle
                ? "absolute top-4 right-6"
                : "mt-12 self-center"
            } bg-gray-800 w-14 h-14 rounded-full items-center justify-center shadow-lg`}
          >
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
