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
import CategoriasDeCorridas from '../components/CategoriasDeCorridas';
import { StackNavigationProp } from '@react-navigation/stack';


type ParamList = {
  DetalhesCorridaCheckIn: { idCorrida: number };
  ConfirmacaoCheckIN: undefined;
};
export type CheckInNavigationProp = StackNavigationProp<ParamList, 'DetalhesCorridaCheckIn'>;

function DetalhesCorridaCheckIn() {
  const route = useRoute<RouteProp<ParamList, 'DetalhesCorridaCheckIn'>>();
  const { idCorrida } = route.params;
  const [corrida, setCorrida] = useState<any>(null);
  const [pilotos, setPilotos] = useState<any>(null);
  const [checkIns, setCheckIns] = useState<{ [key: number]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const navigation = useNavigation<CheckInNavigationProp>();

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

  // se o numero de pilotos com check-in for igual a quantidade de pilotos inscritos redirecionar a tela de confirmação
  useEffect(() => {
    if (pilotos && pilotos.length > 0 && qtdPilotosComCheckIn === pilotos.length) {
      navigation.navigate('ConfirmacaoCheckIN');
    }
  }, [qtdPilotosComCheckIn, pilotos]);
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fazer Check-in para:</Text>
      {corrida ? (
        <>
          <Text>{corrida.nome} - {corrida.campeonato.nome}</Text>
          <CategoriasDeCorridas item={{ classificacao: corrida.classificacao }} />
          <Text>{formatarDataCorrida(corrida.data)}</Text>
          <Text>{formatarHorarioCorrida(corrida.horario)}</Text>
        </>
      ) : (
        <Text style={styles.errorMessage}>
          {error || 'Nenhuma corrida encontrada.'}
        </Text>
      )}

      {pilotos ? (
        <>
          <Text style={styles.title}>Pilotos Cadastrados [{qtdPilotosComCheckIn}/{pilotos.length}]</Text>
          <FlatList
            data={pilotos}
            keyExtractor={(piloto) => piloto.inscricao_id.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => navegarParaTelaDeRealizarCheckIn(item.inscricao_id, navigation)}>
                <Text style={styles.pilotoItem}>Piloto {index + 1}</Text>
                <View style={styles.pilotoBox}>
                  <Text style={styles.pilotoItem}>{`${item.usuario.nome} ${item.usuario.sobrenome}`}</Text>
                  {/* Ícone se fez ou não o Check-in */}
                  {checkIns[item.inscricao_id] && (
                    <Ionicons name="checkmark-circle" size={24} color="green" style={styles.checkIcon} />
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <Text style={styles.errorMessage}>
          {error || 'Nenhum piloto encontrado.'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  pilotoItem: {
    fontSize: 16,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pilotoBox: {
    marginBottom: 35,
    backgroundColor: '#f0f0f0', 
    borderRadius: 5, 
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  checkIcon: {
    marginLeft: 10, 
  },
});

export default DetalhesCorridaCheckIn;
