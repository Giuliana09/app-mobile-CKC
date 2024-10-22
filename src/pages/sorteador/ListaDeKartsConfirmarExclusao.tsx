import React from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { VStack, Text, Image, Button, FlatList, Box } from "native-base";
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
    <VStack flex={1} style={styles.view}>
      <VStack>
            <Cabecalho key="cabecalho">
              <Image source={logoCKC1} alt="Logo CKC" width={40} resizeMode="contain" style={styles.logo} />
            </Cabecalho>
            <Text style={styles.titulo}>Lista de Karts</Text>
            <Text style={styles.subtitulo}>Pilotos com Check-in feito [{qtdDePessoasComCheckIn}]</Text>
            <Text style={styles.texto}>Estes são os números selecionados para retirar do sorteio:</Text>
          </VStack>
      <FlatList
        data={numerosForaDoSorteio.sort()}
        keyExtractor={(item) => item.toString()}
        numColumns={3}
        initialNumToRender={8}
        maxToRenderPerBatch={4}
        contentContainerStyle={styles.contentContainerStyle}
        windowSize={10}
        renderItem={({ item }) => (
          <Box style={styles.numerosDeKartContainer}>
            <Box style={styles.numeroKartBotao}>
              <Text style={styles.kartText}>{`${item}`}</Text>
            </Box>
          </Box>
        )}
        ListEmptyComponent={
          <Text style={styles.subtitulo}>Nenhum número foi retirado do sorteio.</Text>
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
    </VStack>
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
    fontSize: TEMAS.fontSizes.md,
    fontFamily: TEMAS.fonts['petch_Bold'],
    marginBottom: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  texto: {
    marginTop: 10,
    fontSize: TEMAS.fontSizes.sm,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  numerosDeKartContainer: {
    padding: 20,
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
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  botao: {
    marginTop: 20,
    backgroundColor: TEMAS.colors.blue[500],
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  botaoRecusar: {
    marginTop: 5,
    backgroundColor: TEMAS.colors.gray[500],
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
  },
});
