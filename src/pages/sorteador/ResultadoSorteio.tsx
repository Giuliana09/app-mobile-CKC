import React, { useEffect, useState } from "react";
import { VStack, Text, Image, Box, Button, HStack, FlatList, Spinner } from "native-base";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { TEMAS } from "../../style/temas";
import { StyleSheet } from "react-native";
import { Cabecalho } from "../../components/Cabecalho";
import logoCKC1 from "../../assets/logoCKC1.png";
import { navegarParaTelaComParametros } from "../../service/navegacao/navegacaoService";

type ParamList = {
  ResultadoSorteio: {
    idCorrida: number,
    maiorNumeroDeKart: number,
    numerosForaDoSorteio: number[],
    qtdDePessoasComCheckIn: number
    dadosSorteio: { nome: string; sobrenome: string; numero_do_kart: number }[];
  };
};

export default function ResultadoSorteio() {
  const route = useRoute<RouteProp<ParamList, 'ResultadoSorteio'>>();
  const navigation = useNavigation();
  const { idCorrida, dadosSorteio, maiorNumeroDeKart, numerosForaDoSorteio, qtdDePessoasComCheckIn } = route.params;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  const handleFinalizar = () => {
    navegarParaTelaComParametros(navigation, 'SortearStack', 'ConfirmacaoSorteio', {
      idCorrida: idCorrida,
      maiorNumeroDeKart: maiorNumeroDeKart,
      numerosForaDoSorteio: numerosForaDoSorteio,
      qtdDePessoasComCheckIn: qtdDePessoasComCheckIn
    });
  };

  return (
    <VStack flex={1} style={styles.view}>
      <Cabecalho key="cabecalho">
        <Image source={logoCKC1} alt="Logo CKC" width={40} resizeMode="contain" />
      </Cabecalho>

      <Text style={styles.titulo}>Resultados do Sorteio</Text>

      {loading ? (
        <Spinner color={TEMAS.colors.blue[500]} mt={10} size="xl" />
      ) : (
        <FlatList
          data={dadosSorteio}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <HStack key={index}>
              <Box style={styles.card_nomePiloto}>
                <Text style={styles.texto_destaque}>Piloto {index + 1}</Text>
                <Text>{`${item.nome} ${item.sobrenome}`}</Text>
              </Box>
              <Box style={styles.card_kart}>
                <Text style={styles.texto_destaque}>Kart</Text>
                <Text fontSize="md">{item.numero_do_kart}</Text>
              </Box>
            </HStack>
          )}
          ListFooterComponent={
            <Button style={styles.botao} onPress={handleFinalizar}>
              Finalizar Sorteio
            </Button>
          }
        />
      )}
    </VStack>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: TEMAS.colors.gray[300],
  },
  titulo: {
    marginTop: -20,
    alignSelf: 'center',
    color: TEMAS.colors.white, 
    fontSize: TEMAS.fontSizes.lg,
    fontFamily: TEMAS.fonts['petch_Bold'],
  },
  texto_destaque: {
    fontFamily: TEMAS.fonts['petch_Bold'],
  },
  card_nomePiloto: {
    flexDirection: "column",
    backgroundColor: TEMAS.colors.white,
    marginHorizontal: 20,
    marginVertical: 12,
    width: 240,
    padding: 10,
    borderRadius: 10,
  },
  card_kart: {
    flexDirection: "column",
    backgroundColor: TEMAS.colors.white,
    marginVertical: 12,
    width: 100,
    padding: 10,
    borderRadius: 10,
  },
  botao: {
    marginTop: 20,
    backgroundColor: TEMAS.colors.blue[500],
    borderRadius: 10,
    width: '60%',
    alignSelf: 'center',
    marginBottom: 20,
  },
});
