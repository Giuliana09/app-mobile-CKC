import React from "react";
import { VStack, Text, useToast } from "native-base";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";


type ParamList = {
  ExibirSorteio: {
    numerosForaDoSorteio: number[];
    maiorNumeroDeKart: number;
    idCorrida: number;
  };
};

export default function ExibirSorteio() {
  const route = useRoute<RouteProp<ParamList, 'ExibirSorteio'>>();
  const toast = useToast();
  const navigation = useNavigation();

  const { numerosForaDoSorteio, maiorNumeroDeKart, idCorrida } = route.params;

  return (
    <VStack>
        <Text>Exibir a saida do Sorteio de Cada piloto por vez.</Text>
        <Text>{`Id da Corrida: ${idCorrida}`}</Text>
        <Text>{`Números fora do Sorteio: ${numerosForaDoSorteio}`}</Text>
        <Text>{`Maior número de Kart: ${maiorNumeroDeKart}`}</Text>
    </VStack>
  );
}

