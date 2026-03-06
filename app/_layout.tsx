import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="sign-in">
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="otp" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="cartype" />
        <Stack.Screen name="brandsearch" />
        <Stack.Screen name="cardetail" />
        <Stack.Screen name="select-distributor" />
        <Stack.Screen name="dealer-details" />
        <Stack.Screen name="add-ev-vehicle" />
        <Stack.Screen name="ev-network" />
        <Stack.Screen name="ev-station" />
        <Stack.Screen name="payment" />
        <Stack.Screen name="notification-preferences" />
        <Stack.Screen name="accessories" />
        <Stack.Screen name="accessory-list" />
        <Stack.Screen name="accessory-detail" />
        <Stack.Screen name="accessories-cart" />
        <Stack.Screen name="order-type" />
        <Stack.Screen name="order-summary" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
