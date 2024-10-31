import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { notificacaoGeral } from '../service/notificacaoGeral';
import { consultarCorrida } from '../service/corrida/corridaService';
import { useToast, Button } from 'native-base';
import { formatarDataCorrida, formatarHorarioCorrida } from '../service/corrida/corridaService';
import { Ionicons } from '@expo/vector-icons';
import { listarDadosDosPilotosParaCheckOut, navegarParaTelaDeRealizarCheckOut } from '../service/corrida/checkOutService';
import CategoriasDeCorridas from '../components/CategoriasDeCorridas';
import { StackNavigationProp } from '@react-navigation/stack';
import { navegarParaTelaComParametros } from '../service/navegacao/navegacaoService';
import { TEMAS } from '../style/temas';
import { listarPilotosPorCorrida, navegarParaTelaDeRealizarCheckIn, verificarSeJaFezCheckIn } from '../service/corrida/checkInService';
import {VStack, Image, Box} from 'native-base';
import { Cabecalho } from '../components/Cabecalho';
import logoCKC1 from '../assets/logoCKC1.png';
import largada from "../assets/largada.png"; 
import { background } from 'native-base/lib/typescript/theme/styled-system';

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
    if (pilotos && pilotos.length > 0 && qtdPilotosComCheckOut === pilotos.length && !isEdicaoTratado) {
      navegarParaTelaComParametros(navigation, 'CheckOutStack', 'ConfirmacaoCkeckOUT', {
        idCorrida: idCorrida,
      });
      
    }
  }, [qtdPilotosComCheckOut, pilotos]);

  function handleNavegagarParaConfirmacaoDepoisDeEditar() {
    isEdicaoTratado = true;
      navegarParaTelaComParametros(navigation, 'CheckOutStack', 'ConfirmacaoCkeckOUT', {
      idCorrida: idCorrida })
  };

  return (
    <View style={styles.background}>
      <Cabecalho>
          <Image style={styles.logo} source={logoCKC1} alt="Logo CKC"/>
        </Cabecalho>
      <Box style={styles.container}>
      <Text style={styles.title}>Fazer Check-out para:</Text>
      {corrida ? (
        <>
        <View style={styles.Corrida}>
        <Box style={styles.corrida_itens}>
            <Image style={styles.card_img} source={largada} alt="largada dos karts"/>
        <Box style={styles.corrida_inf}>
          <Text style={{ fontWeight: 'bold' }}>{corrida.nome} - {corrida.campeonato.nome}</Text>
          <CategoriasDeCorridas item={{ classificacao: corrida.classificacao }} />
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
        <Text style={styles.errorMessage}>
          {error || 'Nenhuma corrida encontrada.'}
        </Text>
      )}

      {pilotos.length > 0 ? (
        <>
          <Text style={styles.titlePilotos}>Pilotos Cadastrados [{qtdPilotosComCheckOut}/{pilotos.length}]</Text>
          <FlatList
            data={pilotos}
            keyExtractor={(piloto) => piloto.id_inscricao.toString()}
            extraData={pilotos} 
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => navegarParaTelaDeRealizarCheckOut(item.id_inscricao, corrida, navigation)}>
                <View style={styles.pilotoBox}>
                <Text style={styles.pilotoTitulo}>Piloto {index + 1}</Text>
                <Box style={styles.check}>
                  <Text style={styles.pilotoItem}>{`${item.usuario.nome} ${item.usuario.sobrenome}`}</Text>
                  {item.check_out_feito ? (
                    <Ionicons name="checkmark-circle" size={24} color="blue" style={styles.checkIcon} />
                  ) : null}
                </Box>
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
      {pilotos && pilotos.length > 0 && qtdPilotosComCheckOut === pilotos.length && (
          <Button style={styles.card_botao} onPress={handleNavegagarParaConfirmacaoDepoisDeEditar}>
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

export default DetalhesCorridaCheckOut;
