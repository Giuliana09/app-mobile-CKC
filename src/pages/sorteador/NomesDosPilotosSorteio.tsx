import React, { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { VStack, Text, Image, Button, FlatList, Box, useToast } from "native-base";
import { TEMAS } from "../../style/temas";
import logoCKC1 from "../../assets/logoCKC1.png";
import { StyleSheet } from "react-native";
import { Cabecalho } from "../../components/Cabecalho";
import { navegarParaTelaComParametros } from "../../service/navegacao/navegacaoService";
import { listarDadosDePilotosQueParticiparaoDoSorteio } from "../../service/sorteador/sorteadorService";
import { notificacaoGeral } from "../../service/notificacaoGeral";

type ParamList = {
  NomesDosPilotosSorteio: {
    numerosForaDoSorteio: number[];
    maiorNumeroDeKart: number;
    idCorrida: number;
    qtdDePessoasComCheckIn: number;
  };
};

export default function NomesDosPilotosSorteio() {
  const route = useRoute<RouteProp<ParamList, 'NomesDosPilotosSorteio'>>();
  const toast = useToast();
  const navigation = useNavigation();
  const [dadosPilotos, setDadosPilotos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { numerosForaDoSorteio, maiorNumeroDeKart, idCorrida, qtdDePessoasComCheckIn } = route.params;

  useEffect(() => {
    fetchPilotos();
  }, []);

  const fetchPilotos = async () => {
    const response = await listarDadosDePilotosQueParticiparaoDoSorteio(idCorrida);
    try {
      if (response.status === 200) {
        setDadosPilotos(response.dados.content);
        setLoading(false);
      }
    } catch (error) {
      setError(response.details);
      const notificacao = notificacaoGeral(response.status, response.title, response.details);

      toast.show({
        title: notificacao.title,
        description: notificacao.details,
        backgroundColor: notificacao.background,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmar = () => {
    navegarParaTelaComParametros(navigation, 'SortearStack', 'ExibirSorteio', {
      numerosForaDoSorteio: numerosForaDoSorteio,
      maiorNumeroDeKart: maiorNumeroDeKart,
      idCorrida: idCorrida,
      qtdDePessoasComCheckIn: qtdDePessoasComCheckIn,
    });
  };

  return (
    <VStack style={styles.view}>
      <FlatList
        ListHeaderComponent={
          <VStack>
            <Cabecalho key="cabecalho">
              <Image source={logoCKC1} alt="Logo CKC" width={40} resizeMode="contain" style={styles.logo} />
            </Cabecalho>
            <Text style={styles.titulo}>Nome dos Pilotos</Text>
            <Text style={styles.texto}>Lista de nomes dos pilotos que irão participar da corrida:</Text>
            {loading && <Text style={styles.texto}>Carregando...</Text>}
          </VStack>
        }
        data={dadosPilotos}
        keyExtractor={(item) => `${item.nome}-${Math.random().toString(36).substr(2, 9)}`}
        renderItem={({ item, index }) => (
          <Box style={styles.containerPilotos} key={`${item.nome}-${item.sobrenome}-${Math.random()}`}>
            <Text style={styles.card_titulo}>Piloto {index + 1}</Text>
            <Text>{item.nome} {item.sobrenome}</Text>
          </Box>
        )}
        ListEmptyComponent={
          !loading && dadosPilotos.length === 0 ? (
            <Text style={styles.subtitulo}>Nenhum piloto foi encontrado.</Text>
          ) : null
        }
        contentContainerStyle={styles.contentContainerStyle}
      />
      <VStack>
          <Button style={styles.botao} onPress={handleConfirmar} colorScheme="blue" mt={4}>
            Sortear
          </Button>
      </VStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: TEMAS.colors.gray[300],
  },
  containerPilotos: {
    backgroundColor: TEMAS.colors.white,
    borderRadius: 8,
    width: '85%',
    flexDirection: 'column',
    alignItems: "flex-start",
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  logo: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  titulo: {
    marginTop: 60,
    marginBottom: 20,
    fontSize: TEMAS.fontSizes.lg,
    fontFamily: TEMAS.fonts['petch_Bold'],
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: TEMAS.fontSizes.lg,
    fontFamily: TEMAS.fonts['petch_Bold'],
    marginBottom: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  texto: {
    marginHorizontal: 10,
    fontSize: TEMAS.fontSizes.md,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  card_titulo: {
    fontSize: TEMAS.fontSizes.md,
    fontFamily: TEMAS.fonts['petch_semiBold'],
  },
  botao: {
    marginTop: 20,
    backgroundColor: TEMAS.colors.blue[500],
    borderRadius: 10,
    width: '60%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
});
