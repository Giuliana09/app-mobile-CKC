import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {NativeBaseProvider, StatusBar} from 'native-base';
import { useLoadFonts } from './src/hooks/useLoadFonts';
import { TEMAS } from './src/style/temas';
import Rotas from './src/navigation/Rotas';
import Login from './src/Login';

const Stack = createStackNavigator();

export default function App() {

  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null;  
  }  

  return (
    <NativeBaseProvider theme={TEMAS}>
        <StatusBar backgroundColor={TEMAS.colors.black[300]} />
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen 
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Menu"
              component={Rotas}
              options={{headerShown: false}}
            />
          </Stack.Navigator>      
        </NavigationContainer>
    </NativeBaseProvider>
  );
}
