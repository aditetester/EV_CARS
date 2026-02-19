import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Define interface for menu items
interface MenuItem {
  icon: React.ReactNode;
  label: string;
  action?: () => void;
}

interface MenuSection {
  title: string;
  data: MenuItem[];
}

export default function ProfileScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const router = useRouter();

  // Data for the top action grid
  const actionGridItems = [
    { label: "Orders", icon: "clipboard-list", type: "FontAwesome5" },
    { label: "My Car", icon: "car", type: "FontAwesome5" },
    { label: "Wallet", icon: "wallet", type: "FontAwesome5" },
    { label: "Support", icon: "headset", type: "FontAwesome5" },
  ] as const;

  // Data for the menu list
  const menuSections: MenuSection[] = [
    {
      title: "YOUR INFORMATION",
      data: [
        {
          icon: (
            <Ionicons
              name="person"
              size={20}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
          ),
          label: "Profile",
        },
        {
          icon: (
            <Ionicons
              name="book"
              size={20}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
          ),
          label: "Address Book",
        },
      ],
    },
    {
      title: "OTHER INFORMATION",
      data: [
        {
          icon: (
            <MaterialIcons
              name="translate"
              size={20}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
          ),
          label: "Language Selection",
        },
        {
          icon: (
            <Ionicons
              name="notifications-outline"
              size={20}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
          ),
          label: "Notification Preferences",
        },
        {
          icon: (
            <MaterialIcons
              name="info-outline"
              size={20}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
          ),
          label: "About Us",
        },
        {
          icon: (
            <FontAwesome5
              name="share"
              size={18}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
          ),
          label: "Referral",
        },
        {
          icon: (
            <Ionicons
              name="power"
              size={20}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
          ),
          label: "Log out",
          action: () => router.replace("/sign-in"),
        },
      ],
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black">
      {/* Header with Curve */}
      <View className="relative bg-[#00C29F] h-40 rounded-b-[30px] pt-12">
        <View className="w-full px-4 flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Profile Image - Positioned absolutely to overlap header and body */}
        <View className="absolute -bottom-16 w-full items-center">
          <View className="h-36 w-36 rounded-full border-4 border-white dark:border-black overflow-hidden shadow-lg bg-gray-200">
            <Image
              source={require("../assets/images/profile/profile.png")}
              className="h-full w-full"
              resizeMode="cover"
            />
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View className="mt-20 px-6 pb-6">
        {/* Greeting */}
        <Text className="text-center text-lg font-medium text-black dark:text-white mb-4">
          Hey! <Text className="text-[#00C29F] font-bold">Nishanth.</Text> Good
          Morning
        </Text>

        {/* Action Grid */}
        <View className="flex-row justify-between mb-6 px-10">
          {actionGridItems.map((item, index) => (
            <TouchableOpacity key={index} className="items-center w-[22%]">
              <View className="w-14 h-14 bg-[#00C29F] rounded-[12px] items-center justify-center shadow-md mb-2">
                <FontAwesome5 name={item.icon} size={24} color="white" />
              </View>
              <Text className="text-xs text-black dark:text-white font-medium">
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Items */}
        {menuSections.map((section, index) => (
          <View key={index} className="mb-4">
            <Text className="text-gray-400 text-md font-bold mb-3 uppercase tracking-wider">
              {section.title}
            </Text>
            {section.data.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={item.action}
                className="flex-row items-center py-3"
              >
                <View className="w-8 items-center mr-4">{item.icon}</View>
                <Text className="text-base font-semibold text-black dark:text-white">
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Theme Toggle Section */}
        <View className="items-center mt-4 flex-row justify-center gap-4">
          <Ionicons
            name="sunny-outline"
            size={24}
            color={colorScheme === "dark" ? "gray" : "#00C29F"}
          />
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={colorScheme === "dark" ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleColorScheme}
            value={colorScheme === "dark"}
          />
          <Ionicons
            name="moon"
            size={24}
            color={colorScheme === "dark" ? "white" : "gray"}
          />
        </View>

        <Text className="text-center text-gray-500 text-xs mt-4 mb-6">
          Version v.0.0.1
        </Text>
      </View>
    </ScrollView>
  );
}
