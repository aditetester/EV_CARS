import NotificationMessage from "@/components/NotificationMessage";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationPreferences() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const [smsEnabled, setSmsEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black px-6">
      {/* Header */}
      <View className="flex-row items-center mt-2 mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDark ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>

      <Text className="text-xl font-bold text-black dark:text-white mb-6">
        Notification preferences
      </Text>

      {/* Card */}
      <View className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
        <Text className="font-semibold text-black dark:text-white mb-4">
          Promos and Offers
        </Text>

        <NotificationMessage
          icon={
            <MaterialIcons
              name="sms"
              size={32}
              color={isDark ? "white" : "black"}
            />
          }
          message="Receive SMS updates about coupons, promotions and offers"
          value={smsEnabled}
          onToggle={() => setSmsEnabled(!smsEnabled)}
        />

        <NotificationMessage
          icon={
            <Ionicons
              name="mail"
              size={32}
              color={isDark ? "white" : "black"}
            />
          }
          message="Receive email updates about coupons, promotions and offers"
          value={emailEnabled}
          onToggle={() => setEmailEnabled(!emailEnabled)}
        />

        <NotificationMessage
          icon={
            <FontAwesome
              name="whatsapp"
              size={32}
              color={isDark ? "white" : "black"}
            />
          }
          message="Receive WhatsApp updates about coupons, promotions and offers"
          value={whatsappEnabled}
          onToggle={() => setWhatsappEnabled(!whatsappEnabled)}
        />
      </View>
    </SafeAreaView>
  );
}
