import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { listarDadosParaCheckIn, processarCheckIn, verificarSeJaFezCheckIn } from '../service/corrida/checkInService';
import { formatarDataCorrida, formatarHorarioCorrida } from '../service/corrida/corridaService';
import { notificacaoGeral } from '../service/notificacaoGeral';
import { useToast } from 'native-base';
import CategoriasDeCorridas from '../components/CategoriasDeCorridas';

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
        <View style={{ padding: 20 }}>
            <Text>Detalhes do Check-in do Piloto</Text>
            <View>
                <Text>{corrida.nome}</Text>
                <Text>{corrida.data}</Text>
                <Text>{corrida.horario}</Text>
                <CategoriasDeCorridas item={{ classificacao: corrida.classificacao }} />
                <Text>Nome: {usuarioNome} {usuarioSobrenome}</Text>
                
                <Text>Peso Inicial</Text>
                <TextInput
                    placeholder="Peso Inicial"
                    value={pesoInicial}
                    onChangeText={setPesoInicial}
                    keyboardType="numeric"
                    style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
                />
                <Text>Lastro</Text>
                <TextInput
                    placeholder="Insira a quantidade total de Lastro"
                    value={lastro}
                    onChangeText={setLastro}
                    keyboardType="numeric"
                    style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
                />
                <Text>Status de pagamento: {statusPagamento}</Text>
                <Button 
                    title={dadosCheckIn ? "Realizar Check-in" : "Criar Check-in"} 
                    onPress={iniciarCheckIn} 
                />
            </View>
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
    );
};

export default RealizarCheckIn;
