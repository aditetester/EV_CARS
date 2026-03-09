import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useOrders } from "../context/OrderContext";

export default function OrdersScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const { orders } = useOrders();

  const [activeTab, setActiveTab] = useState("ALL");

  const filteredOrders =
    activeTab === "ALL"
      ? orders
      : orders.filter((item) => item.type === activeTab);

  return (
    <View className="flex-1 bg-white dark:bg-black pt-12 px-4">
      {/* Header */}
      <View className="pb-6 px-4">
        {/* Top Row */}

        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={26}
            color={isDark ? "white" : "black"}
          />
        </TouchableOpacity>

        {/* Title */}
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-semibold text-black dark:text-white">
            Orders
          </Text>
          <Ionicons name="bag-check-outline" size={40} color="#DADADA" />
        </View>
      </View>

      {/* Tabs Wrapper */}
      <View className="items-center mb-6">
        <View className="bg-[#14B89A] rounded-full overflow-hidden flex-row">
          {["ALL", "ACCESSORIES", "VEHICLE BOOKING", "CHARGING"].map(
            (tab, index) => {
              const isActive = activeTab === tab;

              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className={`py-3 px-4 items-center justify-center ${
                    isActive ? "bg-[#F2C94C]" : ""
                  } ${index !== 0 ? "border-l border-white/40" : ""}`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      isActive ? "text-black" : "text-white"
                    }`}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            },
          )}
        </View>
      </View>

      {/* Orders List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {filteredOrders.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              router.push({
                pathname: "/order-type",
                params: {
                  id: item.id,
                  type: item.type,
                  title: item.title,
                  dateTitle: item.dateTitle,
                  date: item.date,
                  image: JSON.stringify(item.image),
                },
              })
            }
            className="flex-row items-center mb-6"
          >
            <Image source={item.image} className="w-20 h-20 rounded-lg mr-4" />

            <View className="flex-1">
              <Text className="text-sm text-gray-400">
                Order ID : {item.id}
              </Text>

              <Text className="text-md font-semibold text-green-600 mt-1">
                {item.title}
              </Text>

              <View className="flex-row items-center gap-1">
                <Text className="text-sm text-gray-400">{item.dateTitle}</Text>
                <Text className="text-sm text-orange-500">{item.date}</Text>
              </View>
            </View>

            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
