import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ActionButton from "@/components/ActionButton";
import SocialAuthButtons from "@/components/SocialAuthButtons";
import { useColorScheme } from "nativewind";

export default function SignUpScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <StatusBar style="auto" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-8 pt-10 pb-6">
          <Text className="text-3xl font-bold text-center mb-10 mt-10 text-black dark:text-white">
            Welcome to WROOM
          </Text>

          <View className="space-y-6 mb-8" style={{ gap: 20 }}>
            <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2">
              <Text className="mr-3 text-gray-400">
                <Ionicons
                  name="person-outline"
                  size={22}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              </Text>
              <TextInput
                placeholder="Name"
                className="flex-1 text-lg text-black dark:text-white"
                placeholderTextColor={
                  isDark ? Colors.dark.muted : Colors.light.muted
                }
              />
            </View>

            <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2">
              <Text className="mr-3 text-gray-400">
                <Ionicons
                  name="call-outline"
                  size={22}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              </Text>
              <TextInput
                placeholder="Mobile Number"
                className="flex-1 text-lg text-black dark:text-white"
                keyboardType="phone-pad"
                placeholderTextColor={
                  isDark ? Colors.dark.muted : Colors.light.muted
                }
              />
            </View>

            <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2">
              <Text className="mr-3 text-gray-400">
                <Ionicons
                  name="mail-outline"
                  size={22}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              </Text>
              <TextInput
                placeholder="Email"
                className="flex-1 text-lg text-black dark:text-white"
                keyboardType="email-address"
                placeholderTextColor={
                  isDark ? Colors.dark.muted : Colors.light.muted
                }
              />
            </View>
          </View>

          <ActionButton
            title="REGISTER NOW"
            onPress={() => router.push("/otp")}
          />

          <TouchableOpacity className="mb-8 mt-8">
            <Text
              style={{
                color: isDark ? Colors.dark.emerald : Colors.light.emerald,
              }}
              className="text-center text-lg font-medium"
            >
              Skip for Now {">>"}
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center mb-8 pr-4">
            <TouchableOpacity
              onPress={() => setAccepted(!accepted)}
              style={{
                backgroundColor: accepted
                  ? isDark
                    ? Colors.dark.emerald
                    : Colors.light.emerald
                  : undefined,
                borderColor: accepted
                  ? isDark
                    ? Colors.dark.emerald
                    : Colors.light.emerald
                  : isDark
                    ? "#4B5563"
                    : "#D1D5DB", // approximate gray-500/gray-300
              }}
              className="w-6 h-6 rounded border items-center justify-center mr-3"
            >
              {accepted && <Text className="text-white text-xs">✓</Text>}
            </TouchableOpacity>
            <Text className="text-gray-500 dark:text-gray-400 text-sm flex-1">
              Accept all the requirements that we have provided.
            </Text>
          </View>

          <View className="flex-row items-center mb-8">
            <View className="flex-1 h-[1px] bg-gray-300 dark:bg-gray-700" />
            <Text className="mx-4 text-gray-500 dark:text-gray-400">
              Or continue with
            </Text>
            <View className="flex-1 h-[1px] bg-gray-300 dark:bg-gray-700" />
          </View>

          <SocialAuthButtons />

          <View className="flex-row items-center justify-center">
            <Text
              style={{
                color: isDark ? Colors.dark.emerald : Colors.light.emerald,
              }}
              className="text-center text-lg"
            >
              Already registered?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/sign-in")}>
              <Text className="text-black dark:text-white font-bold text-lg">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
