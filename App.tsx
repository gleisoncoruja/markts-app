import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { TabsNavigator } from "./src/navigation";
import {
  useFonts,
  Jost_600SemiBold,
  Jost_500Medium,
  Jost_400Regular,
} from "@expo-google-fonts/jost";

export default function App() {
  const [fontsLoaded] = useFonts({
    JostSemiBold: Jost_600SemiBold,
    JostMedium: Jost_500Medium,
    JostRegular: Jost_400Regular,
  });

  if (!fontsLoaded) {
    return null; // ou renderize algo enquanto a fonte está sendo carregada
  }
  return (
    <NavigationContainer>
      <StatusBar translucent={false} backgroundColor={"#646FD4"} />
      <TabsNavigator />
    </NavigationContainer>
  );
}
