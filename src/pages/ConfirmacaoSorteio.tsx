import React from 'react';
import {VStack, } from 'native-base';
import ConfirmacoesCkecks from '../components/ConfirmacoesCkecks';
import { StyleSheet } from 'react-native';
import { TEMAS } from '../style/temas';

// editar "navegacao"
async function navegacao() {}

export default function ConfirmacaoSorteio() {

    return (
        <VStack style={style.container}>

        <ConfirmacoesCkecks 
        textSucesso="Todos os sorteio dessa cirrida foram finalizado com Sucesso!"
        textBotao="Fazer o check-out da corrida"
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
