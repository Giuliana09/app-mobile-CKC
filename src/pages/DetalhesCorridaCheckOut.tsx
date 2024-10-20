import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { notificacaoGeral } from '../service/notificacaoGeral';
import { consultarCorrida } from '../service/corrida/corridaService';
import { useToast } from 'native-base';
import { formatarDataCorrida, formatarHorarioCorrida } from '../service/corrida/corridaService';
import { Ionicons } from '@expo/vector-icons';
import { listarDadosDosPilotosParaCheckOut, navegarParaTelaDeRealizarCheckOut } from '../service/corrida/checkOutService';
import CategoriasDeCorridas from '../components/CategoriasDeCorridas';
import { StackNavigationProp } from '@react-navigation/stack';

type ParamList = {
  DetalhesCorridaCheckOut: { idCorrida: number };
  ConfirmacaoCheckOUT: undefined;
};
export type CheckOutNavigationProp = StackNavigationProp<ParamList, 'DetalhesCorridaCheckOut'>;

function DetalhesCorridaCheckOut() {
  const route = useRoute<RouteProp<ParamList, 'DetalhesCorridaCheckOut'>>();
  const { idCorrida } = route.params;
  const [corrida, setCorrida] = useState<any>(null);
  const [pilotos, setPilotos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const navigation = useNavigation<CheckOutNavigationProp>();

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
      const resultado = await listarDadosDosPilotosParaCheckOut(idCorrida);

      if (resultado.status === 200) {
        setPilotos(resultado.dados.content);
        setError(null);
      } else {
        setError(resultado.details);
      }
    };

    dadosPilotos(); 

    const unsubscribe = navigation.addListener('focus', dadosPilotos); 

    return unsubscribe; 
  }, [idCorrida, navigation]);

  // Calcula a quantidade de check-outs realizados
  const qtdPilotosComCheckOut = pilotos.filter(item => item.check_out_feito).length;
  
  // Verifica se todos os pilotos já fizeram check-out e navega para a tela de confirmação de check-out
  useEffect(() => {
    if (pilotos && pilotos.length > 0 && qtdPilotosComCheckOut === pilotos.length) {
      navigation.navigate('ConfirmacaoCheckOUT');
    }
  }, [qtdPilotosComCheckOut, pilotos]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fazer Check-out para:</Text>
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

      {pilotos.length > 0 ? (
        <>
          <Text style={styles.title}>Pilotos Cadastrados [{qtdPilotosComCheckOut}/{pilotos.length}]</Text>
          <FlatList
            data={pilotos}
            keyExtractor={(piloto) => piloto.id_inscricao.toString()}
            extraData={pilotos} 
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => navegarParaTelaDeRealizarCheckOut(item.id_inscricao, corrida, navigation)}>
                <Text style={styles.pilotoItem}>Piloto {index + 1}</Text>
                <View style={styles.pilotoBox}>
                  <Text style={styles.pilotoItem}>{`${item.usuario.nome} ${item.usuario.sobrenome}`}</Text>
                  {item.check_out_feito ? (
                    <Ionicons name="checkmark-circle" size={24} color="green" style={styles.checkIcon} />
                  ) : null}
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

export default DetalhesCorridaCheckOut;
