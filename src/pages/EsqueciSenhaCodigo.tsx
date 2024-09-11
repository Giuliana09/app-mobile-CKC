import {VStack, Image, Text, Box, FormControl, Input, Button} from 'native-base'; //como se fosse a View do react-native
import { TEMAS } from '../style/temas';
import curva from '../assets/curva.png'
import exclamacaoIcon from '../assets/exclamacaoIcon.png'

export default function EsqueciSenhaCodigo() {

  return (
        // flex={1} => quer dizer que a VStack vai ocupar a tela inteira
        <VStack flex={1} bgColor={TEMAS.colors.gray[300]}>  
             {/* cabeçalho */}
          <Box flex={2} backgroundColor={TEMAS.colors.black[300]} alignItems="center" justifyContent="center">
            <Text color={'while'} fontSize={'lg'}>Esqueci minha senha</Text>
          </Box>
          {/* Onda do cabeçalho */}
          <Box position="relative">
            <Image source={curva} alt="Onda"
            width="100%" 
            height={100} 
            resizeMode="cover"/>
          </Box>
          <Text>
            Preencha seu e-mail abaixo, te enviaremos um código para que você possa entrar.
          </Text>
          <Box flex={5} backgroundColor={TEMAS.colors.gray[300]} alignItems="center"  p={5} >  
          
            <FormControl mt={3}>
              <FormControl.Label>Códico:</FormControl.Label>
              <Input 
                placeholder='_ _ _ _ _'
                size='lg'
                w="100%"
                borderRadius='lg'
                bgColor='gray.100'
                //sombra  
                shadow={3}
                keyboardType='numeric'  // Para exibir o teclado numérico
              />
            </FormControl>

             
          </Box>
          {/* bt entar */}
          <Button 
          mb={5}
          bg='black.300'
          mt={10}>
            Entrar
          </Button>
          
          <Box>
            <Image source={exclamacaoIcon} alt="Icone de exclamação"/>
            <Text>
              Acesse sua conta administrador no sistema web para alterar sua senha.
            </Text>
          </Box>

        </VStack>
  );
}

