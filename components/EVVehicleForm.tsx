import React, { ReactNode } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "nativewind";

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

interface EVVehicleFormProps {
  vehicleData: {
    maker: string;
    model: string;
    vin: string;
    registration: string;
    battery: string;
  };
  setVehicleData: React.Dispatch<React.SetStateAction<any>>;
  selectedPlug: string | null;
  setSelectedPlug: React.Dispatch<React.SetStateAction<string | null>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  children?: ReactNode;
}

export default function EVVehicleForm({
  vehicleData,
  setVehicleData,
  selectedPlug,
  setSelectedPlug,
  errors,
  setErrors,
  children,
}: EVVehicleFormProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="px-6 pt-2">
      {/* Form Fields */}
      <View className="space-y-4 mb-4" style={{ gap: 12 }}>
        {[
          { key: "maker", placeholder: "Car Maker" },
          { key: "model", placeholder: "Car Model" },
          { key: "vin", placeholder: "VIN", maxLength: 17 },
          {
            key: "registration",
            placeholder: "Vehicle Registration Number",
          },
          { key: "battery", placeholder: "Battery Capacity" },
        ].map((field) => (
          <View key={field.key}>
            <View className="bg-gray-100 dark:bg-gray-800 rounded-3xl px-6 py-2">
              <TextInput
                placeholder={field.placeholder}
                className="text-md font-bold text-black dark:text-white"
                placeholderTextColor={
                  isDark ? Colors.dark.muted : Colors.light.muted
                }
                value={(vehicleData as any)[field.key]}
                onChangeText={(text) => {
                  setVehicleData((prev: any) => ({
                    ...prev,
                    [field.key]: text,
                  }));
                  if (errors[field.key])
                    setErrors((prev) => ({ ...prev, [field.key]: "" }));
                }}
                autoCapitalize={field.key === "vin" ? "characters" : "words"}
                maxLength={field.maxLength}
              />
            </View>
            {errors[field.key] && (
              <Text className="text-red-500 text-[10px] ml-6 mt-1">
                {errors[field.key]}
              </Text>
            )}
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
                  ? "bg-emerald-100/50 border-2 border-emerald-500"
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
          </TouchableOpacity>
        ))}
      </View>

      {/* Additional UI (Your Vehicle, ActionButton, etc) */}
      {children}
    </View>
  );
}
