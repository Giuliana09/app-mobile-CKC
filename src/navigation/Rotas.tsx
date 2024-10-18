import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Menu from '../tabs/Menu';
import Perfil from '../tabs/Perfil';

import {Ionicons} from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import CheckOutStackNavigator from './CheckOutStackNavigator';
import CheckInStackNavigator from './CheckInStackNavigator';
import SortearStackNavigator from './SortearStackNavigator';

const Tab = createBottomTabNavigator();

function Rotas() {
  return (
    <Tab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#0033C1',
            tabBarInactiveTintColor: '#fff',
            tabBarStyle: {
                backgroundColor: '#232121',
                borderTopWidth: 0,
                height: 60,
            },
        }}>
        <Tab.Screen
            name="MenuTela"
            component={Menu}
            options={{
                headerShown: false,
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="home-outline" size={size} color={color}/>
                ),
            }}
        />
        <Tab.Screen
            name="CheckInStack"
            component={CheckInStackNavigator}
            options={{
                headerShown: false,
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="checkmark-circle-outline" size={size} color={color}/>
                ),
            }}
        />
        <Tab.Screen
            name="SortearStack"
            component={SortearStackNavigator}
            options={{
                headerShown: false,
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="clover" size={size} color={color} />
                ),
            }}
        />
        <Tab.Screen 
            name="CheckOutStack" 
            component={CheckOutStackNavigator} 
            options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <Entypo name="log-out" size={size} color={color} />  
            ),
            }}
        />
        <Tab.Screen
            name="Perfil" 
            component={Perfil}
            options={{
                headerShown: false,
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="person-outline" size={size} color={color}/>  
                ),
            }}
        />
    </Tab.Navigator>
  );
}

export default Rotas;

