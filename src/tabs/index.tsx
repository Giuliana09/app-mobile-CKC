import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Menu from "./Menu";
import Sortear from "./Sortear";
import Checkin from "./Checkin";
import Checkout from "./Checkout";
import Perfil from "./Perfil";

const tabs = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName: string;

    switch (route.name) {
      case "Menu":
        iconName = "home-outline";
        break;
      case "Sortear":
        iconName = "refresh-circle-outline";
        break;
      case "Checkin":
        iconName = "log-in-outline";
        break;
      case "Checkout":
        iconName = "log-out-outline";
        break;
      case "Perfil":
        iconName = "person-outline";
        break;
      default:
        iconName = "ellipse-outline";
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarStyle: { backgroundColor: '#232121'}, 
  tabBarActiveTintColor: '#0033C1',
  tabBarInactiveTintColor: '#fff',
  tabBarShowLabel: false
});

export default function Tabs() {
  return (
    <tabs.Navigator screenOptions={screenOptions}>
      <tabs.Screen name="Menu" component={Menu} />
      <tabs.Screen name="Sortear" component={Sortear} />
      <tabs.Screen name="Checkin" component={Checkin} />
      <tabs.Screen name="Checkout" component={Checkout} />
      <tabs.Screen name="Perfil" component={Perfil} />
    </tabs.Navigator>
  );
}