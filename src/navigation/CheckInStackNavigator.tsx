import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetalhesCorridaCheckIn from '../pages/DetalhesCorridaCheckIn';
import RealizarCheckIn from '../pages/RealizarCheckIn';
import { TouchableOpacity } from 'react-native'; 
import {Ionicons} from '@expo/vector-icons';
import Checkin from '../tabs/Checkin';


const Stack = createStackNavigator();

function CheckInStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Checkin">
      <Stack.Screen 
        name="Checkin" 
        component={Checkin} 
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

export default CheckInStackNavigator;
