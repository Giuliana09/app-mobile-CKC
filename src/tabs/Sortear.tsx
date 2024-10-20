import React, { useEffect, useState } from "react";
import { Image, Box, Text, FlatList, Button, useToast, VStack } from "native-base";
import { consultarCorridas, formatarDataCorrida } from '../service/corrida/corridaService';
import { notificacaoGeral } from '../service/notificacaoGeral';
import { Cabecalho } from "../components/Cabecalho";
import logoCKC1 from "../assets/logoCKC1.png";
import largada from "../assets/largada.png";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { TEMAS } from "../style/temas";
import { useNavigation } from '@react-navigation/native';
import CategoriasDeCorridas from "../components/CategoriasDeCorridas";
import BarraDePesquisaPorNomeEDia from "../components/BarraDePesquisaPorNomeEDia";
import { verificarERealizarNavegacao } from "../service/sorteador/filtroNavegacao";

export default function Sortear() {
  const [corridas, setCorridas] = useState<any[]>([]);
  const [pesquisa, setPesquisa] = useState<string>("");
  const [errorCorridas, setErrorCorridas] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigation = useNavigation();

  // Faz a busca dinamicamente em caso de mudanças na pesquisa por Nome ou Dia
  useEffect(() => {
    const fetchCorridas = async () => {
      setLoading(true); // Inicia o carregamento
      const parametros = {
        pesquisa,
        check: true
      };

      const response = await consultarCorridas(parametros);
      if (response.status === 200 && Array.isArray(response.dadosCorridas)) {
        setCorridas(response.dadosCorridas);
        setErrorCorridas(null);
      } else {
        setErrorCorridas(response.details);
        const notificacao = notificacaoGeral(response.status, response.title, response.details);
        toast.show({
          title: notificacao.title,
          description: notificacao.details,
          backgroundColor: notificacao.background,
        });
      }
      setLoading(false);
    };

    fetchCorridas();
  }, [pesquisa]);

  // Log de erros de corridas
  useEffect(() => {
    if (errorCorridas) {
      console.log("Resposta ao carregar as Corridas: ", errorCorridas);
    }
  }, [errorCorridas]);

  const handleChangePesquisa = (text: string) => {
    setPesquisa(text);
  };

  return (
    <VStack flex={1}>
      <Cabecalho key="cabecalho">
        <Image source={logoCKC1} alt="Logo CKC" width={40} resizeMode="contain" />
      </Cabecalho>
  
      <BarraDePesquisaPorNomeEDia
        pesquisa={pesquisa}
        onChange={handleChangePesquisa}
      />
  
      <Text style={styles.titulo_proximas}>Corridas com Check-in concluído:</Text>
      
      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={corridas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Box key={item.id} style={styles.card_itens}>
              <Image style={styles.card_img} source={largada} alt="largada dos karts" />
              <Box style={styles.card_infos}>
                <Text style={styles.card_titulo}>{item.nome} - {item.campeonato_nome}</Text>
                <CategoriasDeCorridas item={{ classificacao: item.classificacao }} />
                <Text style={styles.card_data}>{formatarDataCorrida(item.data)}</Text>
                <Button style={styles.card_botao} onPress={() => {
                  verificarERealizarNavegacao(item.id, navigation);
                }}>
                  Sortear
                </Button>
              </Box>
            </Box>
          )}
          ListEmptyComponent={
            <Text style={styles.aviso}>
              Nenhuma corrida encontrada.
              <Ionicons key="aviso-icone" style={styles.aviso_icone} name="cog-outline" />
            </Text>
          }
          contentContainerStyle={{ paddingBottom: 20 }}
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

  titulo_proximas: {
    marginTop: 100,
    marginHorizontal: 20,
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
  card_titulo: {
    fontSize: TEMAS.fontSizes.md,
    fontFamily: TEMAS.fonts['petch_semiBold'],
  },
  card_data: {
    fontSize: TEMAS.fontSizes.sm,
    fontFamily: TEMAS.fonts['petch_regular'],
  },
  card_botao: {
    marginTop: 10,
    backgroundColor: TEMAS.colors.blue[500],
    borderRadius: 10,
  },
  aviso: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    textAlign: "center",
    fontSize: TEMAS.fontSizes.md,
    fontFamily: TEMAS.fonts['petch_Bold'],
    color: TEMAS.colors.blue[500],
  },
  aviso_icone: {
    flexDirection: "column",
    fontSize: 50,
    color: TEMAS.colors.gray[300],
  },
});