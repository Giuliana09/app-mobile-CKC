import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CabecalhoTelasOpcoes from '../components/CabecalhoNavegacaoTelasOpcoes';
import Sortear from '../tabs/Sortear';


const Stack = createStackNavigator();

function SortearStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Sortear">
      <Stack.Screen 
        name="SortearScreen1" 
        component={Sortear} 
        options={({ navigation }) => CabecalhoTelasOpcoes(navigation)}    
      />
    </Stack.Navigator>
  );
}

export default SortearStackNavigator;
