import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { calcularLastro, listarDadosParaCheckIn, processarCheckIn, verificarSeJaFezCheckIn } from '../service/corrida/checkInService';
import { notificacaoGeral } from '../service/notificacaoGeral';
import { Box, Button, useToast, ScrollView } from 'native-base';
import { TEMAS } from "../style/temas";
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import FeatherIcons from "react-native-vector-icons/Feather";
import { Image } from "native-base";
import { Cabecalho } from "../components/Cabecalho";
import logoCKC1 from '../assets/logoCKC1.png';
import ConfirmacaoCheckInModal from '../components/ConfirmacaoModal';
import CardDetalhesCorrida from '../components/CardDetalhesCorrida';

type ParamList = {
    RealizarCheckIn: {
        idInscricao: number;
        corrida: any;
    };
};

// Definindo os tipos de classificação
type EstilosCategoria = 'CKC_110' | 'CKC_95' | 'DDL_90';

const RealizarCheckIn = () => {
    const route = useRoute<RouteProp<ParamList, 'RealizarCheckIn'>>();
    const { idInscricao, corrida } = route.params;

    const navigation = useNavigation();
    const [dadosCheckIn, setDadosCheckIn] = useState<any>(null);
    const [pesoInicial, setPesoInicial] = useState<string>('');
    const [lastro, setLastro] = useState<string>('');
    const [usuarioNome, setUsuarioNome] = useState<string>('');
    const [usuarioSobrenome, setUsuarioSobrenome] = useState<string>('');
    const [statusPagamento, setStatusPagamento] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [estaCarregandoOsDados, setEstaCarregandoOsDados] = useState<boolean>(true);
    const [placeholderLastro, setPlaceholderLastro] = useState<string>('Carregando...');
    const toast = useToast();
    const inputRef = useRef<TextInput>(null);


    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleEdit = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleConfirmarCheckIn = async () => {
        setIsModalVisible(false);
        const pesoInicialNumber = parseFloat(pesoInicial) || 0;
        const lastroNumber = parseInt(lastro) || 0;

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
    };


    const handleCancelar = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        const fetchDadosCheckIn = async () => {
            const checkInResponse = await verificarSeJaFezCheckIn(idInscricao);
            setEstaCarregandoOsDados(true);

            if (checkInResponse.status === 200) {
                const checkInData = checkInResponse.dados;
                setDadosCheckIn(checkInData);
                setPesoInicial(checkInData.peso_inicial ? checkInData.peso_inicial.toString() : '');
                setLastro(checkInData.lastro.toString());
                setUsuarioNome(checkInData.inscricao.usuario.nome);
                setUsuarioSobrenome(checkInData.inscricao.usuario.sobrenome);
                setStatusPagamento(checkInData.inscricao.status_pagamento);
            } else {
                const inscricaoResponse = await listarDadosParaCheckIn(idInscricao);
                if (inscricaoResponse.status === 200) {
                    const inscricaoData = inscricaoResponse.dados;
                    setDadosCheckIn(inscricaoData);
                    setPesoInicial('');
                    setLastro('');
                    setUsuarioNome(inscricaoData.usuario.nome);
                    setUsuarioSobrenome(inscricaoData.usuario.sobrenome);
                    setStatusPagamento(inscricaoData.status_pagamento);
                } else {
                    setDadosCheckIn(null);
                    setError(inscricaoResponse.details);
                    setPesoInicial('');
                    setLastro('');
                }
            }
            setEstaCarregandoOsDados(false);
            setPlaceholderLastro("Use a calculadora para calcular o lastro");
        };

        fetchDadosCheckIn();
    }, [idInscricao]);

    // Função para calcular o lastro
    const handleCalcularLastro = () => {
        setLastro('');
        setPlaceholderLastro("Calculando lastro...");

        // Calcular o lastro
        const calculatedLastro = calcularLastro(Number(pesoInicial), corrida.classificacao);

        setTimeout(() => {
            setLastro(String(calculatedLastro));
            setPlaceholderLastro("Insira a quantidade total de Lastro");
        }, 1000);
    };

    return (
        <ScrollView style={styles.view}>
            <Cabecalho>
                <Image style={styles.logo} source={logoCKC1} alt="Logo CKC" />
            </Cabecalho>

            <Box style={styles.container}>
                <Text style={styles.title}>Detalhes do Check-in do Piloto:</Text>
                {corrida ? (
                    <CardDetalhesCorrida corrida={corrida} />
                ) : (
                    <Text style={styles.errorMessage}>
                        {error || 'Nenhuma corrida encontrada.'}
                    </Text>
                )}
            </Box>

            <Text style={styles.subtitulo}>Adicionar informações:</Text>
            <Box style={styles.infoCheckInContainer}>
                <Box style={styles.caixa}>
                    <Text style={styles.tituloLabel}>Nome</Text>
                    {estaCarregandoOsDados ? "Carregando..." : `${usuarioNome} ${usuarioSobrenome}`}
                </Box>

                {error && <Text style={styles.errorMessage1}>{error}</Text>}
                <Box style={styles.caixa}>
                    <Text style={styles.tituloLabel}>Peso Inicial:</Text>
                    <View style={styles.containerInputComIcon}>
                        <TextInput
                            ref={inputRef}
                            style={styles.inputComIcone}
                            value={pesoInicial}
                            onChangeText={setPesoInicial}
                            placeholder={estaCarregandoOsDados ? 'Carregando...' : 'Digite o peso inicial'}
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
                    <View style={styles.containerInputComIcon}>
                        <TextInput
                            placeholder={placeholderLastro}
                            value={lastro}
                            onChangeText={setLastro}
                            keyboardType="numeric"
                            style={styles.inputComIcone}
                        />
                        <TouchableOpacity onPress={handleCalcularLastro} style={styles.iconeButton}>
                            <Ionicons name="calculator" style={styles.inputComIcone} size={24} color={TEMAS.colors.orange[300]} />
                        </TouchableOpacity>
                    </View>
                </Box>

                <Box style={styles.status}>
                    <Text style={styles.tituloLabel}>Status de pagamento</Text>
                    {!estaCarregandoOsDados && (
                        <Text style={styles.statusPago}>{statusPagamento}</Text>
                    )}
                </Box>

                <Button onPress={() => setIsModalVisible(true)} style={styles.botao}>
                    Confirmar informações
                </Button>

                <ConfirmacaoCheckInModal
                    isVisible={isModalVisible}
                    onConfirm={handleConfirmarCheckIn}
                    onCancel={handleCancelar}
                    titulo="Deseja confirmar Check-in?"
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
    infoCheckInContainer: {
        top: -50,
        flex: 1,
        alignItems: 'center',
    },
    botao: {
        marginTop: 20,
        backgroundColor: TEMAS.colors.blue[500],
        borderRadius: 10,
        width: 320,
        alignSelf: 'center',
    },

    title: {
        fontSize: TEMAS.fontSizes.lg,
        fontFamily: TEMAS.fonts['petch_Bold'],
        color: TEMAS.colors.white,
    },

    subtitulo: {
        fontSize: TEMAS.fontSizes.lg,
        fontFamily: TEMAS.fonts['petch_Bold'],
        alignSelf: 'center',
        top: -50,
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

export default RealizarCheckIn;