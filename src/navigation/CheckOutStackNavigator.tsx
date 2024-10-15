import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Checkout from '../tabs/Checkout';  
import DetalhesCorridaCheckIn from '../pages/DetalhesCorridaCheckIn';
import RealizarCheckIn from '../pages/RealizarCheckIn';
import { TouchableOpacity } from 'react-native'; 
import {Ionicons} from '@expo/vector-icons';


const Stack = createStackNavigator();

function CheckOutStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Checkout">
      <Stack.Screen 
        name="Checkout" 
        component={Checkout} 
        options={({ navigation }) => ({
          headerShown: true, 
          title: '', 
          headerTransparent: true, 
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
              <Ionicons name="arrow-back" size={24} color="white" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: 'black',
          },
        })}   
      />
      <Stack.Screen 
      //Trocar para DetalhesCorridaCheckOut 
        name="DetalhesCorridaCheckIn" 
        component={DetalhesCorridaCheckIn} 
        options={({ navigation }) => ({
          headerShown: true, 
          title: '', 
          //Quando colocar o Cabeçalho ativar essa propriedade = headerTransparent: true, 
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
              <Ionicons name="arrow-back" size={24} color="white" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: 'black',
          },
        })} 
      />
      <Stack.Screen 
      //Trocar para RealizarCheckout
        name="RealizarCheckIn" 
        component={RealizarCheckIn} 
        options={({ navigation }) => ({
          headerShown: true, 
          title: '', 
          //Quando colocar o Cabeçalho ativar essa propriedade = headerTransparent: true, 
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="white" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: 'black',
          },
        })} 
      />
    </Stack.Navigator>
  );
}

export default CheckOutStackNavigator;
