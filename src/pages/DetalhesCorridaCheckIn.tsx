import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { notificacaoGeral } from '../service/notificacaoGeral';
import { consultarCorrida } from '../service/corrida/corridaService';
import { useToast } from 'native-base';
import { formatarDataCorrida, formatarHorarioCorrida } from '../service/corrida/corridaService';
import { listarPilotosPorCorrida, navegarParaTelaDeRealizarCheckIn, verificarSeJaFezCheckIn } from '../service/corrida/checkInService';
import { Ionicons } from '@expo/vector-icons';
import { TEMAS } from "../style/temas";
import {VStack, Image, Box, Button} from 'native-base';
import { Cabecalho } from '../components/Cabecalho';
import logoCKC1 from '../assets/logoCKC1.png';
import largada from "../assets/largada.png"; 
import { navegarParaTelaComParametros } from '../service/navegacao/navegacaoService';





type ParamList = {
  DetalhesCorridaCheckIn: { idCorrida: number };
    
};

function DetalhesCorridaCheckIn() {
  const route = useRoute<RouteProp<ParamList, 'DetalhesCorridaCheckIn'>>();
  const { idCorrida } = route.params;
  const [corrida, setCorrida] = useState<any>(null);
  const [pilotos, setPilotos] = useState<any>(null);
  const [checkIns, setCheckIns] = useState<{ [key: number]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const navigation = useNavigation();


  useEffect(() => {
    const dadoCorrida = async () => {
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
    <View style={styles.background}>
        <Cabecalho>
          <Image style={styles.logo} source={logoCKC1} alt="Logo CKC"/>
        </Cabecalho>
      <Box style={styles.container}>
      <Text style={styles.title}>Fazer Check-in para:</Text>
      {corrida ? (
        <>
        <View style={styles.Corrida}>
        <Box style={styles.corrida_itens}>          
            <Image style={styles.card_img} source={largada} alt="largada dos karts"/>
          <Box style={styles.corrida_inf}>
             <Text style={{ fontWeight: 'bold' }}>{corrida.nome} - {corrida.campeonato.nome}</Text>
              <Box style={styles.data}>          
                <Ionicons style={styles.card_icone} name="calendar-clear-outline" />
                <Text>{formatarDataCorrida(corrida.data)}</Text>
              </Box>
              <Box style={styles.horario}>       
                <Ionicons style={styles.card_icone} name="time-outline"/>
                <Text>{formatarHorarioCorrida(corrida.horario)}</Text>
              </Box>
          </Box>
        </Box> 
          </View>
        </>
      ) : (
        <Text style={styles.errorMessage1}>
          {error || 'Nenhuma corrida encontrada.'}
        </Text>
      )}
      
      {pilotos ? (
        <>
          <Text style={styles.titlePilotos}>Pilotos Cadastrados [{qtdPilotosComCheckIn}/{pilotos.length}]</Text>
          <FlatList
            data={pilotos}
            keyExtractor={(piloto) => piloto.inscricao_id.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => navegarParaTelaDeRealizarCheckIn(item.inscricao_id, navigation)}>
                <View style={styles.pilotoBox}>
                <Text style={styles.pilotoTitulo}>Piloto {index + 1}</Text>
                <Box style={styles.check}>
                  <Text style={styles.pilotoItem}>{`${item.usuario.nome} ${item.usuario.sobrenome}`}</Text>
                  {/* Ícone se fez ou não o Check-in */}
                  {checkIns[item.inscricao_id] && (
                    <Ionicons name="checkmark-circle" size={24} color="blue" style={styles.checkIcon} />
                  )}
                  </Box>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <Text style={styles.errorMessage2}>
          {error || 'Nenhum piloto encontrado.'}
        </Text>
      )}
      {pilotos && pilotos.length > 0 && qtdPilotosComCheckIn === pilotos.length && (
          <Button 
            mb={5}
            bg='black.300'
            mt={10}
            onPress={() => navegarParaTelaComParametros(navigation, 'CheckInStack', 'ConfirmacaoCheckIN', {
            idCorrida: idCorrida })}>
            Confirmar alterações
          </Button>
        )}
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: TEMAS.fonts['petch_Bold'],
    top: -50,
  },

  background: {
    backgroundColor: TEMAS.colors.gray[300],
    height:850,
    fontFamily: TEMAS.fonts['petch_Bold'],
  },

  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: TEMAS.fonts['petch_Bold'],
    color:'white'
  },
  titlePilotos: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: TEMAS.fonts['petch_Bold'],
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  Corrida: {
    height:120,
    marginBottom:7,
    marginTop:7,
    backgroundColor: '#f0f0f0', 
    borderRadius: 15, 
    flexDirection: 'column',
    width:360,
    alignItems: 'flex-start', 
    paddingLeft: 15,
    paddingTop:9,
    paddingRight:200
  },
  pilotoTitulo: {
    fontSize: 16,
    paddingVertical: 5,
    fontWeight: 'bold',
    alignItems: 'flex-start', 
  },
  pilotoItem: {
    fontSize: 16,
  },

  pilotoBox: {
    height:75,
    marginBottom:7,
    marginTop:7,
    backgroundColor: '#f0f0f0', 
    borderRadius: 15, 
    flexDirection: 'column',
    width:340,
    alignItems: 'flex-start', 
    paddingLeft: 15,
    paddingTop:9,
    fontFamily: TEMAS.fonts['petch_Bold'],
  },
  checkIcon: {
    marginLeft: 10, 
  },
  corrida_itens: {
    flexDirection:'row'
  },
  corrida_inf:{
    marginLeft:5,
    flexDirection:'column',
    width:240,
  },
  data: {
    marginTop:10,
    marginBottom:5,
    flexDirection: 'row',
  },
  horario:{
    flexDirection: 'row',
  },

  check:{
    flexDirection: 'row',
  },

  card_icone: {
    color: TEMAS.colors.black[500],
    alignSelf: "flex-start",
    padding:1,
    fontSize:20,
  },

  logo: {
    width: 110,
    resizeMode: "contain",
  },

  view: {
    flex: 1,
    justifyContent: "center",
  },
  card_img: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight:5,
  },

  card_botao:{
    fontWeight: 'bold',
    marginTop: 10,
    backgroundColor: TEMAS.colors.blue[500],
    borderRadius: 10,
    marginBottom: 20,
    position: 'absolute', 
    bottom: -125, 
  },

  errorMessage1:{
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    textAlign: "center",
    fontSize: TEMAS.fontSizes.md,
    fontFamily: TEMAS.fonts['petch_Bold'],
    color: TEMAS.colors.blue[500],
  },

  errorMessage2:{
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    textAlign: "center",
    fontSize: TEMAS.fontSizes.md,
    fontFamily: TEMAS.fonts['petch_Bold'],
    color: TEMAS.colors.blue[500],
  }

});

export default DetalhesCorridaCheckIn;
