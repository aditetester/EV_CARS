import ActionButton from "@/components/ActionButton";
import BottomTabs from "@/components/BottomTabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const { height, width } = Dimensions.get("window");

const SHOWROOMS = [
  {
    id: 1,
    name: "MARK EV MOTORS",
    address: "5th Cross, Colusa Ave\nTexas, US, TX1 45A",
    coordinate: { latitude: 37.78825, longitude: -122.4324 },
    rating: 4,
    distance: "1.2KM",
  },
  {
    id: 2,
    name: "Showroom 2",
    address: "123 Main St\nSan Francisco, CA",
    coordinate: { latitude: 37.79, longitude: -122.44 },
    rating: 3,
    distance: "2.5KM",
  },
  {
    id: 3,
    name: "Showroom 3",
    address: "456 Market St\nSan Francisco, CA",
    coordinate: { latitude: 37.785, longitude: -122.425 },
    rating: 5,
    distance: "0.8KM",
  },
  {
    id: 4,
    name: "Showroom 4",
    address: "789 Mission St\nSan Francisco, CA",
    coordinate: { latitude: 37.78, longitude: -122.435 },
    rating: 4,
    distance: "3.1KM",
  },
  {
    id: 5,
    name: "Showroom 5",
    address: "101 Post St\nSan Francisco, CA",
    coordinate: { latitude: 37.795, longitude: -122.42 },
    rating: 2,
    distance: "1.5KM",
  },
];

export default function SelectDistributorScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const [selectedShowroomId, setSelectedShowroomId] = useState(1);
  const markerRefs = useRef<{ [key: number]: any }>({});

  // Trigger callout when the selection changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (markerRefs.current[selectedShowroomId]) {
        markerRefs.current[selectedShowroomId].showCallout();
      }
    }, 100); // Small delay to ensure marker is rendered
    return () => clearTimeout(timer);
  }, [selectedShowroomId]);

  const selectedShowroom =
    SHOWROOMS.find((s) => s.id === selectedShowroomId) || SHOWROOMS[0];

  const showStar = (rating: number) => {
    const full = "★".repeat(rating);
    const empty = "☆".repeat(5 - rating);
    return full + empty;
  };

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <StatusBar style="auto" />

      {/* Header Section */}

      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute left-6 top-10 z-50 w-10 h-10 items-center justify-center"
      >
        <Ionicons
          name="arrow-back"
          size={28}
          color={isDark ? "white" : "black"}
        />
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 164 }}
      >
        {/* Main Car Image Section */}
        <View className="items-center px-4 pt-20">
          <View className="w-full h-56 items-center justify-center dark:bg-gray-800 dark:rounded-3xl dark:border dark:border-gray-500">
            <Image
              source={require("../assets/images/brand-varients/red-car.png")}
              // className="mr-2"
              resizeMode="cover"
              style={{ width: width * 1.5, height: 200 }}
            />
          </View>
        </View>

        <Text className="text-md font-bold text-black dark:text-white text-center mt-2">
          KIA EV6 GT line AWD
        </Text>
        <Text className="text-md uppercase tracking-tight mt-2 mb-2 text-black dark:text-gray-400 ml-6">
          PREFERRED SHOWROOM
        </Text>

        {/* Map Section */}
        <View className="relative" style={{ height: height * 0.4 }}>
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            {SHOWROOMS.map((showroom) => {
              const isSelected = selectedShowroomId === showroom.id;
              return (
                <Marker
                  key={showroom.id}
                  coordinate={showroom.coordinate}
                  onPress={() => {
                    setSelectedShowroomId(showroom.id);
                  }}
                  title={showroom.name}
                  description={`${showStar(showroom.rating)}`}
                >
                  <View className="items-center" pointerEvents="none">
                    <View
                      className={`w-10 h-10 rounded-full items-center justify-center ${isSelected ? "bg-yellow-400" : "bg-[#00BFA5]"} border-2 border-white`}
                      style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4.65,
                        elevation: 8,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="map-marker"
                        size={22}
                        color="white"
                      />
                    </View>
                  </View>
                </Marker>
              );
            })}
          </MapView>

          {/* Recenter Button */}
          <TouchableOpacity className="absolute right-4 top-4 w-10 h-10 bg-white/90 rounded-full items-center justify-center shadow-lg border border-gray-100">
            <MaterialCommunityIcons
              name="crosshairs-gps"
              size={24}
              color="black"
            />
          </TouchableOpacity>

          {/* Selected Showroom Card - Positioned inside map area bottom */}
          <View className="absolute -bottom-20 left-4 right-4">
            <View className="bg-white rounded-3xl px-4 py-4 shadow-2xl border border-gray-100 dark:bg-gray-800 dark:border-gray-500">
              {/* ROW 1: Name and Rating */}
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-[16px] font-extrabold text-black uppercase tracking-wide flex-1 mr-2 dark:text-white">
                  {selectedShowroom.name}
                </Text>
                <View className="flex-row items-center space-x-1 mr-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Ionicons
                      key={i}
                      name="star"
                      size={14}
                      color={
                        i <= selectedShowroom.rating ? "#FBBF24" : "#E5E7EB"
                      }
                    />
                  ))}
                </View>
              </View>

              {/* ROW 2: Address, Directions and Action Button */}
              <View className="flex-row items-end justify-between -mt-2">
                {/* Address (2 lines) */}
                <View className="flex-1">
                  <Text
                    numberOfLines={2}
                    className="text-[11px] text-gray-500 leading-4"
                  >
                    {selectedShowroom.address}
                  </Text>
                </View>

                {/* Get Directions */}
                <TouchableOpacity
                  className="items-center mr-8"
                  onPress={() => {
                    console.log("Get Directions");
                  }}
                >
                  <View className="w-7 h-7 rounded-full bg-yellow-400 items-center justify-center shadow-sm">
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={14}
                      color="white"
                    />
                  </View>
                  <Text className="text-[9px] font-semibold text-black dark:text-white">
                    Get Directions
                  </Text>
                </TouchableOpacity>

                {/* Select Slots Button */}
                <ActionButton
                  title="SELECT SLOTS"
                  onPress={() =>
                    router.push({
                      pathname: "/dealer-details",
                      params: {
                        name: selectedShowroom.name,
                        address: selectedShowroom.address,
                        rating: selectedShowroom.rating,
                      },
                    })
                  }
                  className="px-4 py-2.5 rounded-2xl"
                  textClassName="text-[10px] tracking-widest"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomTabs />
    </View>
  );
}
