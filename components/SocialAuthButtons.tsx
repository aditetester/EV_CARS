import { Image, ImageSource } from "expo-image";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface SocialItem {
  icon: ImageSource;
  onPress?: () => void;
}

interface SocialAuthButtonsProps {
  data?: SocialItem[];
}

const defaultSocials: SocialItem[] = [
  {
    icon: require("../assets/images/sign-in/google-icon.png"),
    onPress: () => console.log("Google"),
  },
  {
    icon: require("../assets/images/sign-in/apple-icon.png"),
    onPress: () => console.log("Apple"),
  },
  {
    icon: require("../assets/images/sign-in/facebook-icon.png"),
    onPress: () => console.log("Facebook"),
  },
];

const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({
  data = defaultSocials,
}) => {
  return (
    <View className="flex-row justify-center mb-10" style={{ gap: 24 }}>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={item.onPress}
          className="bg-black dark:bg-gray-800 p-3 rounded-xl w-24 items-center"
        >
          <Image
            source={item.icon}
            style={{ width: 32, height: 32 }}
            contentFit="contain"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SocialAuthButtons;
