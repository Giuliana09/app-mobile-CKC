import React from 'react';
import {VStack, } from 'native-base';
import ConfirmacoesChecks from '../components/ConfirmacoesChecks';
import { StyleSheet } from 'react-native';
import { TEMAS } from '../style/temas';
import { verificarERealizarNavegacaoParaFluxoSorteador } from '../service/sorteador/filtroNavegacao';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { navegarParaTelaComParametros } from '../service/navegacao/navegacaoService';



type listaDeParametros ={
    ConfirmacaoCkeckIN:{
        idCorrida?: number
    }; 
};

export default function ConfirmacaoCkeckIN() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<listaDeParametros, 'ConfirmacaoCkeckIN'>>();
    const {idCorrida} = route.params;
    const idCorridaDeNavegacao:number = idCorrida ?? 0;    
   
    async function navegacaoSortear() {
        verificarERealizarNavegacaoParaFluxoSorteador(idCorridaDeNavegacao, navigation)
    }
    async function navegacaoRefazer() {
        navegarParaTelaComParametros(navigation, 'CheckInStack', 'DetalhesCorridaCheckIn', {
            idCorrida: idCorridaDeNavegacao,
          });
    };
    return (
        <VStack style={style.container} >
        <ConfirmacoesChecks flex={50}
            textSucesso="Todos os check-ins dessa cirrida foram realizados com sucesso!"
            textBotao="Sortear karts da corrida"
            onPressBotao={navegacaoSortear}  
            textBotaoAlterar="Refazer Checkin" 
            onPressBotaoAlterar={() => {
                    navegacaoRefazer()
            }}
        >  
        </ConfirmacoesChecks>       
        </VStack>
    )
}
export const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: TEMAS.colors.black[300],
        padding: 20,
    },
})