import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CabecalhoTelasOpcoes from '../components/CabecalhoNavegacaoTelasOpcoes';
import Sortear from '../tabs/Sortear';
import ListaDeKartsConfig from '../pages/sorteador/ListaDeKartsConfig';
import ListaDeKartsSelecionar from '../pages/sorteador/ListaDeKartsSelecionar';
import ListaDeKartsConfirmarExclusao from '../pages/sorteador/ListaDeKartsConfirmarExclusao';
import NomesDosPilotosSorteio from '../pages/sorteador/NomesDosPilotosSorteio';
import ExibirSorteio from '../pages/sorteador/ExibirSorteio';
import ConfirmarSorteio from '../pages/sorteador/ConfirmarSorteio';
import ResultadoSorteio from '../pages/sorteador/ResultadoSorteio';
import ConfirmacaoSorteio from '../pages/ConfirmacaoSorteio';

const Stack = createStackNavigator();

function SortearStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Sortear">
      <Stack.Screen
        name="SortearScreen1"
        component={Sortear}
        options={({ navigation }) => CabecalhoTelasOpcoes({ navigation })}
      />
      <Stack.Screen
        name="ListaDeKartsConfig"
        component={ListaDeKartsConfig}
        options={({ navigation }) => CabecalhoTelasOpcoes({ navigation })}
      />
      <Stack.Screen
        name="ListaDeKartsSelecionar"
        component={ListaDeKartsSelecionar}
        options={({ navigation }) => CabecalhoTelasOpcoes({ navigation })}
      />
      <Stack.Screen
        name="ListaDeKartsConfirmarExclusao"
        component={ListaDeKartsConfirmarExclusao}
        options={({ navigation }) => CabecalhoTelasOpcoes({ navigation })}
      />
      <Stack.Screen
        name="NomesDosPilotosSorteio"
        component={NomesDosPilotosSorteio}
        options={({ navigation }) => CabecalhoTelasOpcoes({ navigation })}
      />
      <Stack.Screen
        name="ExibirSorteio"
        component={ExibirSorteio}
        options={({ navigation }) => CabecalhoTelasOpcoes({ navigation })}
      />
      <Stack.Screen
        name="ConfirmarSorteio"
        component={ConfirmarSorteio}
        options={({ navigation }) => CabecalhoTelasOpcoes({ navigation })}
      />
      <Stack.Screen
        name="ResultadoSorteio"
        component={ResultadoSorteio}
        options={({ navigation }) => CabecalhoTelasOpcoes({ navigation })}
      />
      <Stack.Screen
        name="ConfirmacaoSorteio"
        component={ConfirmacaoSorteio}
        options={({ navigation }) => CabecalhoTelasOpcoes({ navigation })}
      />
    </Stack.Navigator>
  );
}

export default SortearStackNavigator;
