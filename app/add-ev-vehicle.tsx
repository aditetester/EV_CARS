import ActionButton from "@/components/ActionButton";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PLUG_TYPES = [
  {
    id: "css-combo-1",
    label: "CSS COMBO TYPE 1",
    icon: require("../assets/images/add-ev-vehicle/css-combo-type-1.png"),
  },
  {
    id: "css-combo-2",
    label: "CSS COMBO TYPE 2",
    icon: require("../assets/images/add-ev-vehicle/css-combo-type-2.png"),
  },
  {
    id: "j1772-type-1",
    label: "J1772 TYPE 1",
    icon: require("../assets/images/add-ev-vehicle/j1772-type-1.png"),
  },
  {
    id: "gb-t",
    label: "GB/T",
    icon: require("../assets/images/add-ev-vehicle/GB:T.png"),
  },
  {
    id: "chademo",
    label: "CHAdeMO",
    icon: require("../assets/images/add-ev-vehicle/chademo.png"),
  },
  {
    id: "mennekes",
    label: "MENNEKES TYPE 2",
    icon: require("../assets/images/add-ev-vehicle/mennekes-type-2.png"),
  },
  {
    id: "supercharger",
    label: "SUPERCHARGER",
    icon: require("../assets/images/add-ev-vehicle/supercharger.png"),
  },
];

export default function AddEVVehicleScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [selectedPlug, setSelectedPlug] = useState<string | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <StatusBar style="auto" />
      <View className="flex-row items-center px-6 pt-4 mb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center"
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color={isDark ? "white" : "black"}
          />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-black text-black dark:text-white uppercase mr-10">
          Add EV Vehicle
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <View className="px-6 pt-2">
          {/* Form Fields */}
          <View className="space-y-2 mb-4" style={{ gap: 8 }}>
            {[
              "Car Maker",
              "Car Model",
              "VIN",
              "Vehicle Registration Number",
              "Battery Capacity",
            ].map((placeholder) => (
              <View
                key={placeholder}
                className="bg-gray-100 dark:bg-gray-800 rounded-3xl px-6 py-1"
              >
                <TextInput
                  placeholder={placeholder}
                  className="text-md font-bold text-black dark:text-white"
                  placeholderTextColor={
                    isDark ? Colors.dark.muted : Colors.light.muted
                  }
                />
              </View>
            ))}
          </View>

          {/* Plug Type Section */}
          <Text className="text-lg font-black text-black dark:text-white uppercase mb-4 mt-2">
            Plug In Type
          </Text>
          <View className="flex-row flex-wrap justify-center">
            {PLUG_TYPES.map((plug) => (
              <TouchableOpacity
                key={plug.id}
                onPress={() => setSelectedPlug(plug.id)}
                className="items-center w-1/4 mb-2"
              >
                <View
                  className={`w-14 h-14 rounded-full items-center justify-center ${
                    selectedPlug === plug.id
                      ? "bg-emerald-100 border-2 border-emerald-500"
                      : "bg-transparent"
                  }`}
                >
                  <Image
                    source={plug.icon}
                    style={{
                      width: 45,
                      height: 45,
                      tintColor: isDark ? "white" : "black",
                    }}
                    contentFit="contain"
                  />
                </View>
                {/* <Text
                  className="text-[8px] font-black text-center text-black dark:text-white uppercase px-1"
                  numberOfLines={2}
                >
                  {plug.label}
                </Text> */}
              </TouchableOpacity>
            ))}
          </View>

          {/* Your Vehicle Section */}
          <Text className="text-lg font-black text-black dark:text-white uppercase mt-2">
            Your Vehicle
          </Text>
          <View className="items-center -mt-14">
            <Image
              source={require("../assets/images/brand-varients/blue-car.png")}
              style={{ width: 600, height: 250 }}
              contentFit="contain"
            />
          </View>

          {/* Requirements Checkbox */}
          <View className="flex-row items-center mb-8 px-2 -mt-10 justify-center">
            <TouchableOpacity
              onPress={() => setAccepted(!accepted)}
              style={{
                borderColor: accepted
                  ? isDark
                    ? Colors.dark.emerald
                    : Colors.light.emerald
                  : isDark
                    ? "#4B5563"
                    : "#D1D5DB",
                backgroundColor: accepted
                  ? isDark
                    ? Colors.dark.emerald
                    : Colors.light.emerald
                  : "transparent",
              }}
              className="w-5 h-5 rounded border mr-3"
            >
              {accepted && (
                <Ionicons name="checkmark" size={14} color="white" />
              )}
            </TouchableOpacity>
            <Text className="text-gray-500 dark:text-gray-400 text-[10px]">
              Accept all the requirements that we have provided.
            </Text>
          </View>

          {/* Submit Button */}
          <ActionButton
            title="ADD & SEARCH STATIONS"
            onPress={() => {
              console.log("Add & Search Stations");
              router.push("/ev-network");
            }}
            className="py-4 rounded-2xl"
            textClassName="text-sm font-black"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
