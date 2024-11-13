import React from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { VStack, Text, Image, Button, FlatList, Box, ScrollView } from "native-base";
import { TEMAS } from "../../style/temas";
import logoCKC1 from "../../assets/logoCKC1.png";
import { StyleSheet } from "react-native";
import { Cabecalho } from "../../components/Cabecalho";
import { navegarParaTelaComParametros } from "../../service/navegacao/navegacaoService";

type ParamList = {
  ListaDeKartsConfirmarExclusao: {
    numerosForaDoSorteio: number[];
    maiorNumeroDeKart: number;
    idCorrida: number;
    qtdDePessoasComCheckIn: number;
  };
};

export default function ListaDeKartsConfirmarExclusao() {
  const route = useRoute<RouteProp<ParamList, 'ListaDeKartsConfirmarExclusao'>>();
  const navigation = useNavigation();

  const { numerosForaDoSorteio, maiorNumeroDeKart, idCorrida, qtdDePessoasComCheckIn } = route.params;

  const handleConfirmar = () => {
    navegarParaTelaComParametros(navigation, 'SortearStack', 'NomesDosPilotosSorteio', {
      numerosForaDoSorteio: numerosForaDoSorteio,
      maiorNumeroDeKart: maiorNumeroDeKart,
      idCorrida: idCorrida,
      qtdDePessoasComCheckIn: qtdDePessoasComCheckIn,
    });
  };

  const handleVoltar = () => {
    navigation.goBack();
  };

  return (
    <FlatList
      style={styles.view}
      ListHeaderComponent={
        <VStack>
            <Cabecalho key="cabecalho">
              <Image source={logoCKC1} alt="Logo CKC" width={40} resizeMode="contain" style={styles.logo} />
            </Cabecalho>
            <Text style={styles.titulo}>Lista de Karts</Text>
            <Text style={styles.subtitulo}>Pilotos com Check-in feito [{qtdDePessoasComCheckIn}]</Text>
            <Text style={styles.texto}>Estes são os números selecionados para <Text style={{fontFamily:TEMAS.fonts['petch_Bold']}}>retirar</Text> do sorteio:</Text>
        </VStack>
      }
      data={numerosForaDoSorteio.sort((a, b) => a - b)}
      keyExtractor={(item) => `${item}-${Math.random().toString(36).substr(2, 9)}`}
      numColumns={3}
      initialNumToRender={8}
      maxToRenderPerBatch={4}
      windowSize={10}
      renderItem={({ item }) => (
        <Box style={styles.numerosDeKartContainer}>
          <Box style={styles.numeroKartBotao}>
            <Text id={`${item}-${Math.random().toString(36).substr(2, 9)}`} style={styles.kartText}>{`${item}`}</Text>
          </Box>
        </Box>
      )}   
      ListEmptyComponent={
        <Text style={styles.subtitulo2}>Nenhum número foi retirado do sorteio.</Text>
      }
      ListFooterComponent={
        <VStack>
          <Text style={styles.subtitulo}>Deseja confirmar?</Text>
            <Button style={styles.botao} onPress={handleConfirmar} colorScheme="blue" mt={4}>
              Sim
            </Button>
            <Button style={styles.botaoRecusar} onPress={handleVoltar} colorScheme="gray" mt={2}>
              Não
            </Button>
        </VStack>
      }
    />
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: TEMAS.colors.gray[300],
  },
  logo: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  titulo: {
    marginTop: 60,
    fontSize: TEMAS.fontSizes.lg,
    fontFamily: TEMAS.fonts['petch_Bold'],
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: TEMAS.fontSizes.lg,
    fontFamily: TEMAS.fonts['petch_Bold'],
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  subtitulo2: {
    fontSize: TEMAS.fontSizes.lg,
    fontFamily: TEMAS.fonts['petch_Bold'],
    marginVertical: 40,
    textAlign: 'center',
  },
  texto: {
    marginHorizontal: 10,
    fontSize: TEMAS.fontSizes.md,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  numerosDeKartContainer: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },
  numeroKartBotao: {
    backgroundColor: TEMAS.colors.red[500],
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kartText: {
    color: TEMAS.colors.white,
    fontSize: TEMAS.fontSizes.lg,
    fontFamily: TEMAS.fonts['petch_Bold'],
  },

  botao: {
    marginTop: 20,
    backgroundColor: TEMAS.colors.green[200],
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  botaoRecusar: {
    marginTop: 5,
    backgroundColor: TEMAS.colors.black[300],
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
  },
});
