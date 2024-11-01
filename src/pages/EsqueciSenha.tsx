import React from 'react';
import {VStack, Image, Text, Box, FormControl, Input, Button} from 'native-base'; //como se fosse a View do react-native
import { TEMAS } from '../style/temas';
import curva from '../assets/curva.png'
// import { useNavigation } from '@react-navigation/native';
import { Cabecalho } from '../components/Cabecalho';
import logoCKC1 from '../assets/logoCKC1.png';




export default function EsqueciSenha({ navigation }: any) {
  // const navigation = useNavigation();

  return (
        // flex={1} => quer dizer que a VStack vai ocupar a tela inteira
        <VStack flex={1} bgColor={TEMAS.colors.gray[300]}>  
             {/* cabeçalho */}
             <Cabecalho>
                <Image source={logoCKC1} alt="Logo CKC" width={40} resizeMode='contain' />
              </Cabecalho>

            <Text color={'while'} fontSize={'lg'}>Esqueci minha senha</Text>
          <Text>Preencha seu e-mail abaixo, te enviaremos um código para que você possa entrar.</Text>

          <Box flex={5} backgroundColor={TEMAS.colors.gray[300]} alignItems="center"  p={5} >  
          
            <FormControl mt={3}>
              <FormControl.Label>CPF:</FormControl.Label>
              <Input 
                placeholder='000 000 000 00'
                size='lg'
                w="100%"
                borderRadius='lg'
                bgColor='gray.100'
                //sombra  
                shadow={3}
                keyboardType='numeric'  // Para exibir o teclado numérico
              />
            </FormControl>

              {/* compo de Email */}
            <FormControl mt={3}>
              <FormControl.Label>Email:</FormControl.Label>
              <Input 
                placeholder='Insira seu email aqui'
                /* tamanho do texto dentro do input */
                size='lg'
                w="100%"
                borderRadius='lg'
                bgColor='gray.100'
                //sombra  
                shadow={3}
              />
            </FormControl>

          </Box>
          {/* bt entar */}
          <Button 
          mb={5}
          bg='black.300'
          mt={10} onPress={() => navigation.navigate('EsqueciSenhaCodigo')}>
            Entrar
          </Button>

        </VStack>
  );
}

