import BottomTabs from "@/components/BottomTabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import {
    Dimensions,
    Image,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const { height } = Dimensions.get("window");

const SHOWROOMS = [
  {
    id: 1,
    name: "MARK EV MOTORS",
    coordinate: { latitude: 37.78825, longitude: -122.4324 },
    isSelected: true,
  },
  {
    id: 2,
    name: "Showroom 2",
    coordinate: { latitude: 37.79, longitude: -122.44 },
    isSelected: false,
  },
  {
    id: 3,
    name: "Showroom 3",
    coordinate: { latitude: 37.785, longitude: -122.425 },
    isSelected: false,
  },
  {
    id: 4,
    name: "Showroom 4",
    coordinate: { latitude: 37.78, longitude: -122.435 },
    isSelected: false,
  },
  {
    id: 5,
    name: "Showroom 5",
    coordinate: { latitude: 37.795, longitude: -122.42 },
    isSelected: false,
  },
];

export default function SelectDistributorScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <StatusBar barStyle="dark-content" />

      {/* Header Section */}
      <View className="px-6 pt-10 items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-6 top-10 w-10 h-10 items-center justify-center z-10"
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color={isDark ? "white" : "black"}
          />
        </TouchableOpacity>

        <Image
          source={require("../assets/images/brand-varients/red-car.png")}
          className="w-full h-56"
          resizeMode="contain"
        />
      </View>

      <Text className="text-md font-bold text-black text-center -mt-10">
        KIA EV6 GT line AWD
      </Text>
      <Text className="text-md font-bold uppercase tracking-tight mt-1 mb-2 text-black ml-6">
        PREFERRED SHOWROOM
      </Text>

      {/* Map Section */}
      <View className="relative" style={{ height: height * 0.45 }}>
        <MapView
          style={{ width: "100%", height: "100%" }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          customMapStyle={mapStyle}
        >
          {SHOWROOMS.map((showroom) => (
            <Marker key={showroom.id} coordinate={showroom.coordinate}>
              <View className="items-center">
                {showroom.isSelected && (
                  <View className="bg-white px-3 py-1.5 rounded-2xl shadow-md border border-gray-100 mb-1 items-center">
                    <Text className="text-[10px] font-bold text-black uppercase">
                      {showroom.name}
                    </Text>
                    <View className="flex-row items-center mt-0.5">
                      {[1, 2, 3, 4].map((i) => (
                        <Ionicons
                          key={i}
                          name="star"
                          size={10}
                          color="#FBBF24"
                        />
                      ))}
                      <Ionicons name="star" size={10} color="#E5E7EB" />
                      <Text className="text-[10px] font-bold text-black ml-1">
                        1.2KM
                      </Text>
                    </View>
                  </View>
                )}
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center ${showroom.isSelected ? "bg-yellow-400" : "bg-[#00BFA5]"} border-2 border-white`}
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
                  <View className="absolute -bottom-1.5 w-4 h-1 bg-black/30 rounded-full" />
                </View>
              </View>
            </Marker>
          ))}
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
          <View className="bg-white/95 rounded-[24px] p-5 shadow-2xl border border-gray-100">
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="text-lg font-bold text-black uppercase">
                  MARK EV MOTORS
                </Text>
                <Text className="text-[11px] font-medium text-gray-500 mt-1 leading-4">
                  5th Cross, Colusa Ave{"\n"}Texas, US, TX1 45A
                </Text>

                <View className="flex-row items-center mt-4">
                  <View className="w-8 h-8 rounded-full bg-yellow-400 items-center justify-center mr-3 shadow-sm">
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={18}
                      color="white"
                    />
                  </View>
                  <View>
                    <Text className="text-[10px] font-bold text-black">
                      Get Directions
                    </Text>
                  </View>
                </View>
              </View>

              <View className="items-end">
                <View className="flex-row mb-1">
                  {[1, 2, 3, 4].map((i) => (
                    <Ionicons key={i} name="star" size={16} color="#FBBF24" />
                  ))}
                  <Ionicons name="star" size={16} color="#E5E7EB" />
                </View>

                <TouchableOpacity className="bg-[#00BFA5] px-6 py-3 rounded-2xl mt-4 shadow-sm active:opacity-80">
                  <Text className="text-white text-[10px] font-bold uppercase tracking-widest">
                    SELECT SLOTS
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom Navigation */}
      <BottomTabs />
    </View>
  );
}

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
];
