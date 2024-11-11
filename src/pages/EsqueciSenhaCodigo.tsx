import React from 'react';
import {VStack, Image, Text, Box, FormControl, Input, Button} from 'native-base'; //como se fosse a View do react-native
import { TEMAS } from '../style/temas';
import exclamacaoIcon from '../assets/exclamacaoIcon.png'
import { Cabecalho } from '../components/Cabecalho';
import logoCKC1 from '../assets/logoCKC1.png';
import { StyleSheet } from 'react-native';


export default function EsqueciSenhaCodigo() {

  return (
        // flex={1} => quer dizer que a VStack vai ocupar a tela inteira
        <VStack flex={1} bgColor={TEMAS.colors.gray[300]}>  
          {/* cabeçalho */}
          <Cabecalho>
            <Image source={logoCKC1} alt="Logo CKC" width={40} resizeMode='contain' />
          </Cabecalho>

          <Text style={styles.title}>Esqueci minha senha</Text>
          <Text style={styles.titlePreencha}>Insira o código que enviamos para seu e-mail:</Text>
          
          <Box backgroundColor={TEMAS.colors.gray[300]} alignItems="center" p={5} >  
            <FormControl mt={6}>
              <FormControl.Label _text={{ fontWeight: 'bold'}}>Códico:</FormControl.Label>
              <Input 
                placeholder='_ _ _ _ _'
                size='xl'
                w="100%"
                p={"4"}
                mt={"1.5"}
                borderRadius="xl"
                bgColor="gray.100"
                shadow={3}
                keyboardType='numeric'  // Para exibir o teclado numérico
              />
            </FormControl>

             
          </Box>
          {/* bt entar */}
          <Button  
          style={[styles.botaoEntrar]}
          mb={5}
          bg='black.300'
          mt={10}>
            Entrar
          </Button>
          
          <Box style={styles.msgAlerta}>
            <Image source={exclamacaoIcon} alt="Icone de exclamação"/>
            <Text style={styles.alertaTexto}>
              Acesse sua conta administrador no sistema web para alterar sua senha.
            </Text>
          </Box>

        </VStack>
  );
}

const styles = StyleSheet.create({

    title: {
        fontFamily: TEMAS.fonts['petch_Bold'],
        color:'white',
        fontSize: TEMAS.fontSizes.lg,
        textAlign:'center',
        paddingBottom:40,
      },
    
      titlePreencha: {
        fontSize: 15,
        fontFamily: TEMAS.fonts['petch_Bold'],
        paddingTop:20,
        textAlign:'center',
        marginLeft: 5,
        marginRight: 5,
      }, 
      botaoEntrar: {
        width: '90%',       
        height:50,   
        marginTop:50,        
        marginBottom:150,  
        borderRadius: 10,
        justifyContent: 'center',        
        backgroundColor: TEMAS.colors.black[300], 
        alignSelf: 'center',              
      }, 
      msgAlerta:{
        height:50,
        width: '90%', 
        marginLeft: 30,
        marginRight: 20,
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        
      },
      alertaTexto:{
        marginRight: 50,
        flexWrap:"wrap",
        fontWeight:'semibold',
      },
  });

