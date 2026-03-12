import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ReferralScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState("Upgrade Level");

  return (
    <View className="flex-1 bg-white dark:bg-black">
      {/* Header */}
      <View className="pt-12 pb-4 px-4 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDark ? "white" : "black"}
          />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-2 text-black dark:text-white">
          Referral
        </Text>
      </View>
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Influencer Card */}
        <View className="rounded-[35px] overflow-hidden mb-4 relative bg-[#868484]">
          {/* Main Card Content */}
          <View className="p-6 h-56 justify-between">
            <View className="flex-row justify-between items-start">
              <View>
                <View className="bg-white/30 border-2 border-white/50 p-1 rounded-full w-8 h-8 items-center justify-center mb-6">
                  <Ionicons name="star" size={14} color="white" />
                </View>
                <Text className="text-gray-600 text-2xl font-bold">
                  Influencer
                </Text>
                <Text className="text-white text-md">
                  Valid till <Text className="font-bold">06 Apr 24</Text>
                </Text>
              </View>
              <View className="items-center -mt-4">
                <Image
                  source={require("../assets/images/splash-icon.png")}
                  className="w-28 h-20"
                  resizeMode="contain"
                />
              </View>
            </View>

            <View className="flex-row justify-between items-end">
              <Text className="text-white text-2xl font-bold">Nishaanth B</Text>
              {/* Car Silhouette */}
              <Image
                source={require("../assets/images/referral/header-logo.png")}
                className="w-78 h-40 opacity-70"
                resizeMode="contain"
                style={{ position: "absolute", left: 20, bottom: -50 }}
              />
            </View>
          </View>
        </View>
        {/* Progress Section */}
        <View className="bg-white dark:bg-zinc-900 rounded-[30px] p-6 shadow-sm mb-4 border border-gray-100 dark:border-zinc-800 relative">
          <View className="flex-row items-start">
            <View className="bg-yellow-400 p-2 rounded-full mr-4 shadow-sm">
              <Ionicons name="star" size={18} color="white" />
            </View>
            <View className="flex-1 flex-col">
              <View className="flex-1">
                <Text className="text-base text-black dark:text-white leading-6">
                  Just 5 more referral within 90 days before you become a
                  <Text className="font-bold"> Ambassador</Text>
                </Text>
              </View>

              <View className="h-3 bg-gray-200 dark:bg-zinc-800 rounded-full mb-3 mt-3 overflow-hidden">
                <View className="h-full bg-zinc-700 dark:bg-gray-500 w-[60%] rounded-full" />
              </View>

              <View className="mb-4">
                <Text className="text-sm text-gray-500">
                  Last reset on{" "}
                  <Text className="font-bold text-black dark:text-white">
                    09 Oct 23
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          {/* Current Benefits Dropdown Button */}
          <View className="absolute -bottom-4 left-0 right-0 items-center">
            <TouchableOpacity className="flex-row items-center bg-white dark:bg-zinc-800 px-6 py-2 rounded-xl border border-gray-100 dark:border-zinc-700 shadow-sm">
              <Text className="text-sm font-bold text-black dark:text-white mr-2">
                Current Benefits
              </Text>
              <Ionicons
                name="chevron-down"
                size={18}
                color={isDark ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Wallet & Refer Now */}
        <View className="bg-[#F8F9FA] dark:bg-zinc-900 rounded-2xl overflow-hidden mb-4 mt-4 border border-gray-100 dark:border-zinc-800">
          <View className="px-4 py-2 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="bg-emerald-500 p-2 rounded-lg mr-3">
                <Ionicons name="wallet-outline" size={24} color="white" />
              </View>
              <View className="ml-8">
                <Text className="text-md text-gray-500">
                  Your Wallet Balance
                </Text>
                <Text className="text-md text-gray-500">as on 21 Nov 2023</Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <Text className="text-2xl font-bold text-yellow-500 mr-1">
                2000
              </Text>
              <Image
                source={require("../assets/images/payments/coin.png")}
                className="w-7 h-7"
                resizeMode="contain"
              />
            </View>
          </View>

          <View className="bg-white dark:bg-zinc-800 px-4 py-2 flex-row items-center justify-between border-t border-gray-100 dark:border-zinc-700">
            <View className="flex-1 mr-4">
              <View className="flex-row flex-wrap items-center justify-center">
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  By referring you get
                </Text>
                <Text className="font-bold text-black dark:text-white mx-1">
                  100
                </Text>
                <Image
                  source={require("../assets/images/payments/coin.png")}
                  className="w-4 h-4 mx-1"
                  resizeMode="contain"
                />
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  and referred person will get
                </Text>
                <Text className="font-bold text-black dark:text-white mx-1">
                  50
                </Text>
                <Image
                  source={require("../assets/images/payments/coin.png")}
                  className="w-4 h-4 ml-1"
                  resizeMode="contain"
                />
              </View>
            </View>
            <TouchableOpacity className="bg-yellow-400 px-4 py-2 rounded-lg">
              <Text className="text-sm font-bold text-black">Refer Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Level Criteria */}
        <Text className="text-sm font-bold mb-4 text-black dark:text-white uppercase">
          Level Criteria
        </Text>
        <View className="mb-6 border-2 border-gray-100 dark:border-zinc-800 p-2 rounded-xl">
          <View className="bg-gray-100 dark:bg-zinc-900 rounded-xl p-1 flex-row mb-6">
            <TouchableOpacity
              onPress={() => setActiveTab("Upgrade Level")}
              style={
                activeTab === "Upgrade Level"
                  ? {
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 1,
                      elevation: 2,
                    }
                  : {}
              }
              className={`flex-1 py-2 rounded-lg items-center ${activeTab === "Upgrade Level" ? "bg-white dark:bg-zinc-800" : ""}`}
            >
              <Text
                className={`text-xs font-bold ${activeTab === "Upgrade Level" ? "text-black dark:text-white" : "text-gray-400"}`}
              >
                Upgrade Level
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab("Maintain Level")}
              style={
                activeTab === "Maintain Level"
                  ? {
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 1,
                      elevation: 2,
                    }
                  : {}
              }
              className={`flex-1 py-2 rounded-lg items-center ${activeTab === "Maintain Level" ? "bg-white dark:bg-zinc-800" : ""}`}
            >
              <Text
                className={`text-xs font-bold ${activeTab === "Maintain Level" ? "text-black dark:text-white" : "text-gray-400"}`}
              >
                Maintain Level
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row">
            {/* Level 1 */}
            <View className="flex-1 items-center border-r border-gray-100 dark:border-zinc-800">
              <Text className="text-[10px] text-gray-400 mb-1">Level 1</Text>
              <Text className="text-sm font-bold mb-2 text-black dark:text-white">
                Partner
              </Text>
              <View className="bg-emerald-50 dark:bg-emerald-900/20 px-4 py-1 rounded-md mb-2">
                <Text className="text-emerald-500 font-bold text-xs">10</Text>
              </View>
              <Text className="text-[10px] text-gray-400">Achieved</Text>
            </View>

            {/* Level 2 */}
            <View className="flex-1 items-center bg-emerald-50/50 dark:bg-emerald-900/10 py-2">
              <Text className="text-[10px] text-gray-400 mb-1">Level 2</Text>
              <Text className="text-sm font-bold mb-2 text-black dark:text-white">
                Influencer
              </Text>
              <View className="flex-row items-center mb-2">
                <View className="bg-emerald-200 dark:bg-emerald-500/30 px-4 py-1 rounded-l-md border border-gray-100 dark:border-zinc-700">
                  <Text className="text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                    15
                  </Text>
                </View>
                <View className="bg-white dark:bg-zinc-800 px-4 py-1 rounded-r-md border border-gray-100 dark:border-zinc-700">
                  <Text className="text-black dark:text-white font-bold text-xs">
                    5
                  </Text>
                </View>
              </View>
              <Text className="text-[10px] text-gray-400">90 Days</Text>
            </View>

            {/* Level 3 */}
            <View className="flex-1 items-center border-l border-gray-100 dark:border-zinc-800">
              <Text className="text-[10px] text-gray-400 mb-1">Level 3</Text>
              <View className="items-center mb-1">
                <View className="w-10 h-10 items-center justify-center">
                  <Ionicons name="sparkles-outline" size={24} color="#10b981" />
                </View>
              </View>
              <Text className="text-[10px] text-gray-400 text-center px-2">
                You will become an
              </Text>
              <Text className="text-[10px] font-bold text-black dark:text-white">
                Ambassador
              </Text>
            </View>
          </View>

          <Text className="text-[10px] text-gray-500 mt-6 px-4 leading-4 italic">
            <Text className="font-bold">Note:</Text> If you fail to achieve this
            before mentioned date/days, your level will get reset automatically
          </Text>
        </View>
        {/* Level Benefits */}
        <View className="mb-8">
          <Text className="text-sm font-bold mb-4 text-black dark:text-white uppercase">
            Level Benefits
          </Text>

          {/* Table Header */}
          <View className="flex-row items-end mb-2">
            <View className="flex-[1.5] py-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-l-lg items-center justify-center">
              <Text className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                Benefits
              </Text>
            </View>
            <View className="flex-1 items-center pb-2">
              <View className="bg-yellow-400 p-2 rounded-full mb-1">
                <Ionicons name="star" size={12} color="white" />
              </View>
              <Text className="text-[10px] font-bold text-black dark:text-white">
                Partner
              </Text>
            </View>
            <View className="flex-1 items-center bg-gray-50 dark:bg-zinc-800 rounded-t-lg pb-2 pt-1 relative">
              <View className="absolute -top-4 bg-white dark:bg-zinc-700 px-2 py-0.5 rounded-md border border-gray-100 dark:border-zinc-600 shadow-sm">
                <Text className="text-[8px] font-bold text-gray-500">
                  Current
                </Text>
              </View>
              <View className="bg-gray-300 dark:bg-zinc-600 p-2 rounded-full mb-1">
                <Ionicons name="star" size={12} color="white" />
              </View>
              <Text className="text-[10px] font-bold text-black dark:text-white">
                Influencer
              </Text>
            </View>
            <View className="flex-1 items-center pb-2">
              <View className="bg-yellow-400 p-2 rounded-full mb-1">
                <Ionicons name="star" size={12} color="white" />
              </View>
              <Text className="text-[10px] font-bold text-black dark:text-white">
                Ambassador
              </Text>
            </View>
          </View>

          {/* Table Content */}
          {[
            { label: "Coins as cashback", p: "X", i: "2%", a: "4%" },
            {
              label: "Redeem up to on every order",
              p: "5%",
              i: "10%",
              a: "15%",
            },
            { label: "Free Delivery Charges", p: "X", i: "check", a: "check" },
          ].map((row, index) => (
            <View
              key={index}
              className="flex-row border-b border-gray-50 dark:border-zinc-800"
            >
              <View className="flex-[1.5] py-4 pr-2">
                <Text className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {row.label}
                </Text>
              </View>
              <View className="flex-1 items-center justify-center py-4">
                {row.p === "X" ? (
                  <View className="border border-red-400 rounded-full w-5 h-5 items-center justify-center">
                    <Text className="text-red-400 text-[10px] font-bold">
                      X
                    </Text>
                  </View>
                ) : (
                  <Text className="text-xs font-bold text-black dark:text-white">
                    {row.p}
                  </Text>
                )}
              </View>
              <View className="flex-1 items-center justify-center py-4 bg-gray-50/50 dark:bg-zinc-800/50">
                {row.i === "check" ? (
                  <View className="bg-emerald-100 dark:bg-emerald-900/30 rounded-full w-5 h-5 items-center justify-center border border-emerald-500">
                    <Ionicons name="checkmark" size={12} color="#10b981" />
                  </View>
                ) : (
                  <Text className="text-xs font-bold text-black dark:text-white">
                    {row.i}
                  </Text>
                )}
              </View>
              <View className="flex-1 items-center justify-center py-4">
                {row.a === "check" ? (
                  <View className="bg-emerald-100 dark:bg-emerald-900/30 rounded-full w-5 h-5 items-center justify-center border border-emerald-500">
                    <Ionicons name="checkmark" size={12} color="#10b981" />
                  </View>
                ) : (
                  <Text className="text-xs font-bold text-black dark:text-white">
                    {row.a}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
        {/* FAQs */}
        <View className="mb-8">
          <Text className="text-sm font-bold mb-4 text-black dark:text-white uppercase">
            FAQs
          </Text>
          {[
            "How to redeem my Coins?",
            "How do I level up to Ambassador?",
            "How many referrals can I do in a month?",
          ].map((faq, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center justify-between py-4 border-b border-gray-100 dark:border-zinc-800"
            >
              <Text className="text-xs font-medium text-black dark:text-white">
                {faq}
              </Text>
              <Ionicons
                name="add-circle-outline"
                size={20}
                color={isDark ? "#52525b" : "#d1d5db"}
              />
            </TouchableOpacity>
          ))}
        </View>
        {/* Footer */}
        <TouchableOpacity className="flex-row items-center justify-center bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-zinc-800 rounded-2xl p-4 mb-10 shadow-sm">
          <View className="bg-black/80 p-2 rounded-lg mr-3">
            <Ionicons name="help-buoy" size={20} color="white" />
          </View>
          <Text className="text-sm font-medium text-black dark:text-white">
            Still have any doubts?{" "}
            <Text className="text-emerald-500 font-bold">Mail Us</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
