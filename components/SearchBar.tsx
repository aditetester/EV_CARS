import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  onFocusChange?: (isFocused: boolean) => void;
  onPress?: () => void;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onFocusChange,
  onPress,
  autoFocus,
}) => {
  const theme = useTheme();
  const inputElement = (
    <TextInput
      placeholder="I am looking for"
      placeholderTextColor={theme.muted}
      className="text-gray-600 dark:text-white"
      autoFocus={autoFocus}
      editable={!onPress}
      onFocus={() => onFocusChange?.(true)}
      onBlur={() => onFocusChange?.(false)}
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
