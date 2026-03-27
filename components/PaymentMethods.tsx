import {
  validateCardNumber,
  validateCVV,
  validateExpiry,
  validateName,
} from "@/lib/validation";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface PaymentMethodsProps {
  finalTotal: string;
  onPaymentSuccess: () => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  finalTotal,
  onPaymentSuccess,
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const [expandedSection, setExpandedSection] = useState<string | null>(
    "Cards",
  );
  const [cardData, setCardData] = useState({
    name: "",
    expiry: "",
    number: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateCard = () => {
    const newErrors: Record<string, string> = {};
    if (!validateName(cardData.name)) newErrors.name = "Invalid Name";
    if (!validateExpiry(cardData.expiry)) newErrors.expiry = "Invalid (MM/YY)";
    if (!validateCardNumber(cardData.number))
      newErrors.number = "Invalid Card Number";
    if (!validateCVV(cardData.cvv)) newErrors.cvv = "Invalid CVV";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleCardPayment = () => {
    if (validateCard()) {
      onPaymentSuccess();
    }
  };

  const handlePayNow = (amount: string) => {
    const upiUrl = `upi://pay?pa=merchant@upi&pn=EV_CARS&am=${amount}&cu=INR`;

    Linking.canOpenURL(upiUrl)
      .then((supported: boolean) => {
        if (supported) {
          Linking.openURL(upiUrl).then(() => {
            // Once returned from UPI app, show success for demo
            onPaymentSuccess();
          });
        } else {
          Alert.alert(
            "UPI Not Supported",
            "No UPI app found on your device. Please install one to proceed.",
          );
        }
      })
      .catch((err: any) => console.error("An error occurred", err));
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <View className="mt-3 bg-white dark:bg-gray-900 shadow-sm rounded-2xl border border-gray-300 dark:border-gray-800 overflow-hidden">
      <View className="px-4 py-3 border-b border-gray-300 dark:border-gray-800">
        <Text className="font-bold text-lg dark:text-white">Payment</Text>
      </View>

      <View className="">
        {/* Cards Section */}
        <View className="border-b border-gray-300 dark:border-gray-800 pb-2">
          <TouchableOpacity
            onPress={() => toggleSection("Cards")}
            className="flex-row justify-between items-center px-4 py-2 bg-white dark:bg-gray-900"
          >
            <Text className="font-bold text-black dark:text-white">Cards</Text>
            <Ionicons
              name={expandedSection === "Cards" ? "chevron-up" : "chevron-down"}
              size={20}
              color={isDark ? "white" : "black"}
            />
          </TouchableOpacity>

          {expandedSection === "Cards" && (
            <View className="mr-4 ml-4 p-4 bg-gray-100 dark:bg-gray-900/50 rounded-2xl mb-2">
              <View className="flex-row gap-4 mb-4">
                <View className="flex-1">
                  <TextInput
                    placeholder="Card Holder Name"
                    placeholderTextColor="gray"
                    className={`border-b ${errors.name ? "border-red-500" : "border-gray-500 dark:border-gray-600"} py-2 dark:text-white`}
                    value={cardData.name}
                    onChangeText={(text) => {
                      setCardData((prev) => ({ ...prev, name: text }));
                      if (errors.name)
                        setErrors((prev) => ({ ...prev, name: "" }));
                    }}
                  />
                  {errors.name && (
                    <Text className="text-red-500 text-[8px]">
                      {errors.name}
                    </Text>
                  )}
                </View>
                <View className="w-24">
                  <TextInput
                    placeholder="MM/YY"
                    placeholderTextColor="gray"
                    className={`border-b ${errors.expiry ? "border-red-500" : "border-gray-500 dark:border-gray-600"} py-2 text-center dark:text-white`}
                    value={cardData.expiry}
                    onChangeText={(text) => {
                      setCardData((prev) => ({ ...prev, expiry: text }));
                      if (errors.expiry)
                        setErrors((prev) => ({ ...prev, expiry: "" }));
                    }}
                    maxLength={5}
                  />
                  {errors.expiry && (
                    <Text className="text-red-500 text-[8px] text-center">
                      {errors.expiry}
                    </Text>
                  )}
                </View>
              </View>
              <View className="flex-row gap-4 mb-4">
                <View className="flex-1">
                  <TextInput
                    placeholder="Card Number"
                    placeholderTextColor="gray"
                    className={`border-b ${errors.number ? "border-red-500" : "border-gray-500 dark:border-gray-600"} py-2 dark:text-white`}
                    keyboardType="numeric"
                    value={cardData.number}
                    onChangeText={(text) => {
                      setCardData((prev) => ({ ...prev, number: text }));
                      if (errors.number)
                        setErrors((prev) => ({ ...prev, number: "" }));
                    }}
                    maxLength={16}
                  />
                  {errors.number && (
                    <Text className="text-red-500 text-[8px]">
                      {errors.number}
                    </Text>
                  )}
                </View>
                <View className="w-24">
                  <TextInput
                    placeholder="CVV"
                    placeholderTextColor="gray"
                    className={`border-b ${errors.cvv ? "border-red-500" : "border-gray-500 dark:border-gray-600"} py-2 text-center dark:text-white`}
                    keyboardType="numeric"
                    secureTextEntry
                    value={cardData.cvv}
                    onChangeText={(text) => {
                      setCardData((prev) => ({ ...prev, cvv: text }));
                      if (errors.cvv)
                        setErrors((prev) => ({ ...prev, cvv: "" }));
                    }}
                    maxLength={3}
                  />
                  {errors.cvv && (
                    <Text className="text-red-500 text-[8px] text-center">
                      {errors.cvv}
                    </Text>
                  )}
                </View>
              </View>
              <TouchableOpacity
                onPress={handleCardPayment}
                className="bg-emerald-500 py-3 rounded-xl items-center"
              >
                <Text className="text-white font-bold">Pay ${finalTotal}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Wallet Section */}
        <View className="border-b border-gray-300 dark:border-gray-800 pb-2">
          <TouchableOpacity
            onPress={() => toggleSection("Wallet")}
            className="flex-row justify-between items-center px-4 py-2 bg-white dark:bg-gray-900"
          >
            <Text className="font-bold text-black dark:text-white">Wallet</Text>
            <Ionicons
              name={
                expandedSection === "Wallet" ? "chevron-up" : "chevron-down"
              }
              size={20}
              color={isDark ? "white" : "black"}
            />
          </TouchableOpacity>
          {expandedSection === "Wallet" && (
            <View className="mr-4 ml-4 mt-1 p-4 bg-gray-100 dark:bg-gray-900/50 rounded-2xl mb-2">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-xs text-gray-500">
                    Available Balance
                  </Text>
                  <Text className="font-bold text-lg dark:text-white">
                    $120.50
                  </Text>
                </View>
                <TouchableOpacity className="bg-emerald-500 px-4 py-2 rounded-lg">
                  <Text className="text-white font-bold text-xs">
                    ADD MONEY
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Cash Section */}
        <View className="border-b border-gray-300 dark:border-gray-800 pb-2">
          <TouchableOpacity
            onPress={() => toggleSection("Cash")}
            className="flex-row justify-between items-center px-4 py-2 bg-white dark:bg-gray-900"
          >
            <Text className="font-bold text-black dark:text-white">Cash</Text>
            <Ionicons
              name={expandedSection === "Cash" ? "chevron-up" : "chevron-down"}
              size={20}
              color={isDark ? "white" : "black"}
            />
          </TouchableOpacity>
          {expandedSection === "Cash" && (
            <View className="mr-4 ml-4 mt-1 p-4 bg-gray-100 dark:bg-gray-900/50 rounded-2xl mb-2">
              <Text className="text-xs text-gray-500 leading-4">
                Pay with cash at the time of service or delivery. Please ensure
                you have the exact amount or sufficient change available.
              </Text>
            </View>
          )}
        </View>

        {/* GPay Section */}
        <View className="">
          <TouchableOpacity
            onPress={() => toggleSection("GPay")}
            className="flex-row justify-between items-center px-4 py-2 bg-white dark:bg-gray-900"
          >
            <Text className="font-bold text-black dark:text-white">GPay</Text>
            <Ionicons
              name={expandedSection === "GPay" ? "chevron-up" : "chevron-down"}
              size={20}
              color={isDark ? "white" : "black"}
            />
          </TouchableOpacity>
          {expandedSection === "GPay" && (
            <View className="mr-4 ml-4 mt-1 p-4 bg-gray-100 dark:bg-gray-900/50 rounded-2xl mb-4 items-center">
              <TouchableOpacity
                onPress={() => handlePayNow(finalTotal)}
                className="bg-black py-3 px-8 rounded-xl flex-row items-center gap-2 w-full justify-center"
              >
                <Ionicons name="logo-google" size={18} color="white" />
                <Text className="text-white font-bold">Pay with GPay</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default PaymentMethods;
