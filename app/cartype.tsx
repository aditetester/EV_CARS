import ExploreItem from "@/components/dashboard/ExploreItem";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CarTypeScreen() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  return (
    <View className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="px-5">
        {/* Search Bar */}
        <View className="flex-1 flex-row items-center justify-between px-2 py-2 mt-14 gap-2">
          <View className="bg-white rounded-xl shadow-sm flex-1 px-2">
            <TextInput
              placeholder="I am looking for"
              className="flex-1 text-gray-500"
            />
          </View>
          <TouchableOpacity
            onPress={() => router.push("/profile")}
            className="w-12 h-12 bg-white dark:bg-black rounded-full items-center justify-center shadow-md"
          >
            <Ionicons
              name="person-circle-outline"
              size={32}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>

        {/* Prefer To Drive */}
        <Text className="mt-6 text-md font-bold text-black uppercase tracking-widest">
          I Prefer To Drive
        </Text>

        <View className="flex-row justify-between mt-4">
          <ExploreItem
            title="Sedan"
            icon={require("../assets/images/car-type/car.png")}
            color="#FBD96D"
            onPress={() => console.log("Sedan")}
          />
          <ExploreItem
            title="Hatchback"
            icon={require("../assets/images/car-type/car.png")}
            color="#1DBF73"
            onPress={() => console.log("Hatchback")}
          />
          <ExploreItem
            title="SUV"
            icon={require("../assets/images/car-type/car.png")}
            color="#1DBF73"
            onPress={() => console.log("SUV")}
          />
          <ExploreItem
            title="MUV"
            icon={require("../assets/images/car-type/car.png")}
            color="#1DBF73"
            onPress={() => console.log("MUV")}
          />
          {/* {[
            { title: "Sedan", color: "#FBD96D" },
            { title: "Hatchback", color: "#1DBF73" },
            { title: "SUV", color: "#1DBF73" },
            { title: "MUV", color: "#1DBF73" },
          ].map((item, index) => (
            <View key={index} className="items-center">
              <TouchableOpacity
                className="w-16 h-16 rounded-full items-center justify-center"
                style={{ backgroundColor: item.color }}
              >
                <Image
                  source={require("../assets/images/car-type/car.png")}
                  style={{ width: 40, height: 40 }}
                  contentFit="contain"
                />
              </TouchableOpacity>
              <Text className="text-xs mt-2 text-gray-600">{item.title}</Text>
            </View>
          ))} */}
        </View>

        {/* Brand Section */}
        <Text className="mt-8 mb-2 text-md font-bold text-black uppercase tracking-widest">
          Brand
        </Text>

        <View className="flex-row justify-center gap-10 items-center mt-4 px-6">
          <TouchableOpacity>
            <Image
              source={require("../assets/images/car-type/mg.png")}
              style={{ width: 60, height: 60 }}
              contentFit="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../assets/images/car-type/kia.png")}
              style={{ width: 60, height: 60 }}
              contentFit="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../assets/images/car-type/mahindra.png")}
              style={{ width: 60, height: 60 }}
              contentFit="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../assets/images/car-type/tata.png")}
              style={{ width: 60, height: 60 }}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Banner Ad */}
        <View className="mt-6 rounded-2xl overflow-hidden border border-blue-400">
          <Image
            source={require("../assets/images/car-type/honda-banner.png")}
            style={{ width: "100%", height: 180 }}
            contentFit="cover"
          />
        </View>

        {/* Spacer for bottom nav */}
        <View className="h-24" />
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-12 left-5 right-5 bg-white rounded-3xl py-4 flex-row justify-around items-center shadow-lg">
        <TouchableOpacity className="bg-[#FBD96D] w-12 h-12 rounded-full items-center justify-center">
          <Ionicons name="home-outline" size={22} color="black" />
        </TouchableOpacity>

        <TouchableOpacity className="bg-[#FBD96D] w-12 h-12 rounded-full items-center justify-center">
          <Ionicons name="flash-outline" size={22} color="black" />
        </TouchableOpacity>

        <TouchableOpacity className="bg-[#FBD96D] w-12 h-12 rounded-full items-center justify-center">
          <Ionicons name="git-branch-outline" size={22} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
