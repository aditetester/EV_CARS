import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-8 justify-center">
        {/* Illustration */}
        <View className="items-center mb-10">
          <Image
            source={require("../assets/images/sign-in/sign-in.svg")}
            style={{ width: 300, height: 200 }}
            contentFit="contain"
          />
        </View>

        <Text className="text-3xl font-bold text-center mb-8">
          Glad to meet you again!
        </Text>

        <View className="space-y-4 mb-6">
          <TextInput
            placeholder="Email / Mobile Number"
            className="bg-gray-100 rounded-xl px-4 py-4 text-lg"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <TouchableOpacity
          className="bg-[#00c49a] rounded-3xl py-4 mb-8"
          onPress={() => router.push("/otp")}
        >
          <Text className="text-white text-center text-xl font-bold">
            SIGN IN NOW
          </Text>
        </TouchableOpacity>

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
            Not registered yet?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/sign-up")}>
            <Text className="text-black font-bold text-lg">Sign Up Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
