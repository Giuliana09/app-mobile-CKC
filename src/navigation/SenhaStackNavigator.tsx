import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EsqueciSenha from '../pages/EsqueciSenha';
import CabecalhoTelasOpcoes from '../components/CabecalhoNavegacaoTelasOpcoes';
import EsqueciSenhaCodigo from '../pages/EsqueciSenhaCodigo';


const Stack = createStackNavigator();

function SenhaStackNavigator(){

    return(
        <Stack.Navigator initialRouteName="EsqueciSenha">
            <Stack.Screen 
                name="EsqueciSenha" 
                component={EsqueciSenha} 
                options={({ navigation }) => CabecalhoTelasOpcoes({ navigation })}    
            />
            <Stack.Screen 
                name="EsqueciSenhaCodigo" 
                component={EsqueciSenhaCodigo} 
                options={({ navigation }) => CabecalhoTelasOpcoes({ navigation })}    
            />
       </Stack.Navigator>
    );
}

export default SenhaStackNavigator;