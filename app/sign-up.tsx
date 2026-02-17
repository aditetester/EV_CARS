import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
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

export default function SignUpScreen() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-8 pt-10 pb-6">
          <Text className="text-3xl font-bold text-center mb-10 mt-10">
            Welcome to WROOM
          </Text>

          <View className="space-y-6 mb-8" style={{ gap: 20 }}>
            <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2">
              <Text className="mr-3 text-gray-400">
                <Ionicons name="person-outline" size={22} color="black" />
              </Text>
              <TextInput
                placeholder="Name"
                className="flex-1 text-lg"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2">
              <Text className="mr-3 text-gray-400">
                <Ionicons name="call-outline" size={22} color="black" />
              </Text>
              <TextInput
                placeholder="Mobile Number"
                className="flex-1 text-lg"
                keyboardType="phone-pad"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2">
              <Text className="mr-3 text-gray-400">
                <Ionicons name="mail-outline" size={22} color="black" />
              </Text>
              <TextInput
                placeholder="Email"
                className="flex-1 text-lg"
                keyboardType="email-address"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <TouchableOpacity
            className="bg-[#00c49a] rounded-3xl py-4 mb-4"
            onPress={() => router.push("/otp")}
          >
            <Text className="text-white text-center text-lg font-bold">
              REGISTER NOW
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="mb-8">
            <Text className="text-[#00c49a] text-center text-lg font-medium">
              Skip for Now {">>"}
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center mb-8 pr-4">
            <TouchableOpacity
              onPress={() => setAccepted(!accepted)}
              className={`w-6 h-6 rounded border ${accepted ? "bg-[#00c49a] border-[#00c49a]" : "border-gray-300"} items-center justify-center mr-3`}
            >
              {accepted && <Text className="text-white text-xs">✓</Text>}
            </TouchableOpacity>
            <Text className="text-gray-500 text-sm flex-1">
              Accept all the requirements that we have provided.
            </Text>
          </View>

          <View className="flex-row items-center mb-8">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="mx-4 text-gray-500">Or continue with</Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
          </View>

          <View
            className="flex-row justify-center space-x-6 mb-10"
            style={{ gap: 24 }}
          >
            <TouchableOpacity className="bg-black p-3 rounded-xl w-24 items-center">
              <Image
                source={require("../assets/images/sign-in/google-icon.png")}
                style={{ width: 32, height: 32 }}
                contentFit="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity className="bg-black p-3 rounded-xl w-24 items-center">
              <Image
                source={require("../assets/images/sign-in/apple-icon.png")}
                style={{ width: 32, height: 32 }}
                contentFit="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity className="bg-black p-3 rounded-xl w-24 items-center">
              <Image
                source={require("../assets/images/sign-in/facebook-icon.png")}
                style={{ width: 32, height: 32 }}
                contentFit="contain"
              />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center justify-center">
            <Text className="text-center text-[#00c49a] text-lg">
              Already registered?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/sign-in")}>
              <Text className="text-black font-bold text-lg">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
