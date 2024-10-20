import React from "react";
import { VStack, Text } from "native-base";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

type ParamList = {
  ConfirmarSorteio: {
    idCorrida: number,
    qtdDePessoasSorteadas: number,
    qtdDePessoasComCheckIn: number
  };
};

export default function ConfirmarSorteio() {

  const route = useRoute<RouteProp<ParamList, 'ConfirmarSorteio'>>();
  const navigation = useNavigation();

  const {idCorrida, qtdDePessoasSorteadas , qtdDePessoasComCheckIn } = route.params;

  return (
    <VStack>
      <Text>Exibir o Card da Corrida, qtd de Pilotos total e qtd de sorteados, além de pedir confirmação do sorteio.</Text>
      <Text>Id da Corrida: {idCorrida}</Text>
      <Text>Qtd de Pessoas Sorteadas: {qtdDePessoasSorteadas}</Text>
      <Text>Qtd de Pessoas Total: {qtdDePessoasComCheckIn}</Text>
    </VStack>
  );
}