import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { CartProvider } from "../context/CartContext";
import { OrderProvider } from "../context/OrderContext";
import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Adding a delay so you can verify the splash screen is working.
    // You can remove this setTimeout once you've confirmed it looks correct.
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <OrderProvider>
      <CartProvider>
        <Stack
          screenOptions={{ headerShown: false }}
          initialRouteName="sign-in"
        >
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
          <Stack.Screen name="accessories-search" />
          <Stack.Screen name="accessory-list" />
          <Stack.Screen name="accessory-detail" />
          <Stack.Screen name="accessories-cart" />
          <Stack.Screen name="order-type" />
          <Stack.Screen name="order-summary" />
          <Stack.Screen name="referral" />
        </Stack>
        <StatusBar style="auto" />
      </CartProvider>
    </OrderProvider>
  );
}
