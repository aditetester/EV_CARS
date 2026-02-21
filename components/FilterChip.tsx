import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface FilterChipProps {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  isActive = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`flex-row items-center rounded-full mr-2 px-[10px] py-[5px] border-gray-200 ${
        isActive ? "bg-gray-200 border-2" : "border-2 "
      }`}
    >
      <Text
        className={`text-sm font-semibold ${isActive ? "text-black" : "text-[#666] dark:text-gray-400"}`}
      >
        {label}
      </Text>
      <View className="ml-1.5 bg-gray-100 dark:bg-white/10 rounded-full w-4 h-4 items-center justify-center">
        <Text
          className={`text-[10px] leading-none text-[#666] dark:text-gray-400`}
        >
          +
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FilterChip;
