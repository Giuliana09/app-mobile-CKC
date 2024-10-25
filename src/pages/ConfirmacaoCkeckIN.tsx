import React from 'react';
import {VStack, } from 'native-base';
import ConfirmacoesCkecks from '../components/ConfirmacoesChecks';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { TEMAS } from '../style/temas';



// editar "navegacao"
async function navegacao() {}

export default function ConfirmacaoCkeckIN() {

    return (
        <VStack style={style.container} >

        <ConfirmacoesCkecks flex={50}
            textSucesso="Todos os check-ins dessa cirrida foram realizados com sucesso!"
            textBotao="Sortear karts da corrida"
            onPressBotao={navegacao}  
            textBotaoAlterar="Refazer Checkin" 
            onPressBotaoAlterar={() => {
                    navegacao()
            }}
        >  
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