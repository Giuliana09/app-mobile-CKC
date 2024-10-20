import React from 'react';
import {VStack, } from 'native-base';
import ConfirmacoesChecks from '../components/ConfirmacoesChecks';
import { StyleSheet } from 'react-native';
import { TEMAS } from '../style/temas';

// editar "navegacao"
async function navegacao() {}

export default function ConfirmacaoSorteio() {

    return (
        <VStack style={style.container}>
        <ConfirmacoesChecks 
            textSucesso="Todos os sorteios dessa corrida foram finalizados com sucesso!"
            textBotao="Fazer o check-out da corrida"
            onPressBotao={navegacao} 
            textBotaoAlterar="Refazer sorteio" 
            onPressBotaoAlterar={() => {
                navegacao()
            }}
        />       
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
