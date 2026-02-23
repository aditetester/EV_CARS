import BottomTabs from "@/components/BottomTabs";
import BrandItem from "@/components/BrandItem";
import CarCard from "@/components/CarCard";
import FilterChip from "@/components/FilterChip";
import ProfileButton from "@/components/ProfileButton";
import SearchBar from "@/components/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CARS = [
  {
    id: "1",
    name: "KIA EV6",
    price: "$45,000",
    image: require("../assets/images/car-search/car.png"),
    rating: 4,
    isNew: true,
    hasDiscount: true,
  },
  {
    id: "2",
    name: "BENTLY EO1",
    price: "$990,000",
    image: require("../assets/images/car-search/car.png"),
    rating: 4,
    isNew: false,
    hasDiscount: true,
  },
  {
    id: "3",
    name: "NISSA EQ Z1",
    price: "$200,000",
    image: require("../assets/images/car-search/car.png"),
    rating: 4,
    isNew: false,
    hasDiscount: true,
  },
  {
    id: "4",
    name: "FERRARI EVF1",
    price: "$850,900",
    image: require("../assets/images/car-search/car.png"),
    rating: 3,
    isNew: false,
    hasDiscount: true,
  },
];

const FILTERS = ["Range", "Speed", "Luxury", "Utility"];

export default function CarSearchScreen() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter],
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white dark:bg-black"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-5"
        contentContainerStyle={{ paddingBottom: 140 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Search Bar + Profile */}
        <View className="flex-row items-center justify-between px-2 py-2 mt-14 gap-2">
          <SearchBar autoFocus onFocusChange={setIsSearchFocused} />
          <ProfileButton />
        </View>

        {/* Filter Chips — only visible when Search is focused */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-3 px-1"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {FILTERS.map((filter) => (
            <FilterChip
              key={filter}
              label={filter}
              isActive={activeFilters.includes(filter)}
              onPress={() => toggleFilter(filter)}
            />
          ))}
        </ScrollView>

        {/* Search Results Header */}
        <View className="flex-row items-center justify-between mt-6 px-1">
          <Text className="text-md font-bold text-black dark:text-white uppercase tracking-widest">
            Search Results
          </Text>
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => console.log("Sort pressed")}>
              <Ionicons
                name="swap-vertical-outline"
                size={22}
                className="text-text-muted dark:text-white"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Filter pressed")}>
              <Ionicons
                name="options-outline"
                size={22}
                className="text-text-muted dark:text-white"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Car Grid (2 columns) */}
        <View className="mt-4">
          <FlatList
            data={CARS}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false} // important because ScrollView is parent
            columnWrapperClassName="justify-between"
            renderItem={({ item }) => (
              <CarCard
                name={item.name}
                price={item.price}
                image={item.image}
                rating={item.rating}
                isNew={item.isNew}
                hasDiscount={item.hasDiscount}
                onPress={() => console.log(`Pressed ${item.name}`)}
                onFavoritePress={() => console.log(`Favorite ${item.name}`)}
              />
            )}
          />
        </View>

        {/* Brand Section */}
        <Text className="mt-2 mb-2 text-md font-bold text-black dark:text-white uppercase tracking-widest">
          Brand
        </Text>

        <View className="flex-row justify-center gap-10 items-center mt-4 px-6">
          <BrandItem
            source={require("../assets/images/car-type/mg.png")}
            onPress={() =>
              router.push({ pathname: "/brandsearch", params: { brand: "MG" } })
            }
          />
          <BrandItem
            source={require("../assets/images/car-type/kia.png")}
            onPress={() =>
              router.push({
                pathname: "/brandsearch",
                params: { brand: "KIA" },
              })
            }
          />
          <BrandItem
            source={require("../assets/images/car-type/mahindra.png")}
            // tintColor="white"
            // backgroundColor="transparent"
            onPress={() =>
              router.push({
                pathname: "/brandsearch",
                params: { brand: "Mahindra" },
              })
            }
          />
          <BrandItem
            source={require("../assets/images/car-type/tata.png")}
            onPress={() =>
              router.push({
                pathname: "/brandsearch",
                params: { brand: "Tata" },
              })
            }
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomTabs />
    </KeyboardAvoidingView>
  );
}
