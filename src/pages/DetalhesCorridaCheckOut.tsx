import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { notificacaoGeral } from '../service/notificacaoGeral';
import { consultarCorrida } from '../service/corrida/corridaService';
import { useToast, Button, Spinner } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { listarDadosDosPilotosParaCheckOut } from '../service/corrida/checkOutService';
import { StackNavigationProp } from '@react-navigation/stack';
import { navegarParaTelaComParametros } from '../service/navegacao/navegacaoService';
import { TEMAS } from '../style/temas';
import { VStack, Image, Box } from 'native-base';
import { Cabecalho } from '../components/Cabecalho';
import logoCKC1 from '../assets/logoCKC1.png';
import CardDetalhesCorrida from '../components/CardDetalhesCorrida';

type ParamList = {
  DetalhesCorridaCheckOut: {
    idCorrida: number,
    isEdicao: boolean,
  };
};
export type CheckOutNavigationProp = StackNavigationProp<ParamList, 'DetalhesCorridaCheckOut'>;

function DetalhesCorridaCheckOut() {
  const route = useRoute<RouteProp<ParamList, 'DetalhesCorridaCheckOut'>>();
  const { idCorrida, isEdicao } = route.params;
  let isEdicaoTratado = isEdicao ?? false;
  const [corrida, setCorrida] = useState<any>(null);
  const [pilotos, setPilotos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const [estaCarregandoOsDados, setEstaCarregandoOsDados] = useState<boolean>(true);
  const navigation = useNavigation<CheckOutNavigationProp>();

  useEffect(() => {
    const dadoCorrida = async () => {
      setEstaCarregandoOsDados(true);
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

  useFocusEffect(
    React.useCallback(() => {
      const dadosPilotos = async () => {
        const resultado = await listarDadosDosPilotosParaCheckOut(idCorrida);
  
        if (resultado.status === 200) {
          setPilotos(resultado.dados.content);
          setError(null);
        } else {
          setError(resultado.details);
        }
        setEstaCarregandoOsDados(false);
      };
  
      dadosPilotos();
    }, [idCorrida])
  );

  // Calcula a quantidade de check-outs realizados
  const qtdPilotosComCheckOut = pilotos.filter(item => item.check_out_feito).length;

  // Verifica se todos os pilotos já fizeram check-out e navega para a tela de confirmação de check-out
  useEffect(() => {
    if (pilotos && pilotos.length > 0 && qtdPilotosComCheckOut === pilotos.length && !isEdicaoTratado) {
      navegarParaTelaComParametros(navigation, 'CheckOutStack', 'ConfirmacaoCkeckOUT', {
        idCorrida: idCorrida,
      });
    }
  }, [qtdPilotosComCheckOut, pilotos]);

  function handleNavegagarParaConfirmacaoDepoisDeEditar() {
    isEdicaoTratado = true;
    navegarParaTelaComParametros(navigation, 'CheckOutStack', 'ConfirmacaoCkeckOUT', {
      idCorrida: idCorrida
    })
  };

  return (
    <View style={styles.view}>
      <VStack style={styles.background}>
        <Cabecalho>
          <Image style={styles.logo} source={logoCKC1} alt="Logo CKC" />
        </Cabecalho>
        <Box style={styles.container}>
          <Text style={styles.title}>Fazer Check-out para:</Text>
          {corrida ? (
            <CardDetalhesCorrida corrida={corrida} />
          ) : (
            <Text style={styles.errorMessage1}>
              {error || 'Nenhuma corrida encontrada.'}
            </Text>
          )}
        </Box>
        
        <Text style={styles.titlePilotos}>
          Pilotos com Check-out [{qtdPilotosComCheckOut || 0}/{(pilotos && pilotos.length) || 0}]
        </Text>

      </VStack>
      {estaCarregandoOsDados ? (
        <Spinner size="xl" color={TEMAS.colors.blue[500]} style={styles.estaCarregandoOsDados} />
      ) : (
        <FlatList
          data={pilotos}
          keyExtractor={(item) => item.id_inscricao.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => navegarParaTelaComParametros(navigation, 'CheckOutStack', 'RealizarCheckOut', {
                corrida,
                idInscricao: item.id_inscricao,
              })}
            >
              <Box style={styles.card_piloto}>
                <Text style={styles.card_titulo}>Piloto {index + 1}</Text>
                <Box style={styles.card_info_piloto}>
                  <Text style={styles.pilotoNome}>{`${item.usuario.nome} ${item.usuario.sobrenome}`}</Text>
                  {item.check_out_feito && (
                    <Ionicons name="checkmark-circle" size={24} color="blue" />
                  )}
                </Box>
              </Box>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.errorMessage1}>{error || 'Nenhum piloto encontrado.'}</Text>}
          ListFooterComponent={pilotos && pilotos.length > 0 && qtdPilotosComCheckOut === pilotos.length ? (
            <Button
              style={styles.botao}
              onPress={() => handleNavegagarParaConfirmacaoDepoisDeEditar()}
            >
              Confirmar alterações
            </Button>
          ) : null}
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
    backgroundColor: TEMAS.colors.white,
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
    marginTop: 25,
    textAlign: "center",
    fontSize: TEMAS.fontSizes.sm,
    fontFamily: TEMAS.fonts['petch_Bold'],
    color: TEMAS.colors.red[500],
  },
  botao: {
    width: 320,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: TEMAS.colors.blue[500],
  },
  estaCarregandoOsDados: {
    marginTop: 20,
  },
});

export default DetalhesCorridaCheckOut;
