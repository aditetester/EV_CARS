import { Image, ImageSource } from "expo-image";
import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";

interface BrandItemProps {
  source: ImageSource;
  onPress?: () => void;
  size?: number;
  containerStyle?: ViewStyle;
  tintColor?: string;
  backgroundColor?: string;
}

const BrandItem: React.FC<BrandItemProps> = ({
  source,
  onPress,
  size = 60,
  containerStyle,
  tintColor,
  backgroundColor = "transparent",
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Image
        source={source}
        style={{ width: size, height: size, tintColor, backgroundColor }}
        contentFit="contain"
      />
    </TouchableOpacity>
  );
};

export default BrandItem;
