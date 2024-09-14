import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Tab = createNativeStackNavigator();


import Login from "./Login";
import Menu from "./Menu"


export default function Rotas(){
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Menu"
                    component={Menu}
                    options={{ headerShown: false }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )    
}