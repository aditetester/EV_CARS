import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

interface TabItem {
  name: React.ComponentProps<typeof Ionicons>["name"];
  onPress?: () => void;
}

interface BottomTabsProps {
  tabs?: TabItem[];
}

const defaultTabs: TabItem[] = [
  {
    name: "home-outline",
    onPress: () => console.log("Home"),
  },
  {
    name: "flash-outline",
    onPress: () => console.log("Flash"),
  },
  {
    name: "notifications-outline",
    onPress: () => console.log("Notifications"),
  },
];

const BottomTabs: React.FC<BottomTabsProps> = ({ tabs = defaultTabs }) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="absolute bottom-6 left-0 right-0 h-[140px]">
      {/* SVG Curve */}
      <Svg
        width={width}
        height={140}
        viewBox={`0 0 ${width} 140`}
        className="absolute bottom-0"
      >
        <Path
          d={`
            M0 50
            Q${width / 2} 0 ${width} 50
            L${width} 130
            L0 130
            Z
          `}
          fill={isDark ? "black" : "white"}
          stroke={isDark ? "gray" : "black"}
          strokeWidth={1.5}
        />
      </Svg>

      {/* Icons */}
      <View className="flex-1 flex-row justify-center items-end gap-10">
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            onPress={tab.onPress}
            style={{
              backgroundColor: isDark
                ? Colors.dark.yellow
                : Colors.light.yellow,
            }}
            className="w-16 h-16 rounded-full items-center justify-center shadow-lg mb-6"
          >
            <Ionicons name={tab.name} size={30} color="black" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default BottomTabs;
