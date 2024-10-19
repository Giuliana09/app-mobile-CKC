import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { verificarSeJaFezCheckIn } from '../service/corrida/checkInService';
import { realizarCheckOutDoPiloto } from '../service/corrida/checkOutService';
import { notificacaoGeral } from '../service/notificacaoGeral';
import { CheckIcon, Select, useToast } from 'native-base';
import { formatarDataCorrida, formatarHorarioCorrida } from '../service/corrida/corridaService';
import { TEMAS } from '../style/temas';
import CategoriasDeCorridas from '../components/CategoriasDeCorridas';

type ParamList = {
  RealizarCheckOut: { idInscricao: number; corrida: any };
};

const RealizarCheckOut = () => {
  const route = useRoute<RouteProp<ParamList, 'RealizarCheckOut'>>();
  const { idInscricao, corrida } = route.params;
  const navigation = useNavigation();
  const [dadosCheckOut, setDadosCheckOut] = useState<any>(null);
  const [pesoFinal, setPesoFinal] = useState<string>('');
  const [classificado, setClassificado] = useState<boolean>(true);
  const [usuarioNome, setUsuarioNome] = useState<string>('');
  const [usuarioSobrenome, setUsuarioSobrenome] = useState<string>('');
  const [pesoInicial, setPesoInicial] = useState<string>('');
  const [lastro, setLastro] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchDadosCheckOut = async () => {
      const checkOutResponse = await verificarSeJaFezCheckIn(idInscricao);
      if (checkOutResponse.status === 200) {
        const checkOutData = checkOutResponse.dados;
        setDadosCheckOut(checkOutData);
        setPesoInicial(checkOutData.peso_inicial ? checkOutData.peso_inicial.toString() : '');
        setLastro(checkOutData.lastro.toString());
        setUsuarioNome(checkOutData.inscricao.usuario.nome);
        setUsuarioSobrenome(checkOutData.inscricao.usuario.sobrenome);
        setPesoFinal(checkOutData.peso_final ? checkOutData.peso_final.toString() : '');
        setClassificado(checkOutData.classificado ?? true);
      } else {
        setDadosCheckOut(null);
        setError(checkOutResponse.details);
      }
    };

    fetchDadosCheckOut();
  }, [idInscricao]);

  const confirmarCheckOut = async () => {
    if (isNaN(parseFloat(pesoFinal))) {
      Alert.alert('Erro', 'Peso Final deve ser um número válido.');
      return;
    }

    Alert.alert(
      'Confirmação',
      'Deseja confirmar as informações do Check-out?',
      [
        {
          text: 'Não',
          onPress: () => console.log('Check-out cancelado'),
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              const resultado = await realizarCheckOutDoPiloto(
                dadosCheckOut.inscricao.id,
                parseFloat(pesoFinal) || 0,
                classificado
              );

              const notificacao = notificacaoGeral(resultado.status, resultado.title, resultado.details);
              toast.show({
                title: notificacao.title,
                description: notificacao.details,
                backgroundColor: notificacao.background,
              });

              if (resultado.status >= 200 && resultado.status < 300) {
                navigation.goBack();
              } else {
                console.log(resultado.details);
                setError(resultado.details);
              }
            } catch (error: any) {
              console.log('Erro ao realizar check-out:', error);
              toast.show({
                title: 'Erro',
                description: 'Ocorreu um erro ao realizar o check-out. Por favor, tente novamente.',
                backgroundColor: 'red',
              });
              setError(error.response?.data?.details);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

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
      <Text style={styles.titulo_proximas}>Adicionar informações</Text>
      <View>
        <Text>Nome</Text>
        <Text>{usuarioNome} {usuarioSobrenome}</Text>
        <Text>Peso Inicial</Text>
        <Text>{pesoInicial}</Text>
        
        <Text>Peso Final</Text>
        <TextInput
          placeholder="Peso Final"
          value={pesoFinal}
          onChangeText={setPesoFinal}
          keyboardType="numeric"
          style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
        />
        <Text>Lastro:</Text>
        <Text>{lastro}</Text>
        <View style={styles.classificadoContainer}>
          <Text>Classificado:</Text>
          <Select
            selectedValue={classificado ? 'true' : 'false'}
            minWidth={200}
            accessibilityLabel="Classificado"
            onValueChange={(itemValue) => setClassificado(itemValue === 'true')}
            _selectedItem={{
              bg: "blue.400",
              endIcon: <CheckIcon size={5} color="#fff" />,
            }}
            fontSize={TEMAS.fontSizes.sm}
            borderColor={TEMAS.colors.black[300]}
            borderRadius={12}
            backgroundColor="#636363"
            color={TEMAS.colors.white}
          >
            <Select.Item label="Sim" value="true" />
            <Select.Item label="Não" value="false" />
          </Select>
        </View>
      </View>
      <Button title="Confirmar Informações" onPress={confirmarCheckOut} />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
};

export default RealizarCheckOut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: TEMAS.colors.gray[300],
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorMessage: {
    color: 'red',
    marginVertical: 10,
  },
  classificadoContainer: {
    marginVertical: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seletores: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  titulo_proximas: {
    marginTop: 20,
    marginHorizontal: 20,
    fontSize: TEMAS.fontSizes.lg,
    fontFamily: TEMAS.fonts['petch_Bold'],
  },
});
