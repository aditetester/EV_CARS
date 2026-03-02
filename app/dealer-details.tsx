import ActionButton from "@/components/ActionButton";
import BottomTabs from "@/components/BottomTabs";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function DealerDetailsScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const params = useLocalSearchParams();
  const { name, address, rating } = params;
  const [visitType, setVisitType] = useState<"showroom" | "home">("showroom");

  const showroomName = (name as string) || "MARK EV MOTORS";
  const showroomAddress =
    (address as string) || "5th Cross, Colusa Ave\nTexas, US, TX1 45A";
  const showroomRating = rating ? parseInt(rating as string) : 4;
  const [date, setDate] = useState(new Date(2024, 3, 5, 10, 30)); // Default: 05 April 2024 10:30 AM
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [isCallbackVisible, setIsCallbackVisible] = useState(false);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const currentDate = new Date(date);
      currentDate.setFullYear(selectedDate.getFullYear());
      currentDate.setMonth(selectedDate.getMonth());
      currentDate.setDate(selectedDate.getDate());
      setDate(currentDate);
    }
  };

  const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const currentDate = new Date(date);
      currentDate.setHours(selectedTime.getHours());
      currentDate.setMinutes(selectedTime.getMinutes());
      setDate(currentDate);
    }
  };

  const formatDate = (d: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    return d.toLocaleDateString("en-GB", options).toUpperCase();
  };

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER BACKGROUND SHAPES */}
        <View
          className="absolute top-0 left-0 right-0 h-80 overflow-hidden"
          pointerEvents="none"
        >
          {/* Yellow Shape Top Background */}
          <View className="absolute top-0 left-0 right-0 h-40 bg-[#FBBF24] rounded-bl-[90px]" />
          {/* Teal Circle Right */}
          <View className="absolute -right-20 -top-10 w-60 h-40 rounded-full bg-[#00BFA5]" />
        </View>

        {/* HEADER NAVIGATION */}
        <View className="flex-row items-center px-6 pt-8">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
        </View>

        {/* SHOWROOM IMAGE CARD */}
        <View className="px-6">
          <View
            className="bg-white rounded-[32px] overflow-hidden shadow-2xl dark:border-2 dark:border-gray-200"
            style={{
              elevation: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.2,
              shadowRadius: 15,
            }}
          >
            <Image
              source={require("../assets/images/dealer-details/header.jpg")}
              className="w-full h-56"
              resizeMode="cover"
            />
          </View>
        </View>

        {/* DEALER INFO SECTION */}
        <View className="px-6 mt-2 flex-row justify-between">
          <View className="flex-1">
            <Text className="text-md font-black text-bold text-black tracking-tighter uppercase dark:text-white">
              {showroomName}
            </Text>
            <Text className="text-sm text-gray-500 mt-1 leading-4 dark:text-gray-400">
              {showroomAddress}
            </Text>
          </View>

          <View className="items-end">
            {/* Stars */}
            <View className="flex-row mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons
                  key={i}
                  name="star"
                  size={14}
                  color={i <= showroomRating ? "#FBBF24" : "#E5E7EB"}
                />
              ))}
            </View>
            {/* Action Icons */}
            <View className="flex-row space-x-3">
              <TouchableOpacity className="items-center mr-2">
                <View className="w-9 h-9 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center dark:bg-gray-800 dark:border-gray-500">
                  <Ionicons name="location" size={18} color="#FBBF24" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="items-center">
                <View className="w-9 h-9 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center dark:bg-gray-800 dark:border-gray-500">
                  <Ionicons
                    name="call-outline"
                    size={18}
                    color={isDark ? "white" : "black"}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* CAR & ACTION BUTTONS SECTION */}
        <View className="flex-row px-4 items-center h-56">
          {/* Car Image */}
          <View className="flex-1 relative items-center">
            <View className="w-full h-48 items-center justify-center dark:bg-gray-800 dark:rounded-3xl dark:border dark:border-gray-500">
              <Image
                source={require("../assets/images/brand-varients/red-car.png")}
                resizeMode="contain"
                style={{ width: width * 1.5, height: 200 }}
              />
            </View>
          </View>

          {/* Action Buttons List */}
          <View className="w-48 space-y-2 gap-2 -mr-6">
            {[
              "Request Callback",
              "Finance",
              "Online Consulting",
              "Show Room Visit",
              "Book Now",
            ].map((title, index) => (
              <View key={index} className="flex-row items-center">
                {index === 0 && (
                  <Image
                    source={require("../assets/images/car-search/discount.png")}
                    className="w-6 h-6 mr-2"
                    resizeMode="contain"
                  />
                )}
                <ActionButton
                  title={title}
                  onPress={() => {
                    if (title === "Request Callback") {
                      setIsCallbackVisible(true);
                    } else if (title === "Book Now") {
                      console.log("Book Now");
                    } else if (title === "Finance") {
                      console.log("Finance");
                    } else if (title === "Online Consulting") {
                      console.log("Online Consulting");
                    } else if (title === "Show Room Visit") {
                      console.log("Show Room Visit");
                    }
                  }}
                  className={`py-2.5 rounded-full items-start px-2 ${index === 0 ? "flex-1" : "ml-8 w-40"}`}
                  textClassName="text-[10px] tracking-widest font-bold"
                />
              </View>
            ))}
          </View>
        </View>

        {/* SLOT BOOKING SECTION */}
        <View className="px-6">
          <Text className="text-xl font-black text-black tracking-tight mb-2 dark:text-white">
            SLOT BOOKING
          </Text>

          {/* Visit Type Toggle */}
          <View className="flex-row items-center justify-center space-x-10 mb-4">
            <TouchableOpacity
              onPress={() => setVisitType("showroom")}
              className="flex-row items-center"
            >
              <View
                className={`w-5 h-5 rounded-full border-4 items-center justify-center ${
                  visitType === "showroom"
                    ? "border-[#00BFA5] bg-yellow-400"
                    : "border-gray-400"
                }`}
              >
                {visitType === "showroom" && (
                  <View className="w-2 h-2 rounded-full bg-black/10" />
                )}
              </View>
              <Text className="ml-2 mr-2 text-md font-bold text-black dark:text-white">
                Show Room
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setVisitType("home")}
              className="flex-row items-center"
            >
              <View
                className={`w-5 h-5 rounded-full border-4 items-center justify-center ${
                  visitType === "home"
                    ? "border-[#00BFA5] bg-yellow-400"
                    : "border-gray-400"
                }`}
              >
                {visitType === "home" && (
                  <View className="w-2 h-2 rounded-full bg-black/10" />
                )}
              </View>
              <Text className="ml-2 text-md font-bold text-black dark:text-white">
                Home
              </Text>
            </TouchableOpacity>
          </View>

          {/* Date & Time Selectors */}
          <View className="flex-row items-center justify-center mb-2 px-14">
            <Text className="text-lg font-bold text-black w-24 dark:text-white">
              Date
            </Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="flex-1 flex-row items-center bg-[#F2F2F2] dark:bg-gray-800 rounded-2xl px-2 py-2"
            >
              <Ionicons
                name="calendar-outline"
                size={24}
                color="#FBBF24"
                className="mr-4"
              />
              <Text className="text-md font-bold text-black uppercase dark:text-gray-400">
                {formatDate(date)}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center justify-center px-14">
            <Text className="text-lg font-bold text-black w-24 dark:text-white">
              Time
            </Text>
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              className="flex-1 flex-row items-center bg-[#F2F2F2] dark:bg-gray-800 rounded-2xl px-2 py-2"
            >
              <Ionicons
                name="time-outline"
                size={24}
                color="#FBBF24"
                className="mr-4"
              />
              <Text className="text-md font-bold text-black dark:text-gray-400">
                {formatTime(date)}
              </Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={date}
              mode="time"
              display="default"
              is24Hour={false}
              onChange={onTimeChange}
            />
          )}

          {/* Bottom Action Buttons */}
          <View className="flex-row justify-between mt-3 mb-40">
            <ActionButton
              title="CONFIRM SLOT NOW"
              onPress={() => setIsConfirmationVisible(true)}
              className="px-6 py-4 rounded-2xl flex-1 mr-3"
              textClassName="text-sm tracking-tight"
            />
            <ActionButton
              title="NEED HELP"
              onPress={() => {
                console.log("NEED HELP");
              }}
              className="px-6 py-4 rounded-2xl flex-1 ml-3"
              textClassName="text-sm tracking-tight"
            />
          </View>
        </View>
      </ScrollView>

      {/* Slot Confirmation Modal */}
      <Modal
        visible={isConfirmationVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsConfirmationVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-8">
          {/* Header Icon */}
          <View className="z-10 -mb-10 w-24 h-24 rounded-full bg-[#00BFA5] border-4 border-yellow-400 items-center justify-center shadow-lg">
            <Ionicons name="checkmark" size={50} color="white" />
          </View>

          {/* Card Container */}
          <View className="bg-white dark:bg-gray-900 w-full rounded-[40px] pt-14 pb-8 px-8 items-center">
            <Text className="text-2xl font-black text-black dark:text-white mb-1">
              Congratulations
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
              Your request is submitted to our Dealer
            </Text>

            {/* Ticket Divider */}
            <View className="flex-1 border-b border-dashed border-gray-300 mx-2 w-full mb-6" />

            {/* Booking Information */}
            <View className="w-full space-y-4 gap-4 mb-8">
              <View>
                <Text className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                  Dealer
                </Text>
                <Text className="text-md font-black text-black dark:text-white uppercase">
                  {showroomName}
                </Text>
              </View>
              <View>
                <Text className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                  Date and Time
                </Text>
                <Text className="text-md font-black text-black dark:text-white uppercase">
                  {formatDate(date)}, {formatTime(date)}
                </Text>
              </View>
              <View>
                <Text className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                  Duration
                </Text>
                <Text className="text-md font-black text-black dark:text-white">
                  1hr 00min
                </Text>
              </View>
            </View>

            {/* Navigation Icons */}
            <Text className="text-sm font-bold text-black dark:text-white mb-4">
              Navigate Me To
            </Text>
            <View className="flex-row space-x-8 mb-10">
              <TouchableOpacity activeOpacity={0.7} className="mr-8">
                <Image
                  source={require("../assets/images/dealer-details/google-maps.png")}
                  className="w-14 h-14"
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}>
                <Image
                  source={require("../assets/images/dealer-details/apple.png")}
                  className="w-14 h-14"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <View className="flex-row w-full space-x-4 gap-4">
              <ActionButton
                title="RESCHEDULE"
                onPress={() => setIsConfirmationVisible(false)}
                className="flex-1 py-4 rounded-3xl"
                textClassName="text-[12px] tracking-widest"
              />
              <ActionButton
                title="CLOSE"
                onPress={() => {
                  setIsConfirmationVisible(false);
                  router.push("/dashboard");
                }}
                className="flex-1 py-4 rounded-3xl"
                textClassName="text-[12px] tracking-widest"
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Request Callback Modal */}
      <Modal
        visible={isCallbackVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsCallbackVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-8">
          {/* Header Icon */}
          <View className="z-10 -mb-10 w-24 h-24 rounded-full bg-[#00BFA5] border-4 border-yellow-400 items-center justify-center shadow-lg">
            <Ionicons name="checkmark" size={50} color="white" />
          </View>

          {/* Card Container */}
          <View className="bg-white dark:bg-gray-900 w-full rounded-[40px] pt-14 pb-8 px-8 items-center">
            {/* Ticket Divider */}
            <View className="border-b border-dashed border-gray-300 w-full mb-10" />

            {/* Success Message */}
            <Text className="text-md text-black dark:text-white text-center font-bold px-4 mb-10 leading-6">
              The call-back request was placed successfully. One of our experts
              will give you a call shortly.
            </Text>

            {/* Action Button */}
            <ActionButton
              title="CLOSE"
              onPress={() => setIsCallbackVisible(false)}
              className="w-full py-4 rounded-3xl"
              textClassName="text-[14px] tracking-widest"
            />
          </View>
        </View>
      </Modal>

      {/* Bottom Tabs Component */}
      <BottomTabs />
    </View>
  );
}
