import React, { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { VStack, Text, Image, Button, FlatList, Box, useToast } from "native-base";
import { TEMAS } from "../../style/temas";
import logoCKC1 from "../../assets/logoCKC1.png";
import { Dimensions, StyleSheet } from "react-native";
import { Cabecalho } from "../../components/Cabecalho";
import { navegarParaTelaComParametros } from "../../service/navegacao/navegacaoService";
import { listarDadosDePilotosQueParticiparaoDoSorteio } from "../../service/sorteador/sorteadorService";
import { notificacaoGeral } from "../../service/notificacaoGeral";


type ParamList = {
  NomesDosPilotosSorteio: {
    numerosForaDoSorteio: number[];
    maiorNumeroDeKart: number;
    idCorrida: number;
  };
};

const { width } = Dimensions.get("window");

export default function NomesDosPilotosSorteio() {
  const route = useRoute<RouteProp<ParamList, 'NomesDosPilotosSorteio'>>();
  const toast = useToast();
  const navigation = useNavigation();
  const [dadosPilotos, setDadosPilotos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  const { numerosForaDoSorteio, maiorNumeroDeKart, idCorrida } = route.params;

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
    });
  };

  return (
    <VStack flex={1} style={styles.view}>
      <FlatList
        ListHeaderComponent={
          <VStack>
            <Cabecalho key="cabecalho">
              <Image source={logoCKC1} alt="Logo CKC" width={40} resizeMode="contain" style={styles.logo} />
            </Cabecalho>
            <Text style={styles.titulo}>Nome dos Pilotos</Text>
            <Text style={styles.texto}>
              {loading ? "Carregando..." : "Lista de nomes dos pilotos que irão participar da corrida:"}
            </Text>
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
        ListFooterComponent={
          <VStack>
            <Button style={styles.botao} onPress={handleConfirmar} colorScheme="blue" mt={4}>
              Sortear
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

  containerPilotos: {
    backgroundColor: TEMAS.colors.white,
    borderRadius: 8,
    width: width * 0.85,
    flexDirection: 'column',
    alignItems: "flex-start",
    padding: 10,
    margin: 10,
    marginLeft: 30 // Migreragem pra tentar centralizar ^^
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
  card_itens: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: TEMAS.colors.white,
    borderRadius: 8,
    shadowColor: TEMAS.colors.gray[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: width * 0.85,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  card_titulo: {
    fontSize: TEMAS.fontSizes.md,
    fontFamily: TEMAS.fonts['petch_semiBold'],
  },
  botao: {
    marginTop: 20,
    backgroundColor: TEMAS.colors.blue[500],
    borderRadius: 10,
    width: width * 0.6,
    alignSelf: 'center',
    marginBottom: 20,
  },
});