import React, { useState } from "react";
import { VStack, Text, Image, Box, Input, Button, useToast } from "native-base";
import { Cabecalho } from "../../components/Cabecalho";
import { TEMAS } from "../../style/temas";
import logoCKC1 from "../../assets/logoCKC1.png";
import { StyleSheet } from "react-native";
import { notificacaoGeral } from "../../service/notificacaoGeral";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { navegarParaTelaComParametros } from "../../service/navegacao/navegacaoService";

type ParamList = {
  ListaDeKartsConfig: {
    qtdDePessoasComCheckIn: number;
    idCorrida: number;
  };
};

export default function ListaDeKartsConfig() {
  const [maiorNumeroDeKart, setMaiorNumeroDeKart] = useState<string>("");
  const route = useRoute<RouteProp<ParamList, 'ListaDeKartsConfig'>>();
  const { qtdDePessoasComCheckIn, idCorrida } = route.params;
  const toast = useToast();
  const navigation = useNavigation();

  const handleContinuar = () => {
    const numero = parseInt(maiorNumeroDeKart, 10);


    if (isNaN(numero) || numero <= 0 || numero < qtdDePessoasComCheckIn) {
      const mensagem = numero < qtdDePessoasComCheckIn ? `É preciso passar um número maior do que a quantidade de pessoas [${qtdDePessoasComCheckIn}] para fazer o sorteio` : "É preciso passar um número válido para o sorteio"
      const notificacao = notificacaoGeral(400, "Erro no Sorteio", mensagem);
      toast.show({
        title: notificacao.title,
        description: notificacao.details,
        backgroundColor: notificacao.background,
      });
      return;
    }

    // Navegar para a próxima tela passando o maiorNumeroDeKart e o idCorrida
    navegarParaTelaComParametros(navigation, 'SortearStack', 'ListaDeKartsSelecionar', {
      maiorNumeroDeKart: numero,
      idCorrida: idCorrida,
      qtdDePessoasComCheckIn: qtdDePessoasComCheckIn
    });
  };

  return (
    <VStack flex={1} style={styles.view}>
      <Cabecalho key="cabecalho">
        <Image source={logoCKC1} alt="Logo CKC" width={40} resizeMode="contain" />
      </Cabecalho>

      <Text style={styles.titulo}>Lista de Karts</Text>
      <Text style={styles.subtitulo}>Pilotos com Check-in feito [{qtdDePessoasComCheckIn}]</Text>
      <Text style={styles.texto}>Digite abaixo o maior número dos karts reservados para a corrida:</Text>

      {/* Card para o maior número de kart */}
      <Box style={styles.card}>
        <Text style={styles.subtitulo}>Kart de maior número:</Text>
        <Input
          placeholder="Digite o maior número"
          value={maiorNumeroDeKart}
          onChangeText={setMaiorNumeroDeKart}
          keyboardType="numeric"
          style={styles.input}
        />
      </Box>

      <Button onPress={handleContinuar} style={styles.botao}>
        Selecionar Karts
      </Button>
    </VStack>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: TEMAS.colors.gray[300],
  },
  titulo: {
    marginTop: 80,
    fontSize: TEMAS.fontSizes.lg,
    fontFamily: TEMAS.fonts['petch_Bold'],
    textAlign: 'center',
  },
  texto: {
    marginTop: 10,
    fontSize: TEMAS.fontSizes.sm,
    textAlign: 'center',
    padding: 20
  },
  card: {
    backgroundColor: TEMAS.colors.white,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  subtitulo: {
    fontSize: TEMAS.fontSizes.md,
    fontFamily: TEMAS.fonts['petch_Bold'],
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    backgroundColor: TEMAS.colors.gray[200],
    borderRadius: 10,
    padding: 10,
  },
  botao: {
    marginTop: 20,
    backgroundColor: TEMAS.colors.blue[500],
    borderRadius: 10,
    width: '60%',
    alignSelf: 'center',
  },
});
