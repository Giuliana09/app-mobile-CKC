import React from 'react';
import {VStack, } from 'native-base';
import ConfirmacoesCkecks from '../components/ConfirmacoesCkecks';
import { StyleSheet } from 'react-native';
import { TEMAS } from '../style/temas';

// editar "navegacao"
async function navegacao() {}

export default function ConfirmacaoCkeckOUT() {

    return (
        <VStack style={style.container}>

        <ConfirmacoesCkecks 
        textSucesso="Todos os check-outs dessa cirrida foram realizado com sucesso!"
        textBotao="Voltar ao check-out"
        onPressBotao={navegacao}>
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