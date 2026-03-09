import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  onFocusChange?: (isFocused: boolean) => void;
  onPress?: () => void;
  autoFocus?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onFocusChange,
  onPress,
  autoFocus,
  value,
  onChangeText,
}) => {
  const theme = useTheme();
  const inputElement = (
    <TextInput
      placeholder="I am looking for"
      placeholderTextColor={theme.muted}
      className="flex-1 h-10 ml-2 text-gray-600 dark:text-white"
      autoFocus={autoFocus}
      editable={!onPress}
      value={value}
      onChangeText={onChangeText}
      onFocus={() => onFocusChange?.(true)}
      onBlur={() => onFocusChange?.(false)}
      textAlignVertical="center"
      style={{ paddingVertical: 0 }}
    />
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className="border-2 border-gray-200 dark:border-white/20 rounded-2xl flex-1 px-3 py-2 bg-surface dark:bg-surfaceDark"
      >
        {inputElement}
      </TouchableOpacity>
    );
  }

  return (
    <View className="border-2 border-gray-200 dark:border-white/20 rounded-2xl flex-1 px-3 py-2 bg-surface dark:bg-surfaceDark">
      {inputElement}
    </View>
  );
};

export default SearchBar;
