import React, { useEffect, useState } from "react";
import { VStack, Text, Spinner, Image, useToast, Button } from "native-base";
import logoCKC1 from "../../assets/logoCKC1.png";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { realizarSorteioDaCorrida } from "../../service/sorteador/sorteadorService";
import PilotoESeuNumeroDeKart from "../../components/PilotoESeuNumeroDeKart";
import BotaoSorteio from "../../components/BotaoSorteio";
import { notificacaoGeral } from "../../service/notificacaoGeral";
import { useSorteioService } from "../../service/sorteador/exibirSorteioService";
import { Cabecalho } from "../../components/Cabecalho";
import { TEMAS } from "../../style/temas";
import { StyleSheet } from "react-native";
import { navegarParaTelaSemParametros } from "../../service/navegacao/navegacaoService";

type ParamList = {
  ExibirSorteio: {
    numerosForaDoSorteio: number[];
    maiorNumeroDeKart: number;
    idCorrida: number;
    qtdDePessoasComCheckIn: number,
  };
};

export default function ExibirSorteio() {
  const route = useRoute<RouteProp<ParamList, 'ExibirSorteio'>>();
  const toast = useToast();
  const navigation = useNavigation();

  const [dadosSorteio, setDadosSorteio] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { numerosForaDoSorteio, maiorNumeroDeKart, idCorrida, qtdDePessoasComCheckIn } = route.params;

  useEffect(() => {
    const fetchSorteio = async () => {
      setLoading(true);
      const response = await realizarSorteioDaCorrida(idCorrida, maiorNumeroDeKart, numerosForaDoSorteio);
      if (response.status === 200) {
        setDadosSorteio(response.dados.pilotos);
        setError(null);
      } else {
        setError(`${response.title}\n${response.details}`);
      }
      setLoading(false);
    };

    fetchSorteio();
  }, []);

  // Log de erros de corridas
  useEffect(() => {
    if (error) {
      console.log("Resposta ao carregar dados Sorteio: ", error);
    }
  }, [error]);

  const {
    indexAtual,
    sorteando,
    exibiuPiloto,
    numeroSorteado,
    botaoTexto,
    pilotoAtual,
    realizarSorteioParaPiloto,
    passarParaProximoPiloto,

  } = useSorteioService(dadosSorteio, 0, idCorrida, qtdDePessoasComCheckIn);

  return (
    <VStack flex={1} style={styles.view}>
      <Cabecalho key="cabecalho">
        <Image source={logoCKC1} alt="Logo CKC" width={40} resizeMode="contain" />
      </Cabecalho>
      <Text style={styles.titulo}>Resultado</Text>
      {loading ? (
        <Spinner size="lg" />
      ) : error ? (
        <VStack>
          <Text style={styles.erro}>{error}</Text>
          <Button
            style={styles.botao}
            onPress={() => navegarParaTelaSemParametros(navigation, 'SortearStack', 'SortearScreen1')}
          >
            Voltar a lista de corridas
          </Button>
        </VStack>
      ) : (
        <PilotoESeuNumeroDeKart pilotoAtual={pilotoAtual} sorteando={sorteando} numeroSorteado={numeroSorteado} />
      )}

      {!loading && !error && (
        <BotaoSorteio 
          sorteando={sorteando}
          pilotoAtual={pilotoAtual}
          exibiuPiloto={exibiuPiloto}
          realizarSorteioParaPiloto={realizarSorteioParaPiloto}
          passarParaProximoPiloto={passarParaProximoPiloto}
          botaoTexto={botaoTexto}
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
    fontSize: TEMAS.fontSizes.lg,
    color: TEMAS.colors.white,
    fontFamily: TEMAS.fonts['petch_Bold'],
    textAlign: 'center',
  },
  erro: {
    marginTop: 40,
    fontSize: TEMAS.fontSizes.md,
    padding: 20,
    fontFamily: TEMAS.fonts['petch_Bold'],
    textAlign: 'center',
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
