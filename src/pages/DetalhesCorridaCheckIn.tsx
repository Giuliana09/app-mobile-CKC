import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { notificacaoGeral } from '../service/notificacaoGeral';
import { consultarCorrida } from '../service/corrida/corridaService';
import { useToast } from 'native-base';
import { listarPilotosPorCorrida, verificarSeJaFezCheckIn } from '../service/corrida/checkInService';
import { Ionicons } from '@expo/vector-icons';
import { TEMAS } from "../style/temas";
import { VStack, Image, Box, Button } from 'native-base';
import { Cabecalho } from '../components/Cabecalho';
import logoCKC1 from '../assets/logoCKC1.png';
import { navegarParaTelaComParametros } from '../service/navegacao/navegacaoService';
import CardDetalhesCorrida from '../components/CardDetalhesCorrida';

type ParamList = {
  DetalhesCorridaCheckIn: {
    idCorrida: number
  };
};

function DetalhesCorridaCheckIn() {
  const route = useRoute<RouteProp<ParamList, 'DetalhesCorridaCheckIn'>>();
  const { idCorrida } = route.params;
  const [corrida, setCorrida] = useState<any>(null);
  const [pilotos, setPilotos] = useState<any>(null);
  const [checkIns, setCheckIns] = useState<{ [key: number]: boolean }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const navigation = useNavigation();

  useEffect(() => {
    const dadoCorrida = async () => {
      setLoading(true);
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
    };

    dadoCorrida();
  }, [idCorrida]);

  useEffect(() => {
    const dadosPilotos = async () => {
      
      const resultado = await listarPilotosPorCorrida(idCorrida);

      if (resultado.status === 200 && resultado.qtdPilotos > 0) {
        setPilotos(resultado.dadosPilotos);
        setError(null);
        await verificarCheckIns(resultado.dadosPilotos);
      } else {
        setError(resultado.details);
      }
      setLoading(false);
    };

    dadosPilotos();
  }, [idCorrida]);

  const verificarCheckIns = async (pilotos: any) => {
    const checkInStatus: { [key: number]: boolean } = {};

    for (const piloto of pilotos) {
      const { status } = await verificarSeJaFezCheckIn(piloto.inscricao_id);
      checkInStatus[piloto.inscricao_id] = status === 200;
    }

    setCheckIns(checkInStatus);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (pilotos) {
        verificarCheckIns(pilotos);
      }
    }, [pilotos])
  );

  // Calcula a quantidade de check-ins realizados
  const qtdPilotosComCheckIn = Object.values(checkIns).filter(Boolean).length;

  // se o numero de pilotos com check-in for igual a quantidade de pilotos inscritos, redirecionar a tela de confirmação
  useEffect(() => {
    if (pilotos && pilotos.length > 0 && qtdPilotosComCheckIn === pilotos.length) {
      navegarParaTelaComParametros(navigation, 'CheckInStack', 'ConfirmacaoCheckIN', {
        idCorrida: idCorrida,
      });
    }
  }, [qtdPilotosComCheckIn, pilotos]);

  return (
    <View style={styles.view}>
      <VStack style={styles.background}>
        <Cabecalho>
          <Image style={styles.logo} source={logoCKC1} alt="Logo CKC" />
        </Cabecalho>
        <Box style={styles.container}>
          <Text style={styles.title}>Fazer Check-in para:</Text>
          {corrida ? (
            <CardDetalhesCorrida corrida={corrida} />
          ) : (
            <Text style={styles.errorMessage1}>
              {error || 'Nenhuma corrida encontrada.'}
            </Text>
          )}
        </Box>
        {pilotos && pilotos.length > 0 && (
          <Text style={styles.titlePilotos}>
            Pilotos com Check-in [{qtdPilotosComCheckIn}/{pilotos.length}]
          </Text>
        )}
      </VStack>
      {loading ? (
        <ActivityIndicator size="large" color={TEMAS.colors.blue[500]} style={styles.loading} />
      ) : (
        <FlatList
          data={pilotos}
          keyExtractor={(item) => item.inscricao_id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => navegarParaTelaComParametros(navigation, 'CheckInStack', 'RealizarCheckIn', {
                corrida,
                idInscricao: item.inscricao_id,
              })}
            >
              <Box style={styles.card_piloto}>
                <Text style={styles.card_titulo}>Piloto {index + 1}</Text>
                <Box style={styles.card_info_piloto}>
                  <Text style={styles.pilotoNome}>{`${item.usuario.nome} ${item.usuario.sobrenome}`}</Text>
                  {checkIns[item.inscricao_id] && (
                    <Ionicons name="checkmark-circle" size={24} color="blue"/>
                  )}
                </Box>
              </Box>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.errorMessage1}>{error || 'Nenhum piloto encontrado.'}</Text>}
          ListFooterComponent={pilotos && pilotos.length > 0 && qtdPilotosComCheckIn === pilotos.length && (
            <Button
              style={styles.botaoConfirmar}
              onPress={() => navegarParaTelaComParametros(navigation, 'CheckInStack', 'ConfirmacaoCheckIN', { idCorrida })}
            >
              Confirmar alterações
            </Button>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: TEMAS.colors.gray[300],
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: TEMAS.fonts['petch_Bold'],
    top: -50,
  },
  background: {
    backgroundColor: TEMAS.colors.gray[300],
    fontFamily: TEMAS.fonts['petch_Bold'],
  },
  card_piloto: {
    alignSelf: 'center',
    height: 75,
    marginBottom: 7,
    marginTop: 7,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    flexDirection: 'column',
    width: 340,
    alignItems: 'flex-start',
    paddingLeft: 15,
    paddingTop: 9,
    fontFamily: TEMAS.fonts['petch_Bold'],
  },
  title: {
    fontSize: TEMAS.fontSizes.lg,
    fontFamily: TEMAS.fonts['petch_Bold'],
    color: TEMAS.colors.white,
  },
  titlePilotos: {
    fontSize: TEMAS.fontSizes.lg,
    fontFamily: TEMAS.fonts['petch_Bold'],
    alignSelf: 'center',
    top: -20,
  },
  card_titulo: {
    fontSize: TEMAS.fontSizes.md,
    fontFamily: TEMAS.fonts['petch_semiBold'],
  },
  card_info_piloto: {
    flexDirection: 'row',   
    width: '90%',  
  },
  pilotoNome: {
    fontSize: TEMAS.fontSizes.sm,
    fontFamily: TEMAS.fonts['body'],
    flex: 1, 
  },
  logo: {
    width: 110,
    resizeMode: "contain",
  },
  errorMessage1: {
    alignItems: "center",
    width: '100%',
    marginTop: 20,
    textAlign: "center",
    fontSize: TEMAS.fontSizes.sm,
    fontFamily: TEMAS.fonts['petch_Bold'],
    color: TEMAS.colors.red[500],
  },
  botaoConfirmar: {
    marginTop: 20,
    backgroundColor: TEMAS.colors.blue[500],
    width: '60%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  loading: {
    marginTop: 20,
  },
});

export default DetalhesCorridaCheckIn;
