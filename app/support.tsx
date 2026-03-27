import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SupportScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const [showFaqInput, setShowFaqInput] = useState(false);
  const [question, setQuestion] = useState("");

  const handleCallSupport = () => {
    Linking.openURL("tel:+919876543210");
  };

  const handleEmailSupport = () => {
    Linking.openURL("mailto:example@gmail.com");
  };

  const handleChatSupport = () => {
    const phoneNumber = "919876543210";

    const message = encodeURIComponent("Hi, I need help regarding my account.");

    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    Linking.openURL(url);
  };

  const handleFaqs = () => {
    setShowFaqInput(true);
  };

  const handleSubmitQuestion = () => {
    if (!question.trim()) {
      Alert.alert("Error", "Please enter your question");
      return;
    }

    // Clear input
    setQuestion("");
    setShowFaqInput(false);

    // Show success popup
    Alert.alert("Submitted ✅", "Your question has been sent successfully!");
  };

  const supportOptions = [
    {
      label: "Chat with us",
      icon: "chatbubble-ellipses-outline",
      onPress: handleChatSupport,
    },
    {
      label: "Call Support",
      icon: "call-outline",
      onPress: handleCallSupport,
    },
    {
      label: "Email Support",
      icon: "mail-outline",
      onPress: handleEmailSupport,
    },
    {
      label: "FAQs",
      icon: "help-circle-outline",
      onPress: handleFaqs,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <ScrollView className="flex-1 bg-white dark:bg-black">
        {/* Header */}
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
            Support
          </Text>
        </View>

        {/* Options */}
        <View className="px-6 mt-6">
          {supportOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center py-4 border-b border-gray-200 dark:border-gray-800"
              onPress={item.onPress}
            >
              <Ionicons
                name={item.icon as any}
                size={22}
                color={isDark ? Colors.dark.text : Colors.light.text}
              />
              <Text className="ml-4 text-base font-semibold text-black dark:text-white">
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ Input */}
        {showFaqInput && (
          <View className="px-6 mt-6">
            <Text className="text-black dark:text-white font-semibold mb-2">
              Ask your question
            </Text>

            <TextInput
              value={question}
              onChangeText={setQuestion}
              placeholder="Type your question..."
              placeholderTextColor="gray"
              multiline
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-black dark:text-white"
            />

            <TouchableOpacity
              onPress={handleSubmitQuestion}
              style={{
                backgroundColor: isDark
                  ? Colors.dark.emerald
                  : Colors.light.emerald,
              }}
              className="mt-3 py-3 rounded-lg items-center"
            >
              <Text className="text-white font-bold">Submit</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Help Box */}
        <View className="px-6 mt-8">
          <View className="bg-gray-100 dark:bg-gray-900 p-5 rounded-2xl">
            <Text className="text-black dark:text-white font-bold text-lg mb-2">
              Need quick help?
            </Text>

            <Text className="text-gray-500 text-sm mb-4">
              Choose a topic and we’ll connect you instantly.
            </Text>

            {/* Quick Issue Buttons */}
            <View className="flex-row flex-wrap justify-between">
              {["Payment Issue", "Order Problem", "App Bug", "Other"].map(
                (item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      const phoneNumber = "919876543210";

                      const message = encodeURIComponent(
                        `Hi, I need help regarding: ${item}`,
                      );

                      const url = `https://wa.me/${phoneNumber}?text=${message}`;
                      Linking.openURL(url);
                    }}
                    className="w-[48%] bg-white dark:bg-black py-3 px-3 rounded-xl mb-3 border border-gray-200 dark:border-gray-700"
                  >
                    <Text className="text-black dark:text-white text-sm font-semibold text-center">
                      {item}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </View>

            {/* Divider */}
            <View className="h-[1px] bg-gray-300 dark:bg-gray-700 my-4" />

            {/* Instant Action */}
            <TouchableOpacity
              onPress={handleChatSupport}
              style={{
                backgroundColor: isDark
                  ? Colors.dark.emerald
                  : Colors.light.emerald,
              }}
              className="py-3 rounded-xl items-center"
            >
              <Text className="text-white font-bold">Start Live Chat ⚡</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
