import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetalhesCorridaCheckIn from '../pages/DetalhesCorridaCheckIn';
import RealizarCheckIn from '../pages/RealizarCheckIn';
import Checkin from '../tabs/Checkin';
import CabecalhoTelasOpcoes from '../components/CabecalhoNavegacaoTelasOpcoes';
import ConfirmacaoCheckIN from '../pages/ConfirmacaoCkeckIN';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

function CheckInStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Checkin">
      <Stack.Screen 
        name="CheckinScreen1" 
        component={Checkin} 
        options={({ navigation }) => CabecalhoTelasOpcoes({ navigation })}    
      />
      <Stack.Screen 
        name="DetalhesCorridaCheckIn" 
        component={DetalhesCorridaCheckIn} 
        options={({ navigation }) => ({
          title: '',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('CheckinScreen1')}>
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
        options={({ navigation }) => CabecalhoTelasOpcoes({ navigation })}  
        />
      <Stack.Screen 
        name="ConfirmacaoCheckIN" 
        component={ConfirmacaoCheckIN} 
        options={({ navigation }) => CabecalhoTelasOpcoes({ navigation })}  
      />
    </Stack.Navigator>
  );
}

export default CheckInStackNavigator;
