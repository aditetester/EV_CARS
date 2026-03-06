import React from "react";
import { Text, View } from "react-native";

interface BillRowProps {
  label: string;
  value: string;
  isTotal?: boolean;
  isDiscount?: boolean;
}

const BillRow: React.FC<BillRowProps> = ({
  label,
  value,
  isTotal = false,
  isDiscount = false,
}) => (
  <View className="flex-row justify-between items-center mb-1">
    <Text
      className={`${isTotal ? "font-bold text-yellow-500 text-lg" : "text-black dark:text-white font-medium"} text-sm ${isDiscount ? "text-emerald-500 font-bold" : ""}`}
    >
      {label}
    </Text>
    <Text
      className={`${isTotal ? "font-bold text-yellow-500 text-lg" : isDiscount ? "text-emerald-500 font-bold" : "text-black dark:text-white font-bold"} text-sm`}
    >
      {value}
    </Text>
  </View>
);

export default BillRow;
