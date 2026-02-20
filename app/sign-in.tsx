import ActionButton from "@/components/ActionButton";
import SocialAuthButtons from "@/components/SocialAuthButtons";
import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="flex-1 px-8 justify-center">
        {/* Illustration */}
        <View className="items-center mb-10">
          <Image
            source={require("../assets/images/sign-in/sign-in.svg")}
            style={{ width: 300, height: 200 }}
            contentFit="contain"
          />
        </View>

        <Text className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
          Glad to meet you again!
        </Text>

        <View className="space-y-4 mb-6">
          <TextInput
            placeholder="Email / Mobile Number"
            className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-4 text-lg text-black dark:text-white"
            placeholderTextColor={
              isDark ? Colors.dark.muted : Colors.light.muted
            }
          />
        </View>

        <ActionButton title="SIGN IN NOW" onPress={() => router.push("/otp")} />

        <View className="flex-row items-center mt-8 mb-8">
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
            Not registered yet?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/sign-up")}>
            <Text className="text-black dark:text-white font-bold text-lg">
              Sign Up Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
