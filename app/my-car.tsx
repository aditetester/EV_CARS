import ActionButton from "@/components/ActionButton";
import { validateRequired, validateVIN } from "@/lib/validation";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
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

export default function MyCarScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const [selectedPlug, setSelectedPlug] = useState<string | null>(null);
  const [vehicleData, setVehicleData] = useState({
    maker: "",
    model: "",
    vin: "",
    registration: "",
    battery: "",
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
        setVehicleData({
          maker: parsedCarInfo.maker || "",
          model: parsedCarInfo.model || "",
          vin: parsedCarInfo.vin || "",
          registration: parsedCarInfo.registration || "",
          battery: parsedCarInfo.battery || "",
        });
        setSelectedPlug(parsedCarInfo.plugType || null);
      }
    } catch (e) {
      console.error("Failed to load car info", e);
    }
  };

  const handleSaveVehicle = async () => {
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await AsyncStorage.setItem(
        "myCarInfo",
        JSON.stringify({ ...vehicleData, plugType: selectedPlug }),
      );
      Alert.alert("Success", "Your car information has been saved.");
    } catch (e) {
      console.log("Failed to save car info", e);
      Alert.alert("Error", "Failed to save car information.");
    }
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
          My Car Profile
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
          {/* Submit Button */}
          <ActionButton
            title="SAVE CAR INFORMATION"
            onPress={handleSaveVehicle}
            className="py-4 rounded-2xl mt-6"
            textClassName="text-sm font-black"
          />
        </EVVehicleForm>
      </ScrollView>
    </SafeAreaView>
  );
}
