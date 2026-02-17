import { Image } from "expo-image";
import { Text, View } from "react-native";

function ExploreItem({
  title,
  icon,
  color,
}: {
  title: string;
  icon: any;
  color: string;
}) {
  return (
    <View className="items-center w-[22%]">
      <View
        className="w-16 h-16 rounded-full items-center justify-center mb-2 shadow-sm"
        style={{ backgroundColor: color }}
      >
        <Image
          source={icon}
          style={{ width: 32, height: 32 }}
          contentFit="contain"
          tintColor="black"
        />
      </View>
      <Text className="text-center text-xs font-semibold text-black">
        {title}
      </Text>
    </View>
  );
}

export default ExploreItem;
