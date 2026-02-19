import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OTPScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== "" && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="flex-1 px-8 justify-center">
        {/* Illustration */}
        <View className="items-center mb-10">
          <Image
            source={require("../assets/images/sign-in/OTP.svg")}
            style={{ width: 300, height: 250 }}
            contentFit="contain"
          />
        </View>

        <Text className="text-3xl font-bold text-center mb-4 text-black dark:text-white">
          Enter 4-digit{"\n"}Verification code
        </Text>

        <Text className="text-center text-gray-400 dark:text-gray-500 mb-10">
          Code send to +91 82****89 and to your registered email. This code will
          expired in 01:30
        </Text>

        <View className="flex-row justify-between mb-8 px-4">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              className="w-16 h-20 bg-gray-100 dark:bg-gray-800 rounded-xl text-center text-3xl font-bold text-black dark:text-white"
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              textContentType="oneTimeCode"
            />
          ))}
        </View>

        <TouchableOpacity className="mb-8">
          <Text className="text-[#00c49a] text-center text-lg font-bold">
            Resend OTP
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#00c49a] rounded-3xl py-4"
          onPress={() => router.push("/dashboard")}
        >
          <Text className="text-white text-center text-xl font-bold uppercase">
            Verify
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
