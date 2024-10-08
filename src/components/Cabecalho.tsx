import React from 'react';
import {VStack, Image, Box, ITextProps} from 'native-base';
import { TEMAS } from '../style/temas'; 
import curva from '../assets/curva.png';
import { ReactNode } from 'react';

//interface para o TypeScript aceite o children;
interface CabecalhoProps extends ITextProps {
    readonly children: ReactNode;
    
}

export function Cabecalho({children,  ...rest}: CabecalhoProps){

    return (
        <VStack backgroundColor={TEMAS.colors.gray[300]} justifyContent="center" {...rest}>
            <Box backgroundColor={TEMAS.colors.black[300]} alignItems="center" justifyContent="center" {...rest}>
                {/* faz com que o cabeçalho se torne dinamico, posso mudar a logo e por um texto sem repetir a estrutura padrão do cabeçalho */}
                {children}
            </Box>
            {/* onda */}
            <Box position="relative">
                <Image source={curva} alt="Onda"
                width="100%" 
                height={100}
                marginBottom={-80} 
                resizeMode="cover"/>
            </Box> 
        </VStack>
    )
}