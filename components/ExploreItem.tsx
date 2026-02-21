import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

function ExploreItem({
  title,
  icon,
  color,
  onPress,
}: {
  title: string;
  icon: any;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity className="items-center w-[22%]" onPress={onPress}>
      <View
        className="w-20 h-20 rounded-full items-center justify-center mb-2 shadow-sm"
        style={{ backgroundColor: color }}
      >
        <Image
          source={icon}
          style={{ width: 40, height: 40 }}
          contentFit="contain"
          tintColor="black"
        />
      </View>
      <Text className="text-center text-sm font-semibold text-black dark:text-white">
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default ExploreItem;
