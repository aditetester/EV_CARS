import ActionButton from "@/components/ActionButton";
import ProfileButton from "@/components/ProfileButton";
import SearchBar from "@/components/SearchBar";
import {
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import {
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FILTER_TABS = ["Neaby", "Recommended", "Recent", "Favorite"];

export default function EVStationScreen() {
  const router = useRouter();
  const route = useRoute();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const { station: stationJson } = route.params as any;
  const station = JSON.parse(stationJson);

  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("Neaby");

  // Time Selection States
  const [arriveTime, setArriveTime] = useState(
    new Date(new Date().setHours(9, 45, 0, 0)),
  );
  const [departTime, setDepartTime] = useState(
    new Date(new Date().setHours(11, 30, 0, 0)),
  );
  const [showArrivePicker, setShowArrivePicker] = useState(false);
  const [showDepartPicker, setShowDepartPicker] = useState(false);

  const formatTime = (date: Date) => {
    return `Today ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  const calculateDuration = () => {
    const diff = departTime.getTime() - arriveTime.getTime();
    if (diff <= 0) return "0h 0m";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const onArriveChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowArrivePicker(Platform.OS === "ios");
    if (selectedDate) {
      setArriveTime(selectedDate);
    }
  };

  const onDepartChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDepartPicker(Platform.OS === "ios");
    if (selectedDate) {
      setDepartTime(selectedDate);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      {/* Top Header Section */}
      <View className="px-6 pt-4">
        <View className="flex-row items-center gap-2 mb-4">
          <SearchBar />
          <ProfileButton />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {FILTER_TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl mr-3 ${
                activeTab === tab ? "bg-yellow-400" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-sm font-bold ${activeTab === tab ? "text-black" : "text-gray-500"}`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Station Image */}
        <Image
          source={require("../assets/images/ev-network/stations.jpg")}
          style={{ width: "100%", height: 220, borderRadius: 16 }}
          contentFit="cover"
        />

        {/* Station Details */}
        <View className="mt-4">
          <Text className="text-gray-400 dark:text-gray-500 text-[10px] uppercase font-bold">
            ID: {station.id}
          </Text>

          {/* Row: Name and Heart */}
          <View className="flex-row justify-between items-start mt-1">
            <Text className="text-yellow-500 font-bold text-lg flex-1 mr-2 leading-6">
              {station.name}
            </Text>
            <View className="flex-row items-center">
              <Text className="text-yellow-500 font-bold text-sm mr-2">
                {station.distance}
              </Text>
              <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={24}
                  color={isFavorite ? "#EF4444" : "#999"}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Row: Address and Rating */}
          <View className="flex-row justify-between items-start mt-1">
            <Text className="text-gray-500 dark:text-gray-400 text-xs flex-1 pr-4 leading-5">
              {station.address}
            </Text>
            <View className="items-end">
              <View className="flex-row mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Ionicons
                    key={i}
                    name="star"
                    size={14}
                    color={
                      i <= station.rating
                        ? "#FBBF24"
                        : isDark
                          ? "gray"
                          : "#E5E7EB"
                    }
                  />
                ))}
              </View>
              {/* Status Icons */}
              <View className="flex-row gap-3">
                <View className="bg-gray-100 dark:bg-gray-800 p-1 rounded">
                  <MaterialIcons name="security" size={16} color="gray" />
                </View>
                <View className="bg-gray-100 dark:bg-gray-800 p-1 rounded">
                  <Ionicons name="wifi" size={16} color="gray" />
                </View>
                <View className="bg-gray-100 dark:bg-gray-800 p-1 rounded">
                  <MaterialCommunityIcons
                    name="ev-station"
                    size={16}
                    color="gray"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Pricing Card */}
        <View className="flex-row justify-between bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 mt-6">
          <View className="items-center flex-1 border-r border-gray-200 dark:border-gray-800">
            <Text className="font-bold text-gray-700 dark:text-gray-200 text-base">
              Type 3
            </Text>
            <Text className="text-gray-400 text-xs mt-1">Connection</Text>
          </View>

          <View className="items-center flex-1 border-r border-gray-200 dark:border-gray-800">
            <Text className="font-bold text-gray-700 dark:text-gray-200 text-base">
              $0.5
            </Text>
            <Text className="text-gray-400 text-xs mt-1">Per kwh</Text>
          </View>

          <View className="items-center flex-1">
            <Text className="font-bold text-gray-700 dark:text-gray-200 text-base">
              $1.00
            </Text>
            <Text className="text-gray-400 text-xs mt-1">Parking Fee</Text>
          </View>
        </View>

        {/* Time Selection */}
        <View className="flex-row justify-between bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-gray-800 p-4 mt-4 shadow-sm">
          <TouchableOpacity
            onPress={() => setShowArrivePicker(true)}
            className="flex-1 items-center"
          >
            <Text className="text-gray-400 text-[10px] uppercase font-bold text-center">
              Arrive
            </Text>
            <View className="flex-row items-center mt-1 justify-center gap-4">
              <Text className="font-bold text-gray-800 dark:text-gray-200">
                {formatTime(arriveTime)}
              </Text>
              <Ionicons name="chevron-down" size={12} color="gray" />
            </View>
          </TouchableOpacity>

          <View className="flex-1 items-center border-x border-gray-100 dark:border-gray-800">
            <Text className="text-gray-400 text-[10px] uppercase font-bold text-center">
              Duration
            </Text>
            <Text className="font-bold text-blue-500 mt-1">
              {calculateDuration()}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setShowDepartPicker(true)}
            className="flex-1 items-center"
          >
            <Text className="text-gray-400 text-[10px] uppercase font-bold text-center">
              Depart
            </Text>
            <View className="flex-row items-center mt-1 justify-center gap-4">
              <Text className="font-bold text-gray-800 dark:text-gray-200">
                {formatTime(departTime)}
              </Text>
              <Ionicons name="chevron-down" size={12} color="gray" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Pickers */}
        {showArrivePicker && (
          <DateTimePicker
            value={arriveTime}
            mode="time"
            is24Hour={false}
            onChange={onArriveChange}
          />
        )}
        {showDepartPicker && (
          <DateTimePicker
            value={departTime}
            mode="time"
            is24Hour={false}
            onChange={onDepartChange}
          />
        )}

        {/* Book Button */}
        <View className="my-8">
          <ActionButton
            title="BOOK CHARGER"
            onPress={() =>
              router.push({
                pathname: "/payment",
                params: {
                  station: JSON.stringify(station),
                  duration: calculateDuration(),
                  total: "8.50",
                },
              })
            }
            className="bg-emerald-500 rounded-full py-4 shadow-lg shadow-emerald-200"
            textClassName="text-white font-bold text-center tracking-widest"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
