import React, { useEffect, useState } from "react";
import { VStack, Text, Image, Spinner, useToast, Box, Button } from "native-base";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { TEMAS } from "../../style/temas";
import { Alert, StyleSheet } from "react-native";
import { Cabecalho } from "../../components/Cabecalho";
import logoCKC1 from "../../assets/logoCKC1.png";
import largada from "../../assets/largada.png";
import { consultarCorrida, formatarDataCorrida } from "../../service/corrida/corridaService";
import { notificacaoGeral } from "../../service/notificacaoGeral";
import CategoriasDeCorridas from "../../components/CategoriasDeCorridas";
import Ionicons from "react-native-vector-icons/Ionicons";
import { EstilosCategoria } from "../../components/CategoriasDeCorridas";
import { navegarParaTelaComParametros } from "../../service/navegacao/navegacaoService";

type ParamList = {
  ConfirmarSorteio: {
    idCorrida: number,
    maiorNumeroDeKart: number,
    numerosForaDoSorteio: number[],
    dadosSorteio: any[],
    qtdDePessoasSorteadas: number,
    qtdDePessoasComCheckIn: number
  };
};

type Corrida = {
  id: number,
  campeonato: { id: number, nome: string },
  nome: string,
  data: string,
  horario: string,
  classificacao: EstilosCategoria,
};

export default function ConfirmarSorteio() {
  const route = useRoute<RouteProp<ParamList, 'ConfirmarSorteio'>>();
  const navigation = useNavigation();
  const { idCorrida, maiorNumeroDeKart, numerosForaDoSorteio, dadosSorteio, qtdDePessoasSorteadas, qtdDePessoasComCheckIn } = route.params;

  const [loading, setLoading] = useState(true);
  const [corrida, setCorrida] = useState<Corrida | null>(null);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      const resultado = await consultarCorrida(idCorrida);
      const notificacao = notificacaoGeral(resultado.status, resultado.title, resultado.details);

      if (resultado.status === 200) {
        setCorrida(resultado.corrida);
        setError(null);
      } else {
        setError(resultado.details);

        toast.show({
          title: notificacao.title,
          description: notificacao.details,
          backgroundColor: notificacao.background,
        });
      }
      setLoading(false);
    }

    fetchData();
  }, [idCorrida]);

  const handleConfirmar = () => {
    navegarParaTelaComParametros(navigation, 'SortearStack', 'ResultadoSorteio', {
      dadosSorteio: dadosSorteio,
      idCorrida: idCorrida,
      numerosForaDoSorteio: numerosForaDoSorteio,
      maiorNumeroDeKart: maiorNumeroDeKart,
      qtdDePessoasComCheckIn: qtdDePessoasComCheckIn,
    });
  };

  const handleSortearNovamente = () => {
    Alert.alert(
        "Confirmação",
        "Lembre-se: ao sortear novamente, TODOS OS NÚMEROS serão sorteados outra vez. Deseja continuar?",
        [
            {
                text: "Cancelar",
                style: "cancel",
            },
            {
                text: "Continuar",
                onPress: () => {
                    navegarParaTelaComParametros(navigation, 'SortearStack', 'ListaDeKartsConfirmarExclusao', {
                        numerosForaDoSorteio: numerosForaDoSorteio,
                        maiorNumeroDeKart: maiorNumeroDeKart,
                        idCorrida: idCorrida,
                        qtdDePessoasComCheckIn: qtdDePessoasComCheckIn,
                    });
                },
            },
        ],
        { cancelable: false } 
    );
};

  return (
    <VStack flex={1} style={styles.view}>
      <Cabecalho key="cabecalho">
        <Image source={logoCKC1} alt="Logo CKC" width={40} resizeMode="contain" />
      </Cabecalho>

      <Text style={styles.titulo}>Karts e Pilotos sorteados:</Text>

      {loading ? (
        <Spinner color={TEMAS.colors.blue[500]} size="lg" />
      ) : (
        corrida && (
          <VStack style={styles.card_corridas}>
            <Box style={styles.card_itens}>
              <Image style={styles.card_img} source={largada} alt="largada dos karts" />
              <Box style={styles.card_infos}>
                <Text style={styles.card_titulo}>{corrida.nome} - {corrida.campeonato.nome}</Text>
                <CategoriasDeCorridas item={{ classificacao: corrida.classificacao }} />
                <Box style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons style={styles.card_icone} name="calendar-clear-outline" />
                  <Text style={styles.card_data}>{formatarDataCorrida(corrida.data)}</Text>
                </Box>
                <Text style={styles.card_sorteio}>Pilotos sorteados {`[${qtdDePessoasSorteadas}/${qtdDePessoasComCheckIn}]`}</Text>
              </Box>
            </Box>

            <Text style={styles.sub_titulo}>Deseja confirmar?</Text>
            <Button style={styles.botao_confirmar} onPress={handleConfirmar}>
              Sim, ver resultado
            </Button>
            <Button style={styles.botao} onPress={handleSortearNovamente}>
              Não, sortear novamente
            </Button>
          </VStack>
        ))}
    </VStack>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: TEMAS.colors.gray[300],
  },
  titulo: {
    alignSelf: 'center',
    marginTop: 80,
    marginBottom: 20,
    marginHorizontal: 20,
    fontSize: TEMAS.fontSizes.lg,
    fontFamily: TEMAS.fonts['petch_Bold'],
  },
  sub_titulo: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: TEMAS.fontSizes.lg,
    fontFamily: TEMAS.fonts['petch_Bold'],
  },
  card_corridas: {
    flex: 1,
    backgroundColor: TEMAS.colors.gray[300],
  },
  card_itens: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: TEMAS.colors.white,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  card_img: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  card_infos: {
    flex: 1,
    marginLeft: 10,
  },
  card_icone: {
    color: TEMAS.colors.black[500],
    marginRight: 5,
  },
  card_titulo: {
    fontSize: TEMAS.fontSizes.md,
    fontFamily: TEMAS.fonts['petch_semiBold'],
  },
  card_data: {
    fontSize: TEMAS.fontSizes.sm,
    fontFamily: TEMAS.fonts['petch_regular'],
  },
  card_sorteio: {
    marginTop: 20,
  },

  botao_confirmar: {
    alignSelf: 'center',
    width: '60%',
    marginTop: 20,
    backgroundColor: TEMAS.colors.green[200],
    borderRadius: 10,
  },
  botao: {
    alignSelf: 'center',
    width: '60%',
    marginTop: 30,
    backgroundColor: TEMAS.colors.black[300],
    borderRadius: 10,
  },
});
