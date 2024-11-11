import React from 'react';
import { Image, Text, Box, FormControl, Input, Button, ScrollView} from 'native-base'; //como se fosse a View do react-native
import { TEMAS } from '../style/temas';
import { Cabecalho } from '../components/Cabecalho';
import logoCKC1 from '../assets/logoCKC1.png';
import { StyleSheet} from 'react-native';
// import { useNavigation } from '@react-navigation/native';




export default function EsqueciSenha({ navigation }: any) {
  // const navigation = useNavigation();

  return (
        // flex={1} => quer dizer que a VStack vai ocupar a tela inteira
        <ScrollView flex={1} bgColor={TEMAS.colors.gray[300]}>  
             {/* cabeçalho */}
             <Cabecalho>
                <Image source={logoCKC1} alt="Logo CKC" width={40} resizeMode='contain' />
              </Cabecalho>

            <Text style={styles.title}>Esqueci minha senha</Text>
          <Text style={styles.titlePreencha}>Preencha seu e-mail abaixo, te enviaremos um código para que você possa entrar.</Text>

          <Box flex={5} backgroundColor={TEMAS.colors.gray[300]} alignItems="center"  p={5} >  
          
            <FormControl mt={2}>
              <FormControl.Label _text={{ fontWeight: 'bold' }}>CPF:</FormControl.Label>
              <Input 
                placeholder='000 000 000 00'
                size='lg'
                w="100%"
                p={"4"}
                mt={"1.5"}
                borderRadius="xl"
                bgColor="gray.100"
                shadow={3}
                keyboardType='numeric'  // Para exibir o teclado numérico
              />
            </FormControl>

              {/* compo de Email */}
            <FormControl mt={3}>
              <FormControl.Label _text={{ fontWeight: 'bold', marginTop:5 }}>Email:</FormControl.Label>
              <Input 
                placeholder='Insira seu email aqui'
                /* tamanho do texto dentro do input */
                size='lg'
                w="100%"
                p={"4"}
                mt={"1.5"}
                borderRadius="xl"
                bgColor="gray.100"
                //sombra  
                shadow={3}
              />
            </FormControl>
          </Box>
          {/* bt entar */}
          <Button style={[styles.botaoEntrar]}
           onPress={() => navigation.navigate('EsqueciSenhaCodigo')}> Entrar</Button>
          <Text style={styles.msgAviso}>Você poderá solicitar o código novamente em 2 minutos, após a primeira tentativa.</Text>
        </ScrollView>
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
    marginBottom:80,  
    borderRadius: 10,
    justifyContent: 'center',        
    backgroundColor: TEMAS.colors.black[300], 
    alignSelf: 'center',              
  },
  msgAviso:{
    height:50,
    width: '90%', 
    marginLeft: 20,
    marginBottom:10,  
    flexDirection:'row',
    textAlign:'center',
    fontSize: TEMAS.fontSizes.sm
  },
});

