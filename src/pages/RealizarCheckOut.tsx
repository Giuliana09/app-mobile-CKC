import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { verificarSeJaFezCheckIn } from '../service/corrida/checkInService';
import { realizarCheckOutDoPiloto } from '../service/corrida/checkOutService';
import { notificacaoGeral } from '../service/notificacaoGeral';
import { Select, useToast, Button, } from 'native-base';
import { TEMAS } from '../style/temas';
import { TouchableOpacity } from 'react-native';
import { Image, Box} from 'native-base';
import { Cabecalho } from '../components/Cabecalho';
import logoCKC1 from '../assets/logoCKC1.png';
import CardDetalhesCorrida from '../components/CardDetalhesCorrida';
import ConfirmacaoCheckOutModal from '../components/ConfirmacaoModal';
import FeatherIcons from "react-native-vector-icons/Feather";

type ParamList = {
  RealizarCheckOut: { 
    idInscricao: number; 
    corrida: any };
};

const RealizarCheckOut = () => {
  const route = useRoute<RouteProp<ParamList, 'RealizarCheckOut'>>(); 
  const { idInscricao, corrida } = route.params; 
  const navigation = useNavigation(); 
  const [pesoFinal, setPesoFinal] = useState<string>(''); 
  const [classificado, setClassificado] = useState<boolean>(true); 
  const [usuarioNome, setUsuarioNome] = useState<string>(''); 
  const [usuarioSobrenome, setUsuarioSobrenome] = useState<string>(''); 
  const [pesoInicial, setPesoInicial] = useState<string>(''); 
  const [lastro, setLastro] = useState<string>(''); 
  const [error, setError] = useState<string | null>(null); 
  const [estaCarregandoOsDados, setEstaCarregandoOsDados] = useState<boolean>(true);  
  const toast = useToast(); 
  const inputRef = useRef<TextInput>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchDadosCheckOut = async () => {
      const checkOutResponse = await verificarSeJaFezCheckIn(idInscricao);
      if (checkOutResponse.status === 200) {
        const checkOutData = checkOutResponse.dados;
        setPesoInicial(checkOutData.peso_inicial ? checkOutData.peso_inicial.toString() : '');
        setLastro(checkOutData.lastro.toString());
        setUsuarioNome(checkOutData.inscricao.usuario.nome);
        setUsuarioSobrenome(checkOutData.inscricao.usuario.sobrenome);
        setPesoFinal(checkOutData.peso_final ? checkOutData.peso_final.toString() : '');
        setClassificado(checkOutData.classificado ?? true);
      } else {
        setError(checkOutResponse.details);
      }
      setEstaCarregandoOsDados(false);  
    };

    fetchDadosCheckOut();
  }, [idInscricao]);


  const handleEdit = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRealizarCheckOut = () => {
    setIsModalVisible(true); 
  };

  const handleConfirmarCheckOut = async () => {
    setIsModalVisible(false);
    const pesoFinalNumber = parseFloat(pesoFinal) || 0;

    try {
      const resultado = await realizarCheckOutDoPiloto(idInscricao, pesoFinalNumber, classificado);
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
  };

  const handleCancelar = () => {
    setIsModalVisible(false);
  };

  return (
    <ScrollView style={styles.view}>
      <Cabecalho>
        <Image style={styles.logo} source={logoCKC1} alt="Logo CKC" />
      </Cabecalho>

      <Box style={styles.container}>
        <Text style={styles.title}>Detalhes do Check-out do Piloto:</Text>
        {corrida ? (
          <CardDetalhesCorrida corrida={corrida} />
        ) : (
          <Text style={styles.errorMessage}>
            {error || 'Nenhuma corrida encontrada.'}
          </Text>
        )}
      </Box>

      <Text style={styles.subtitulo}>Adicionar informações:</Text>
      <Box style={styles.infoCheckOutContainer}>
        <Box style={styles.caixa}>
          <Text style={styles.tituloLabel}>Nome</Text>
          <Text style={styles.conteudoLabel}>
            {estaCarregandoOsDados ? 'Carregando...' : `${usuarioNome} ${usuarioSobrenome}`}
          </Text>
        </Box>

        <Box style={styles.caixa}>
          <Text style={styles.tituloLabel}>Peso inicial</Text>
          <Text style={styles.conteudoLabel}>{estaCarregandoOsDados ? 'Carregando...' : pesoInicial}</Text>
        </Box>

        {error && <Text style={styles.errorMessage1}>{error}</Text>}
        <Box style={styles.caixa}>
          <Text style={styles.tituloLabel}>Peso final:</Text>
          <View style={styles.containerInputComIcon}>
            <TextInput
              ref={inputRef}
              style={styles.inputComIcone}
              value={pesoFinal}
              onChangeText={setPesoFinal}
              placeholder={estaCarregandoOsDados ? 'Carregando...' : 'Digite o peso final'}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={handleEdit} style={styles.iconeButton}>
              <FeatherIcons
                name="edit"
                style={styles.inputComIcone}
                size={22}
                color={TEMAS.colors.black[500]}
              />
            </TouchableOpacity>
          </View>
        </Box>

        <Box style={styles.caixa}>
          <Text style={styles.tituloLabel}>Lastro</Text>
          <Text style={styles.conteudoLabel}>{estaCarregandoOsDados ? 'Carregando...' : lastro}</Text>
        </Box>

        <Box style={styles.caixa_select}>
          <Text style={styles.tituloLabel}>Classificado</Text>
          <Select
            selectedValue={classificado.toString()}
            minWidth="300"
            accessibilityLabel="Selecione a classificação"
            placeholder={estaCarregandoOsDados ? 'Carregando...' : 'Selecione a classificação'}
            _selectedItem={{
              bg: "blue.400",
              endIcon: <FeatherIcons name="check" size={22} color={TEMAS.colors.white} />
            }}
            mt={1}
            onValueChange={(itemValue) => setClassificado(itemValue === 'true')}
          >
            <Select.Item label="Sim" value="true" />
            <Select.Item label="Não" value="false" />
          </Select>
        </Box>

        <Button style={styles.botao} onPress={handleRealizarCheckOut}>
          Confirmar informações
        </Button>

        <ConfirmacaoCheckOutModal
          isVisible={isModalVisible}
          onConfirm={handleConfirmarCheckOut}
          onCancel={handleCancelar}
          titulo="Deseja confirmar Check-out?"
        />
      </Box>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: TEMAS.fonts['petch_Bold'],
      top: -50,
  },
  view: {
      flex: 1,
      backgroundColor: TEMAS.colors.gray[300],
  },
  infoCheckOutContainer: {
      flex: 1,
      alignItems: 'center',
      top: -40,
  },
  botao: {
      marginTop: 20,
      backgroundColor: TEMAS.colors.blue[500],
      borderRadius: 10,
      width: 320,
      alignSelf: 'center',
      marginBottom: 20,
  },

  title: {
      fontSize: TEMAS.fontSizes.lg,
      fontFamily: TEMAS.fonts['petch_Bold'],
      color: TEMAS.colors.white,
  },

  subtitulo: {
      top: -40,
      fontSize: TEMAS.fontSizes.lg,
      fontFamily: TEMAS.fonts['petch_Bold'],
      alignSelf: 'center',
      marginBottom: 5,
  },
  tituloLabel: {
      fontSize: TEMAS.fontSizes.sm,
      fontFamily: TEMAS.fonts['petch_Bold'],
  },

  conteudoLabel: {
      fontSize: TEMAS.fontSizes.sm,
      fontFamily: TEMAS.fonts['body'],
  },

  errorMessage: {
      color: 'red',
      marginTop: 10,
  },
  caixa: {
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

  caixa_select: {
    height: 100,
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
  status: {
      height: 75,
      marginBottom: 7,
      marginTop: 7,
      backgroundColor: '#9C9C9C',
      borderRadius: 15,
      flexDirection: 'column',
      width: 340,
      alignItems: 'flex-start',
      paddingLeft: 15,
      paddingTop: 9,
      fontFamily: TEMAS.fonts['petch_Bold'],
  },

  statusPago: {
      height: 26,
      marginBottom: 7,
      backgroundColor: '#74CC8B',
      borderRadius: 25,
      width: 70,
      paddingLeft: 15,
      fontFamily: TEMAS.fonts['petch_Bold'],
      color: '#417851',
  },
  containerInputComIcon: {
      flexDirection: 'row',
  },

  inputComIcone: {
      flex: 1,
      opacity: .7,
      fontFamily: TEMAS.fonts['body'],
  },
  iconeButton: {
      paddingRight: 20,
  },

  logo: {
      width: 110,
      resizeMode: "contain",
  },
  errorMessage1: {
      alignItems: "center",
      width: '90%',
      marginTop: 20,
      textAlign: "center",
      fontSize: TEMAS.fontSizes.sm,
      fontFamily: TEMAS.fonts['petch_Bold'],
      color: TEMAS.colors.red[500],
  },
});

export default RealizarCheckOut;