import React from 'react';
import {VStack, } from 'native-base';
import ConfirmacoesCkecks from '../components/ConfirmacoesChecks';
import { StyleSheet } from 'react-native';
import { TEMAS } from '../style/temas';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { navegarParaTelaComParametros, navegarParaTelaSemParametros } from '../service/navegacao/navegacaoService';

type listaDeParametros ={
    ConfirmacaoCkeckOUT:{
        idCorrida?: number
    }; 
};

export default function ConfirmacaoCkeckOUT() {

    const navigation = useNavigation();
    const route = useRoute<RouteProp<listaDeParametros, 'ConfirmacaoCkeckOUT'>>();
    const {idCorrida} = route.params;
    const idCorridaDeNavegacao:number = idCorrida ?? 0;

    async function navegacaoRefazerCheckOut(){
        navegarParaTelaComParametros(navigation, 'CheckOutStack', 'DetalhesCorridaCheckOut', {
            idCorrida: idCorridaDeNavegacao,
            isEdicao: true,
          });
        };
        
        async function navegacaoVoltarCheckOuts(){
        navegarParaTelaSemParametros(navigation, 'CheckOutStack', 'CheckoutScreen1');
    };
    
    return (
        <VStack style={style.container}>

        <ConfirmacoesCkecks 
        textSucesso="Todos os check-outs dessa corrida foram realizados com sucesso!"
        textBotao="Voltar ao check-out"
        onPressBotao={navegacaoVoltarCheckOuts}
        textBotaoAlterar="Refazer check-out"
        onPressBotaoAlterar={navegacaoRefazerCheckOut}>
        </ConfirmacoesCkecks>       
            
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