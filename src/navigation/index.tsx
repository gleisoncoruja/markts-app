import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/Home";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TasksScreen } from "../screens/Tasks";

const Tab = createBottomTabNavigator();

export const TabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => {
        const screenInfo = {
          Home: {
            iconName: "home",
            title: "Home",
          },
          PendingList: {
            iconName: "list",
            title: "Tarefas",
          },
        }[route.name];
        return {
          tabBarIcon: ({ color, size }) => {
            const iconSize = 24;

            return (
              <Ionicons
                name={screenInfo?.iconName || "home"}
                size={iconSize}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "#1565c0",
          tabBarInactiveTintColor: "#757575",
          tabBarStyle: { height: 60, backgroundColor: "#f5f5f5" },
          tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
          tabBarLabel: screenInfo?.title,
          title: screenInfo?.title,
          headerShown: false,
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="PendingList" component={TasksScreen} />
    </Tab.Navigator>
  );
};
