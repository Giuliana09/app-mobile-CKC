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
import { FlatList, TouchableOpacity } from 'react-native';
import { consultarCorrida } from '../service/corrida/corridaService';
import { Ionicons } from '@expo/vector-icons';
import { listarDadosDosPilotosParaCheckOut, navegarParaTelaDeRealizarCheckOut } from '../service/corrida/checkOutService';
import { StackNavigationProp } from '@react-navigation/stack';
import { navegarParaTelaComParametros } from '../service/navegacao/navegacaoService';
import { listarPilotosPorCorrida, navegarParaTelaDeRealizarCheckIn } from '../service/corrida/checkInService';
import {VStack, Image, Box} from 'native-base';
import { Cabecalho } from '../components/Cabecalho';
import logoCKC1 from '../assets/logoCKC1.png';
import largada from "../assets/largada.png"; 
import { background } from 'native-base/lib/typescript/theme/styled-system';

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
    <View style={styles.background}>
    <Cabecalho>
      <Image style={styles.logo} source={logoCKC1} alt="Logo CKC"/>
    </Cabecalho>
      <View style={styles.container}>
        <Text style={styles.title}>Fazer Check-out para:</Text>
        <View>
      {corrida ? (
        <>
        <Box style={styles.Corrida}>
        <Box style={{flexDirection: "row", alignItems: "center"}}>
          <Image style={styles.card_img} source={largada} alt="largada dos karts" />
          <Box style={{flexDirection: "column", alignItems: "flex-start"}}>
          <Text  style={{fontWeight: 'bold', padding:3}}>{corrida.nome} - {corrida.campeonato.nome}</Text>
          <Box style={{paddingLeft:2}}>
          <CategoriasDeCorridas item={{ classificacao: corrida.classificacao }} />
          </Box>
          <Box style={{ flexDirection: "row", alignItems: "center"}}>
          <Ionicons style={styles.card_icone} name="calendar-clear-outline" />
          <Text>{formatarDataCorrida(corrida.data)}</Text>
          </Box>
          <Box style={{ flexDirection: "row", alignItems: "center"}}>
          <Ionicons style={styles.card_icone} name="time-outline"/>
          <Text>{formatarHorarioCorrida(corrida.horario)}</Text>
          </Box>
          </Box>
        </Box>
        </Box>
        </>
      ) : (
        <Text style={styles.errorMessage}>
          {error || 'Nenhuma corrida encontrada.'}
        </Text>
      )}
      <Text style={styles.titulo_proximas}>Adicionar informações</Text>
      <View>
        <Box style={styles.caixa}>
        <Text style={{fontWeight: 'bold', paddingTop:3}}>Nome</Text>
        <Text>{usuarioNome} {usuarioSobrenome}</Text>
        </Box>
        <Box style={styles.caixa}>
        <Text style={{fontWeight: 'bold', paddingTop:3}}>Peso Inicial</Text>
        <Text>{pesoInicial}</Text>
        </Box>
        
        <Box style={styles.caixa}>
        <Text style={{fontWeight: 'bold', paddingTop:3}}>Peso Final</Text>
        <TextInput
          placeholder="Peso Final"
          value={pesoFinal}
          onChangeText={setPesoFinal}
          keyboardType="numeric"
        />
        </Box>

        <Box style={styles.caixa}>
        <Text style={{fontWeight: 'bold', paddingTop:3}}>Lastro:</Text>
        <Text>{lastro}</Text>
        </Box>

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
            backgroundColor="#0033C1"
            color={TEMAS.colors.white}
          >
            <Select.Item label="Sim" value="true" />
            <Select.Item label="Não" value="false" />
          </Select>
        </View>
      </View>
      <Button title="Confirmar Informações" onPress={confirmarCheckOut} />

      </View>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
    </View>
  );
};

export default RealizarCheckOut;

const styles = StyleSheet.create({

  background: {
    backgroundColor: TEMAS.colors.gray[300],
    height:850,
    fontFamily: TEMAS.fonts['petch_Bold'],
  },

  logo: {
    width: 110,
    resizeMode: "contain",
  },

  card_img: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight:5,
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: TEMAS.fonts['petch_Bold'],
    paddingLeft: 20,
    top: -50,
  },

  card_icone: {
    color: TEMAS.colors.black[500],
    marginRight: 5,
    padding:1,
    fontSize:20,
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

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: TEMAS.fonts['petch_Bold'],
    color:'white',
    alignItems: 'center'
  },

  errorMessage: {
    color: 'red',
    marginVertical: 10,
  },
  classificadoContainer: {
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

  caixa: {
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
});
