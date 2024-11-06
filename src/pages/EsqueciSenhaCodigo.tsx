import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { listarDadosParaCheckIn, processarCheckIn, verificarSeJaFezCheckIn } from '../service/corrida/checkInService';
import { formatarDataCorrida, formatarHorarioCorrida } from '../service/corrida/corridaService';
import { notificacaoGeral } from '../service/notificacaoGeral';
import { Box, useToast } from 'native-base';
import CategoriasDeCorridas from '../components/CategoriasDeCorridas';
import { TEMAS } from "../style/temas";
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import largada from "../assets/largada.png";
import { Image, Select, CheckIcon, VStack } from "native-base";
import { Cabecalho } from "../components/Cabecalho";
import logoCKC1 from '../assets/logoCKC1.png';
import { Botao } from '../components/Botao';

type ParamList = {
    RealizarCheckIn: { idInscricao: number };
};

// Definindo os tipos de classificação
type EstilosCategoria = 'CKC_110' | 'CKC_95' | 'DDL_90';

const RealizarCheckIn = () => {
    const route = useRoute<RouteProp<ParamList, 'RealizarCheckIn'>>();
    const { idInscricao } = route.params;
    const navigation = useNavigation();
    const [dadosCheckIn, setDadosCheckIn] = useState<any>(null);
    const [pesoInicial, setPesoInicial] = useState<string>('');
    const [lastro, setLastro] = useState<string>('0');
    const [usuarioNome, setUsuarioNome] = useState<string>('');
    const [usuarioSobrenome, setUsuarioSobrenome] = useState<string>('');
    const [corrida, setCorrida] = useState<{ nome: string; data: string; horario: string;  classificacao: EstilosCategoria | null; }>({
        nome: '',
        data: '',
        horario: '',
        classificacao: null
    });
    const [statusPagamento, setStatusPagamento] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const toast = useToast();

    useEffect(() => {
        const fetchDadosCheckIn = async () => {
            const checkInResponse = await verificarSeJaFezCheckIn(idInscricao);

            if (checkInResponse.status === 200) {
                const checkInData = checkInResponse.dados;
                setDadosCheckIn(checkInData);
                setPesoInicial(checkInData.peso_inicial ? checkInData.peso_inicial.toString() : '');
                setLastro(checkInData.lastro.toString());
                setUsuarioNome(checkInData.inscricao.usuario.nome);
                setUsuarioSobrenome(checkInData.inscricao.usuario.sobrenome);
                setCorrida({
                    nome: checkInData.inscricao.corrida.nome,
                    data: formatarDataCorrida(checkInData.inscricao.corrida.data),
                    horario: formatarHorarioCorrida(checkInData.inscricao.corrida.horario),
                    classificacao: checkInData.inscricao.corrida.classificacao as EstilosCategoria || null,
                });
                setStatusPagamento(checkInData.inscricao.status_pagamento);
            } else {
                const inscricaoResponse = await listarDadosParaCheckIn(idInscricao);
                if (inscricaoResponse.status === 200) {
                    const inscricaoData = inscricaoResponse.dados;
                    setDadosCheckIn(inscricaoData);
                    setPesoInicial(''); 
                    setLastro('0'); 
                    setUsuarioNome(inscricaoData.usuario.nome);
                    setUsuarioSobrenome(inscricaoData.usuario.sobrenome);
                    setCorrida({
                        nome: inscricaoData.corrida.nome,
                        data: formatarDataCorrida(inscricaoData.corrida.data),
                        horario: formatarHorarioCorrida(inscricaoData.corrida.horario),
                        classificacao: inscricaoData.corrida.classificacao as EstilosCategoria || null,
                    });
                    setStatusPagamento(inscricaoData.status_pagamento);
                } else {
                    setDadosCheckIn(null);
                    setError(inscricaoResponse.details);
                    setPesoInicial('');
                    setLastro('0');
                }
            }
        };

        fetchDadosCheckIn();
    }, [idInscricao]);

    const iniciarCheckIn = async () => {
        const pesoInicialNumber = parseFloat(pesoInicial) || 0;
        const lastroNumber = parseInt(lastro) || 0;

        Alert.alert(
            'Confirmação',
            'Deseja confirmar o Check-in?',
            [
                {
                    text: 'Não',
                    onPress: () => console.log('Check-in cancelado'),
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: async () => {
                        try {
                            const resultado = await processarCheckIn(idInscricao, pesoInicialNumber, lastroNumber);
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
                            console.log('Erro ao realizar check-in:', error);
                            toast.show({
                                title: 'Erro',
                                description: 'Ocorreu um erro ao realizar o check-in. Por favor, tente novamente.',
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
            <Text style={styles.title}>Detalhes do Check-in do Piloto</Text>
            <View>
                <Box style={styles.Corrida}>
                 <Box style={{flexDirection: "row", alignItems: "center"}}>
                    <Image style={styles.card_img} source={largada} alt="largada dos karts" />
                    <Box style={{flexDirection: "column", alignItems: "flex-start"}}>
                    <Text style={{fontWeight: 'bold', padding:3}}>{corrida.nome}</Text>
                 <Box style={{ flexDirection: "row", alignItems: "center"}}>
                    <Ionicons style={styles.card_icone} name="calendar-clear-outline" />
                 <Text>{corrida.data}</Text>
                    </Box>
                    <Box style={{ flexDirection: "row", alignItems: "center"}}>
                    <Ionicons style={styles.card_icone} name="time-outline"/>
                    <Text>{corrida.horario}</Text>
                    </Box>
                    <Box style={{paddingLeft:2}}>
                    <CategoriasDeCorridas item={{ classificacao: corrida.classificacao }} />
                    </Box>
                    </Box>
                 </Box>
                </Box>

                <Box style={{paddingLeft:8}}>
                <Box style={styles.caixa}>
                <Text style={{fontWeight: 'bold', paddingTop:3}}>Nome</Text> 
                <Text style={{paddingTop:4}}>{usuarioNome} {usuarioSobrenome}</Text>
                </Box>

                
                <Box style={styles.caixa}>
                <Text style={{fontWeight: 'bold', paddingTop:3}}>Peso Inicial</Text>
                <TextInput
                    placeholder="80"
                    value={pesoInicial}
                    onChangeText={setPesoInicial}
                    keyboardType="numeric"
                    style={{ opacity: .7 }}
                />
                </Box>


                <Box style={styles.caixa}>
                <Text style={{fontWeight: 'bold', paddingTop:3}}>Lastro</Text>
                <TextInput
                    placeholder="Insira a quantidade total de Lastro"
                    value={lastro}
                    onChangeText={setLastro}
                    keyboardType="numeric"
                    style={{ opacity: .7 }}
                />
                </Box>


                <Box style={styles.status}>
                <Text style={{fontWeight: 'bold'}}>Status de pagamento</Text>
                <Text style={styles.statusPago}> {statusPagamento}</Text>
                </Box>
                </Box>
                <Box style={styles.botao}>
                <Button
                    title={dadosCheckIn ? "Realizar Check-in" : "Criar Check-in"} 
                    onPress={iniciarCheckIn}>
                </Button>
                </Box>
            </View>
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: TEMAS.fonts['petch_Bold'],
      paddingLeft: 20,
      top: -50,
    },
  
    background: {
      backgroundColor: TEMAS.colors.gray[300],
      height:850,
      fontFamily: TEMAS.fonts['petch_Bold'],
    },

    botao: {
        fontWeight: 'bold',
        marginTop: 10,
        backgroundColor: TEMAS.colors.blue[500],
        borderRadius: 10,
        marginBottom: 20,
        position: 'absolute', 
        bottom: -125, 
      },
  
    
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      fontFamily: TEMAS.fonts['petch_Bold'],
      color:'white',
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

    card_icone: {
        color: TEMAS.colors.black[500],
        marginRight: 5,
        padding:1,
        fontSize:20,
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
    status: {
        height:75,
        marginBottom:7,
        marginTop:7,
        backgroundColor: '#9C9C9C', 
        borderRadius: 15, 
        flexDirection: 'column',
        width:340,
        alignItems: 'flex-start', 
        paddingLeft: 15,
        paddingTop:9,
        fontFamily: TEMAS.fonts['petch_Bold'],
    },

    statusPago: {
        height:26,
        marginBottom:7,
        marginTop:7,
        backgroundColor: '#74CC8B', 
        borderRadius: 25, 
        width:70,
        paddingLeft: 15,
        fontFamily: TEMAS.fonts['petch_Bold'],
        color:'#417851',
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

export default RealizarCheckIn;