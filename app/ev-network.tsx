import ActionButton from "@/components/ActionButton";
import BottomTabs from "@/components/BottomTabs";
import ProfileButton from "@/components/ProfileButton";
import SearchBar from "@/components/SearchBar";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const STATIONS = [
  {
    id: "1",
    name: "RB ROAD CHARGING STATION",
    address: "5th Street, LM Road\nXYZ City, US, LM509A",
    distance: "1.0 Km",
    rating: 4,
    latitude: 21.7645,
    longitude: 72.1519,
    price: "10.5 km / 25 min",
  },

  {
    id: "2",
    name: "SUBWAY CHARGING STATION",
    address: "10th Cross, laancer Road\nABC City, US, LM509A",
    distance: "2.5 Km",
    rating: 3,
    latitude: 21.7845,
    longitude: 72.1719,
    price: "2.5 km / 5 min",
  },

  {
    id: "3",
    name: "CHARLES CHARGING STATION",
    address: "101, VB Street, Simple Road\nFigma City, US, LM509A",
    distance: "1.0 Km",
    rating: 4,
    latitude: 21.8045,
    longitude: 72.1919,
    price: "10.5 km / 25 min",
  },
];

const FILTER_TABS = ["Neaby", "Recommended", "Recent", "Favorite"];

export default function EVNetworkScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const [viewMode, setViewMode] = useState<"location-pin" | "list">(
    "location-pin",
  );
  const [activeTab, setActiveTab] = useState("Neaby");
  const [accessType, setAccessType] = useState<"public" | "private">("public");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedStationId, setSelectedStationId] = useState<string | null>(
    null,
  );

  const renderStationCard = ({ item }: { item: (typeof STATIONS)[0] }) => (
    <View className="bg-white dark:bg-gray-900 mx-6 mb-4 rounded-xl border border-gray-500 p-2 flex-row shadow-sm">
      <Image
        source={require("../assets/images/ev-network/stations.jpg")} // Placeholder image
        style={{ width: 80, height: 100, borderRadius: 12 }}
        contentFit="cover"
      />

      <View className="flex-1 ml-3 justify-between">
        {/* TOP ROW */}
        <View className="flex-row justify-between items-start">
          <Text className="text-yellow-500 font-bold text-[12px] uppercase flex-1 pr-2">
            {item.name}
          </Text>
        </View>

        {/* ADDRESS */}
        <Text className="text-gray dark:text-gray-400 text-[10px] leading-4 mt-1">
          {item.address}
        </Text>

        {/* BOTTOM ROW */}
        <View className="flex-row justify-between items-center mt-2">
          {/* LEFT ICONS */}
          <View className="flex-row items-center gap-3">
            <Ionicons name="wifi" size={14} color="gray" />
            <MaterialCommunityIcons name="ev-station" size={16} color="gray" />
          </View>

          {/* RIGHT SIDE */}
          <View className="items-end">
            <Text className="text-yellow-500 text-[11px] font-semibold -mt-6 mb-1 mr-2">
              {item.distance}
            </Text>
            {/* STARS */}
            <View className="flex-row mb-1 mr-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons
                  key={i}
                  name="star"
                  size={12}
                  color={
                    i <= item.rating ? "#FBBF24" : isDark ? "gray" : "#D1D5DB"
                  }
                />
              ))}
            </View>

            {/* BUTTON */}
            <ActionButton
              title="Slots Available"
              onPress={() => console.log("Slots")}
              className="bg-emerald-500 rounded-full px-4 py-1.5"
              textClassName="text-white text-[10px] font-semibold"
            />
          </View>
        </View>
      </View>
    </View>
  );

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

      {/* Main Content Area */}

      <View className="flex-1">
        {viewMode === "location-pin" ? (
          <View className="flex-1">
            <MapView
              style={{ width: "100%", height: "100%" }}
              initialRegion={{
                latitude: 21.7645,
                longitude: 72.1519,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              onPress={() => setSelectedStationId(null)}
            >
              {/* Car Indicator */}
              <Marker
                coordinate={{
                  latitude: 21.75,
                  longitude: 72.14,
                }}
              >
                <View className="items-center">
                  <View className="w-16 h-10 shadow-lg">
                    <Image
                      source={require("../assets/images/brand-varients/blue-car.png")}
                      style={{ width: "100%", height: "100%" }}
                      contentFit="contain"
                    />
                  </View>
                </View>
              </Marker>

              {STATIONS.map((station) => {
                return (
                  <Marker
                    key={station.id}
                    coordinate={{
                      latitude: station.latitude,
                      longitude: station.longitude,
                    }}
                    title={station.name}
                    description={station.price}
                  >
                    <View className="items-center">
                      <View className="w-8 h-8 rounded-full bg-black border-2 border-white items-center justify-center shadow-lg">
                        <Ionicons name="flash" size={18} color="#FBBF24" />
                      </View>
                    </View>
                  </Marker>
                );
              })}
            </MapView>
          </View>
        ) : (
          <FlatList
            data={STATIONS}
            renderItem={renderStationCard}
            keyExtractor={(item) => item.id}
            ListFooterComponent={
              <TouchableOpacity className="py-6 items-center">
                <Text className="text-black dark:text-white font-bold text-sm tracking-widest">
                  LOAD MORE &gt;&gt;
                </Text>
              </TouchableOpacity>
            }
            contentContainerStyle={{ paddingTop: 60, paddingBottom: 170 }}
          />
        )}

        {/* Floating Controls Overlay */}

        <View
          className={`absolute left-0 right-0 px-6 flex-row justify-between items-center ${viewMode === "location-pin" ? "top-4" : "top-0 bg-white dark:bg-black pt-4"}`}
        >
          <View className="flex-row pl-4 gap-2">
            <TouchableOpacity
              onPress={() => setAccessType("public")}
              className={`px-6 py-1.5 rounded-full ${accessType === "public" ? "bg-yellow-400" : isDark ? "bg-gray-600" : "bg-gray-200"}`}
            >
              <Text
                className={`text-[10px] font-bold uppercase ${accessType === "public" ? "text-black" : isDark ? "text-white" : "text-black"}`}
              >
                Public
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setAccessType("private")}
              className={`px-6 py-1.5 rounded-full ${accessType === "private" ? "bg-yellow-400" : isDark ? "bg-gray-600" : "bg-gray-200"}`}
            >
              <Text
                className={`text-[10px] font-bold uppercase ${accessType === "private" ? "text-black" : isDark ? "text-white" : "text-black"}`}
              >
                Private
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row space-x-2 gap-2">
            <TouchableOpacity className="w-9 h-9 bg-white dark:bg-gray-600 rounded-lg items-center justify-center shadow-md border-2 border-gray-200">
              <MaterialCommunityIcons
                name="crosshairs-gps"
                size={20}
                color={isDark ? "white" : "black"}
              />
            </TouchableOpacity>

            <TouchableOpacity className="w-9 h-9 bg-white dark:bg-gray-600 rounded-lg items-center justify-center shadow-md border-2 border-gray-200">
              <MaterialCommunityIcons
                name="tune"
                size={20}
                color={isDark ? "white" : "black"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setViewMode(
                  viewMode === "location-pin" ? "list" : "location-pin",
                )
              }
              className="w-9 h-9 bg-white dark:bg-gray-600 rounded-lg items-center justify-center shadow-md border-2 border-gray-200 mr-4"
            >
              <MaterialIcons
                name={viewMode === "location-pin" ? "list" : "location-pin"}
                size={20}
                color={isDark ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bottom Navigation */}

      <BottomTabs tabs={[{ name: "home-outline" }]} />
    </SafeAreaView>
  );
}
