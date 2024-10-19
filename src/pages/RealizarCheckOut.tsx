import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { listarDadosParaCheckIn, processarCheckIn, calcularLastro, verificarSeJaFezCheckIn } from '../service/corrida/checkInService';
import { formatarDataCorrida, formatarCategoriaCorrida, formatarHorarioCorrida } from '../service/corrida/corridaService';
import { notificacaoGeral } from '../service/notificacaoGeral';
import { useToast } from 'native-base';

type ParamList = {
    RealizarCheckOut: { idInscricao: number };
};

const RealizarCheckOut = () => {
    const route = useRoute<RouteProp<ParamList, 'RealizarCheckOut'>>();
    const { idInscricao } = route.params;
    const navigation = useNavigation();
    const [dadosCheckIn, setDadosCheckIn] = useState<any>(null);
    const [pesoInicial, setPesoInicial] = useState<string>('');
    const [lastro, setLastro] = useState<string>('0');
    const [usuarioNome, setUsuarioNome] = useState<string>('');
    const [usuarioSobrenome, setUsuarioSobrenome] = useState<string>('');
    const [corrida, setCorrida] = useState<{ nome: string; data: string; horario: string; classificacao: string; }>({
        nome: '',
        data: '',
        horario: '',
        classificacao: ''
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
                    classificacao: formatarCategoriaCorrida(checkInData.inscricao.corrida.classificacao),
                });
                setStatusPagamento(checkInData.inscricao.status_pagamento);
            } else {
                // Busca os dados da inscrição caso o check-in não exista
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
                        classificacao: formatarCategoriaCorrida(inscricaoData.corrida.classificacao),
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

    // Confirmacoes para realizar Check-in e decidir qual fluxo seguir
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
                <Text>{corrida.classificacao}</Text>
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

export default RealizarCheckOut;