import React from 'react';
import {VStack, Image, Text, Box, FormControl, Input, Button} from 'native-base'; //como se fosse a View do react-native
import { TEMAS } from '../style/temas';
import curva from '../assets/curva.png'
// import { useNavigation } from '@react-navigation/native';
import { Cabecalho } from '../components/Cabecalho';
import logoCKC1 from '../assets/logoCKC1.png';
import { View, TextInput, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { listarDadosParaCheckIn, processarCheckIn, verificarSeJaFezCheckIn } from '../service/corrida/checkInService';
import { formatarDataCorrida, formatarHorarioCorrida } from '../service/corrida/corridaService';
import { notificacaoGeral } from '../service/notificacaoGeral';
import { useToast } from 'native-base';
import CategoriasDeCorridas from '../components/CategoriasDeCorridas';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import largada from "../assets/largada.png";
import { Select, CheckIcon } from "native-base";
import { Botao } from '../components/Botao';
import { Pressable } from 'react-native';



export default function EsqueciSenha({ navigation }: any) {
  // const navigation = useNavigation();

  return (
        // flex={1} => quer dizer que a VStack vai ocupar a tela inteira
        <VStack flex={1} bgColor={TEMAS.colors.gray[300]}>  
             {/* cabeçalho */}
             <Cabecalho>
                <Image source={logoCKC1} alt="Logo CKC" width={40} resizeMode='contain' />
              </Cabecalho>

            <Text style={styles.title}>Esqueci minha senha</Text>
          <Text style={styles.titlePreencha}>Preencha seu e-mail abaixo, te enviaremos um código para que você possa entrar.</Text>

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
          mt={10}
          justifyContent= 'center'
          onPress={() => navigation.navigate('EsqueciSenhaCodigo')}>
            Entrar
          </Button>

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
    paddingTop:5,
    textAlign:'center',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  
  corrida_inf:{
    marginLeft:5,
    flexDirection:'column',
    width:240,
  },

  card_icone: {
    color: TEMAS.colors.black[500],
    alignSelf: "flex-start",
    padding:1,
    fontSize:20,
  },

  logo: {
    width: 110,
    resizeMode: "contain",
  },

  view: {
    flex: 1,
    justifyContent: "center",
  },
  card_img: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight:5,
  },

  card_botao:{
    fontWeight: 'bold',
    marginTop: 10,
    backgroundColor: TEMAS.colors.blue[500],
    borderRadius: 10,
    marginBottom: 20,
    position: 'absolute', 
    bottom: -125, 
  }



});

