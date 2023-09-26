import { NavigationContainer } from "@react-navigation/native";
import { TabsNavigator } from "./src/navigation";

export default function App() {
  return (
    <NavigationContainer>
      <TabsNavigator />
    </NavigationContainer>
  );
}
