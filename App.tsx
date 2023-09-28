import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { TabsNavigator } from "./src/navigation";
import {
  useFonts,
  Jost_600SemiBold,
  Jost_500Medium,
  Jost_400Regular,
} from "@expo-google-fonts/jost";
import { openDataBase } from "./src/db";
import Toast from "react-native-toast-message";

export default function App() {
  const [fontsLoaded] = useFonts({
    JostSemiBold: Jost_600SemiBold,
    JostMedium: Jost_500Medium,
    JostRegular: Jost_400Regular,
  });

  useEffect(() => {
    openDataBase();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar translucent={false} backgroundColor={"#646FD4"} />
      <TabsNavigator />
      <Toast />
    </NavigationContainer>
  );
}
