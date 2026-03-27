/* eslint-disable react-hooks/exhaustive-deps */
import ActionButton from "@/components/ActionButton";
import { Colors } from "@/constants/theme";
import { validateRequired, validateVIN } from "@/lib/validation";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EVVehicleForm from "@/components/EVVehicleForm";



export default function AddEVVehicleScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const params = useLocalSearchParams();
  const [accepted, setAccepted] = useState(false);
  const [selectedPlug, setSelectedPlug] = useState<string | null>(
    (params.plugType as string) || null,
  );
  const [vehicleData, setVehicleData] = useState({
    maker: (params.maker as string) || "",
    model: (params.model as string) || "",
    vin: (params.vin as string) || "",
    registration: (params.registration as string) || "",
    battery: (params.battery as string) || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadCarInfo();
  }, []);

  const loadCarInfo = async () => {
    try {
      const storedCarInfo = await AsyncStorage.getItem("myCarInfo");
      if (storedCarInfo) {
        const parsedCarInfo = JSON.parse(storedCarInfo);

        // Only autofill if local storage has values, and local params didn't explicitly override it.
        // If params are passed via URL (like old implementation), they take precedence.
        setVehicleData({
          maker: (params.maker as string) || parsedCarInfo.maker || "",
          model: (params.model as string) || parsedCarInfo.model || "",
          vin: (params.vin as string) || parsedCarInfo.vin || "",
          registration:
            (params.registration as string) || parsedCarInfo.registration || "",
          battery: (params.battery as string) || parsedCarInfo.battery || "",
        });

        setSelectedPlug(
          (params.plugType as string) || parsedCarInfo.plugType || null,
        );
      }
    } catch (e) {
      console.error("Failed to load car info from storage", e);
    }
  };

  const handleAddVehicle = () => {
    const newErrors: Record<string, string> = {};

    if (!validateRequired(vehicleData.maker))
      newErrors.maker = "Maker is required";
    if (!validateRequired(vehicleData.model))
      newErrors.model = "Model is required";
    if (!validateVIN(vehicleData.vin))
      newErrors.vin = "VIN must be 17 characters";
    if (!validateRequired(vehicleData.registration))
      newErrors.registration = "Registration is required";
    if (!validateRequired(vehicleData.battery))
      newErrors.battery = "Battery capacity is required";

    if (!selectedPlug) {
      Alert.alert("Plug Type", "Please select a plug type");
      return;
    }

    if (!accepted) {
      Alert.alert("Required", "Please accept the terms and requirements");
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    console.log("Add & Search Stations");
    router.push("/ev-network");
  };

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
        <EVVehicleForm
          vehicleData={vehicleData}
          setVehicleData={setVehicleData}
          selectedPlug={selectedPlug}
          setSelectedPlug={setSelectedPlug}
          errors={errors}
          setErrors={setErrors}
        >
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
            onPress={handleAddVehicle}
            className="py-4 rounded-2xl"
            textClassName="text-sm font-black"
          />
        </EVVehicleForm>
      </ScrollView>
    </SafeAreaView>
  );
}
