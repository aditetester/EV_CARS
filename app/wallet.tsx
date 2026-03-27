import { Colors } from "@/constants/theme";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WalletScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // Dummy realistic transactions
  const transactions = [
    {
      id: 1,
      title: "Added Money",
      amount: "+₹500",
      type: "credit",
      time: "Today, 10:30 AM",
      icon: "arrow-down",
      color: "green",
    },
    {
      id: 2,
      title: "Car Service Payment",
      amount: "-₹300",
      type: "debit",
      time: "Yesterday, 6:20 PM",
      icon: "tools",
      color: "red",
    },
    {
      id: 3,
      title: "Refund Received",
      amount: "+₹200",
      type: "credit",
      time: "Mar 20, 2:15 PM",
      icon: "undo",
      color: "green",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <ScrollView>
        {/* Header */}
        <View className="flex-row items-center px-6 pt-4 mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={28}
              color={isDark ? "white" : "black"}
            />
          </TouchableOpacity>

          <Text className="flex-1 text-center text-xl font-black text-black dark:text-white uppercase mr-10">
            Wallet
          </Text>
        </View>

        {/* Balance Card */}
        <View className="px-6 mt-4">
          <View
            style={{
              backgroundColor: isDark
                ? Colors.dark.emerald
                : Colors.light.emerald,
            }}
            className="rounded-3xl p-6 shadow-xl"
          >
            <Text className="text-white text-sm opacity-80">
              Available Balance
            </Text>

            <Text className="text-white text-4xl font-bold mt-2">₹ 1,250</Text>

            {/* Actions */}
            <View className="flex-row mt-5 justify-between">
              <TouchableOpacity className="bg-white px-4 py-2 rounded-xl flex-row items-center gap-2">
                <Ionicons name="add" size={18} color="black" />
                <Text
                  style={{
                    color: isDark ? Colors.dark.emerald : Colors.light.emerald,
                  }}
                  className="font-semibold"
                >
                  Add Money
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="bg-white px-4 py-2 rounded-xl flex-row items-center gap-2">
                <Ionicons name="arrow-forward" size={18} color="black" />
                <Text
                  style={{
                    color: isDark ? Colors.dark.emerald : Colors.light.emerald,
                  }}
                  className="font-semibold"
                >
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Transactions */}
        <View className="px-6 mt-6">
          <Text className="text-gray-400 font-bold mb-3 uppercase">
            Recent Transactions
          </Text>

          {transactions.length === 0 ? (
            <Text className="text-center text-gray-400 mt-6">
              No transactions yet
            </Text>
          ) : (
            transactions.map((item) => (
              <View
                key={item.id}
                className="flex-row justify-between items-center py-4 border-b border-gray-200 dark:border-gray-800"
              >
                {/* Left */}
                <View className="flex-row items-center gap-3">
                  <View
                    className={`p-2 rounded-full ${
                      item.type === "credit" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <FontAwesome5
                      name={item.icon}
                      size={14}
                      color={item.type === "credit" ? "green" : "red"}
                    />
                  </View>

                  <View>
                    <Text className="text-black dark:text-white font-semibold">
                      {item.title}
                    </Text>
                    <Text className="text-gray-400 text-xs">{item.time}</Text>
                  </View>
                </View>

                {/* Right */}
                <Text
                  className={`font-bold ${
                    item.type === "credit" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.amount}
                </Text>
              </View>
            ))
          )}
        </View>

        {/* Bottom spacing */}
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
