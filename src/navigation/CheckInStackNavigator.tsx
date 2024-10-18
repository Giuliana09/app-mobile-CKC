import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetalhesCorridaCheckIn from '../pages/DetalhesCorridaCheckIn';
import RealizarCheckIn from '../pages/RealizarCheckIn';
import Checkin from '../tabs/Checkin';
import CabecalhoTelasOpcoes from '../components/CabecalhoNavegacaoTelasOpcoes';


const Stack = createStackNavigator();

function CheckInStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Checkin">
      <Stack.Screen 
        name="CheckinScreen1" 
        component={Checkin} 
        options={({ navigation }) => CabecalhoTelasOpcoes(navigation)}    
      />
      <Stack.Screen 
        name="DetalhesCorridaCheckIn" 
        component={DetalhesCorridaCheckIn} 
        options={({ navigation }) => CabecalhoTelasOpcoes(navigation)}  
      />
      <Stack.Screen 
        name="RealizarCheckIn" 
        component={RealizarCheckIn} 
        options={({ navigation }) => CabecalhoTelasOpcoes(navigation)}  
      />
    </Stack.Navigator>
  );
}

export default CheckInStackNavigator;
