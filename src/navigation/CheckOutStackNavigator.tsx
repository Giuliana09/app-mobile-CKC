import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Checkout from '../tabs/Checkout';  
import DetalhesCorridaCheckOut from '../pages/DetalhesCorridaCheckOut';
import RealizarCheckOut from '../pages/RealizarCheckOut';
import CabecalhoTelasOpcoes from '../components/CabecalhoNavegacaoTelasOpcoes';


const Stack = createStackNavigator();

function CheckOutStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Checkout">
      <Stack.Screen 
        name="CheckoutScreen1" 
        component={Checkout} 
        options={({ navigation }) => CabecalhoTelasOpcoes(navigation)}    
      />
      <Stack.Screen 
      //Trocar para DetalhesCorridaCheckOut 
        name="DetalhesCorridaCheckOut" 
        component={DetalhesCorridaCheckOut} 
        options={({ navigation }) => CabecalhoTelasOpcoes(navigation)}  
      />
      <Stack.Screen 
      //Trocar para RealizarCheckout
        name="RealizarCheckOut" 
        component={RealizarCheckOut} 
        options={({ navigation }) => CabecalhoTelasOpcoes(navigation)}  
      />
    </Stack.Navigator>
  );
}

export default CheckOutStackNavigator;
