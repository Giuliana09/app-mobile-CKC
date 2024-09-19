import {VStack, Text,  ITextProps} from 'native-base';
import { TEMAS } from '../style/temas'; 
import { ReactNode } from 'react';


//interface para o TypeScript aceite o children;
interface TituloProps extends ITextProps {
    
    readonly tituloPage?: ReactNode;
}


export function Titulo({tituloPage, ...rest}: TituloProps){
    return(
        <VStack backgroundColor={TEMAS.colors.gray[300]} justifyContent="center" >
           {/* Titulo */}
            <Text fontSize="5xl"
            fontWeight="bold"
            color="black"
            textAlign="center"
            fontFamily="heading"
            // mt = margin top
            mt={1}
            mb={2}
            {...rest}
            >
                {tituloPage}
            </Text>
         
        </VStack>
    )
}