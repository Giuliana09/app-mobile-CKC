import React, { ReactNode } from 'react';
import {VStack, Text,   ITextProps} from 'native-base';
import { TEMAS } from '../style/temas';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { useLoadFonts } from '../hooks/useLoadFonts';




interface ConfirmacaoCkecksProps extends ITextProps {
    readonly textSucesso: ReactNode;
    readonly textBotao: ReactNode;
    readonly onPressBotao?: () => void;
    readonly textBotaoAlterar?: string; // Casos que já tenha Check-in, Check-out ou Sorteio feitos e ele deseja ver os dados e alterar msm assim
    readonly onPressBotaoAlterar?: () => void;

}


export default function ConfirmacoesChecks({ 
    textSucesso, 
    textBotao, 
    onPressBotao, 
    textBotaoAlterar, 
    onPressBotaoAlterar, 
    ...rest 
}: ConfirmacaoCkecksProps) {
    
    const fontsLoaded = useLoadFonts();
    if (!fontsLoaded) {
        return null;
    }

    return (
        <VStack style={style.container} {...rest}>
            <Ionicons name="checkmark-circle-outline" size={100} color={TEMAS.colors.yellow[500]} />
            <Text style={style.sucessoText}>{textSucesso}</Text>

            <TouchableOpacity style={style.button} onPress={onPressBotao}>
                <Text style={style.buttonText}>{textBotao}</Text>
            </TouchableOpacity>

            {textBotaoAlterar && (
                <TouchableOpacity style={style.button} onPress={onPressBotaoAlterar}>
                    <Text style={style.buttonText}>{textBotaoAlterar}</Text>
                </TouchableOpacity>
            )}
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
    sucessoText:{
        color: '#fff',
        fontSize: 18,
        fontFamily: 'ChakraPetch-Bold', 
        textAlign: 'center',
        marginTop: 20,
    },
    button:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: TEMAS.colors.black[500],
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 30,
        gap: 5,
    },
    buttonText:{
        color: TEMAS.colors.white,
        fontSize: 16,
        fontFamily:TEMAS.fonts['ChakraPetch-Bold'], // Fonte personalizada
        marginLeft: 10,
    },
})