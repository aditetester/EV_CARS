import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import React from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import ExploreItem from "../components/dashboard/ExploreItem";

const { width } = Dimensions.get("window");

export default function DashboardScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <StatusBar style="auto" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Section - New Launch */}
        <View className="relative h-[150px] w-full">
          {/* Background */}
          <Image
            source={require("../assets/images/dashboard/hero-background.png")}
            style={{ width: "100%", height: "100%" }}
            contentFit="contain"
          />

          {/* Floating Profile Button */}
          <TouchableOpacity
            onPress={() => router.push("/profile")}
            className="absolute top-1/2 right-5 -translate-y-1/2 w-12 h-12 bg-white dark:bg-black rounded-full items-center justify-center shadow-md"
          >
            <Ionicons
              name="person-circle-outline"
              size={32}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </TouchableOpacity>

          {/* Center Content */}
          <View className="absolute top-[55px] left-0 right-0 items-center">
            <Text className="text-black font-bold text-sm uppercase ">
              New Launch
            </Text>

            <Text className="text-md font-semibold text-gray-500">KIA EV6</Text>
          </View>

          {/* Center Car */}
          <View className="absolute -bottom-[60px] left-0 right-0 items-center">
            <Image
              source={require("../assets/images/dashboard/car.png")}
              // className="w-[40%] h-[180px]"
              style={{ width: width * 0.4, height: 180 }}
              contentFit="contain"
            />
          </View>
        </View>

        {/* Explore Section */}
        <View className="px-6 mt-4">
          <Text className="text-lg font-bold tracking-widest uppercase mb-4 text-black dark:text-white">
            Explore
          </Text>
          <View className="flex-row justify-between">
            <ExploreItem
              title="Cars"
              icon={require("../assets/images/dashboard/cars-icon.png")}
              color="#FBD96D"
              onPress={() => router.push("/cartype")}
            />
            <ExploreItem
              title="Charging Stations"
              icon={require("../assets/images/dashboard/charging-icon.png")}
              color="#00C49A"
              onPress={() => console.log("Charging Stations")}
            />
            <ExploreItem
              title="Accessories"
              icon={require("../assets/images/dashboard/accessories-icon.png")}
              color="#00C49A"
              onPress={() => console.log("Accessories")}
            />
            <ExploreItem
              title="Compare Cars"
              icon={require("../assets/images/dashboard/compare-icon.png")}
              color="#00C49A"
              onPress={() => console.log("Compare Cars")}
            />
          </View>
        </View>

        {/* Map Section */}
        <View className="px-6 mt-4">
          <View className="h-44 rounded-3xl overflow-hidden relative  border-2 border-gray-200 dark:border-white">
            <MapView
              style={{ width: "100%", height: "100%" }}
              initialRegion={{
                latitude: 21.7645,
                longitude: 72.1519,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              {[1, 2].map((i) => (
                <Marker
                  key={i}
                  coordinate={{
                    latitude: 21.7645 + i * 0.02,
                    longitude: 72.1519 + i * 0.02,
                  }}
                  pinColor="#00C49A"
                  title={`Charging Station ${i}`}
                  description="Bhavnagar, Gujarat"
                />
              ))}
            </MapView>

            <View className="absolute top-0 left-0 right-0 bg-black/40 p-2 justify-center items-center">
              <Text className="text-[#FFDB63] font-bold text-md">
                There are 10 Charging Stations nearby
              </Text>
              <Text className="text-white text-sm">
                Nearest one is just 1 km away
              </Text>
            </View>
          </View>
        </View>

        {/* Explore EV Club Section */}
        <View className="px-6 mt-4">
          <Text className="text-lg font-bold tracking-widest uppercase mb-4 text-black dark:text-white">
            Explore EV Club
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-4">
              {/* Column 1 */}
              <View className="w-[150px] h-[180px] rounded-2xl overflow-hidden border border-gray-200 dark:border-white">
                <Image
                  source={require("../assets/images/dashboard/EV-CLUB-1.png")}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                />
                <View className="absolute top-2 left-2 bg-white px-2 py-0.5 rounded-md">
                  <Text className="text-[10px] font-bold text-[#FBD96D]">
                    NEW
                  </Text>
                </View>
              </View>

              {/* Column 2 */}
              <View className="w-[150px] flex-col gap-4">
                <View className="h-[82px] rounded-2xl overflow-hidden bg-black border border-gray-200 dark:border-white">
                  <Image
                    source={require("../assets/images/dashboard/EV-CLUB-2.png")}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="cover"
                  />
                </View>
                <View className="h-[82px] rounded-2xl overflow-hidden bg-black border border-gray-200 dark:border-white">
                  <Image
                    source={require("../assets/images/dashboard/EV-CLUB-3.png")}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="cover"
                  />
                </View>
              </View>

              {/* Column 3 (Repeated) */}
              <View className="w-[150px] h-[180px] rounded-2xl overflow-hidden border border-gray-200 dark:border-white">
                <Image
                  source={require("../assets/images/dashboard/EV-CLUB-1.png")}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                />
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Offers Section */}
        <View className="px-6 mt-4 items-center">
          <View className="flex-row items-center w-full mb-4">
            <View className="h-[1px] bg-gray-300 flex-1" />
            <Text className="mx-4 text-lg font-bold text-black dark:text-white uppercase">
              March Offers
            </Text>
            <View className="h-[1px] bg-gray-300 flex-1" />
          </View>

          <View className="w-full h-32 items-center justify-center mb-4 bg-[#fffefe] border border-gray-400 shadow-lg">
            <View className="items-center bg-[#686868] px-4 py-2  w-[70%] h-32">
              <Text className="text-white/60 text-[10px] tracking-[4px] uppercase mb-1">
                Timmerman Industries
              </Text>
              <Text className="text-white text-3xl font-black uppercase text-center px-4 leading-8">
                Drive Your{"\n"}Dreams
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
