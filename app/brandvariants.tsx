import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Image,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.6;
const SIDE_ITEM_SPACING = (width - ITEM_WIDTH) / 2;

const COLORS = [
  { id: "white", hex: "#E5E7EB" },
  { id: "red", hex: "#A1131E" },
  { id: "black", hex: "#000000" },
  { id: "blue", hex: "#1D4ED8" },
];

const CAR_VARIANTS = [
  {
    id: "1",
    color: "blue",
    image: require("../assets/images/brand-varients/blue-car.png"),
  },
  {
    id: "2",
    color: "red",
    image: require("../assets/images/brand-varients/red-car.png"),
  },
  {
    id: "3",
    color: "white",
    image: require("../assets/images/brand-varients/white-car.png"),
  },
];

const BRAND_LOGOS: { [key: string]: any } = {
  kia: require("../assets/images/car-type/kia.png"),
  mg: require("../assets/images/car-type/mg.png"),
  mahindra: require("../assets/images/car-type/mahindra.png"),
  tata: require("../assets/images/car-type/tata.png"),
};

export default function BrandVariantsScreen() {
  const { brand = "KIA", carName = "EV6" } = useLocalSearchParams<{
    brand: string;
    carName: string;
  }>();

  // Find initial index for the default selected color ("red")
  const initialIndex = CAR_VARIANTS.findIndex((car) => car.color === "red");
  const initialOffset = (initialIndex !== -1 ? initialIndex : 0) * ITEM_WIDTH;

  const [selectedColor, setSelectedColor] = useState("red");
  const scrollX = useRef(new Animated.Value(initialOffset)).current;
  const flatListRef = useRef<Animated.FlatList>(null);

  const brandLower = brand.toLowerCase();
  const brandLogo = BRAND_LOGOS[brandLower];

  // Only display colors that have a corresponding variant
  const availableColors = COLORS.filter((color) =>
    CAR_VARIANTS.some((variant) => variant.color === color.id),
  );

  const handleColorPress = (colorId: string) => {
    const index = CAR_VARIANTS.findIndex((car) => car.color === colorId);
    if (index !== -1 && flatListRef.current) {
      // scrollToOffset ensures perfect centering with our ITEM_WIDTH logic
      flatListRef.current.scrollToOffset({
        offset: index * ITEM_WIDTH,
        animated: true,
      });
      setSelectedColor(colorId);
    } else {
      setSelectedColor(colorId);
    }
  };

  const handleScrollEnd = (e: any) => {
    const x = e.nativeEvent.contentOffset.x;
    // Adding 10 to x to avoid floating point precision issues at snap points
    const index = Math.round((x + 10) / ITEM_WIDTH);
    if (CAR_VARIANTS[index]) {
      setSelectedColor(CAR_VARIANTS[index].color);
    }
  };

  const renderCarItem = ({ item, index }: { item: any; index: number }) => {
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];

    const scale = (scrollX as any).interpolate({
      inputRange,
      outputRange: [0.7, 1.3, 0.7],
      extrapolate: "clamp",
    });

    const opacity = (scrollX as any).interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: "clamp",
    });

    return (
      <View
        style={{
          width: ITEM_WIDTH,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/cardetail",
              params: { brand, carName, id: item.id },
            })
          }
          activeOpacity={0.9}
        >
          <Animated.View
            style={{
              transform: [{ scale }],
              opacity,
              width: "100%",
              alignItems: "center",
            }}
          >
            <View className="relative w-full h-80 justify-center items-center">
              <Image
                source={item.image}
                style={{ width: width * 2, height: 300 }}
                resizeMode="contain"
              />
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#A1131E]">
      <StatusBar barStyle="light-content" />
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-6 pt-12 relative z-50">
          <TouchableOpacity onPress={() => router.back()} className="z-10">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-center">
          <Image
            source={require("../assets/images/brand/brandsearch.png")}
            className="w-16 h-16 mr-2"
            resizeMode="contain"
            style={{ tintColor: "white", backgroundColor: "transparent" }}
          />
          {brandLogo && (
            <Image
              source={brandLogo}
              className="w-28 h-16"
              resizeMode="contain"
              //   style={{ tintColor: "white", backgroundColor: "transparent" }}
            />
          )}
        </View>

        <View className="items-center mt-2 mb-2">
          <Text className="text-[8px] font-bold text-white tracking-widest uppercase opacity-70">
            EXPERIENCE Movement that inspires
          </Text>
        </View>

        {/* Carousel */}
        <View className="flex-1 justify-center -mt-16">
          <Animated.FlatList
            ref={flatListRef}
            data={CAR_VARIANTS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={renderCarItem}
            getItemLayout={(data, index) => ({
              length: ITEM_WIDTH,
              offset: ITEM_WIDTH * index,
              index,
            })}
            initialScrollIndex={initialIndex !== -1 ? initialIndex : 0}
            contentContainerStyle={{
              paddingHorizontal: SIDE_ITEM_SPACING,
              alignItems: "center",
            }}
            snapToInterval={ITEM_WIDTH}
            snapToAlignment="start"
            decelerationRate="fast"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true },
            )}
            onMomentumScrollEnd={handleScrollEnd}
            scrollEventThrottle={16}
          />
        </View>

        {/* Car Name & Colors */}
        <View className="items-center pb-36 -mt-8">
          <Text className="text-white text-md font-bold uppercase mb-8 tracking-wide">
            {brand} {carName}
          </Text>

          <View className="flex-row items-center justify-center -mt-4">
            {availableColors.map((color) => (
              <TouchableOpacity
                key={color.id}
                onPress={() => handleColorPress(color.id)}
                className={`w-8 h-8 rounded-full mx-2 items-center justify-center ${
                  selectedColor === color.id
                    ? "border-2 border-white"
                    : "border-0"
                }`}
              >
                <View
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: color.hex }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
