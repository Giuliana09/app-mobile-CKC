import { VStack, Text } from "native-base";
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { listarDadosParaCheckIn, processarCheckIn, verificarSeJaFezCheckIn } from '../service/corrida/checkInService';
import { formatarDataCorrida, formatarHorarioCorrida } from '../service/corrida/corridaService';
import { notificacaoGeral } from '../service/notificacaoGeral';
import { Box, useToast } from 'native-base';
import CategoriasDeCorridas from '../components/CategoriasDeCorridas';
import { TEMAS } from "../style/temas";
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Image  } from "native-base";
import { Cabecalho } from "../components/Cabecalho";
import logoCKC1 from '../assets/logoCKC1.png';
import { confirmarLogoffENavegar } from "../service/perfil/perfilService";

export default function Perfil() {
  const navigation = useNavigation();
  
  return (
    <VStack>
      <View style={styles.background}>
      <Cabecalho>
      <Image style={styles.logo} source={logoCKC1} alt="Logo CKC"/>
        </Cabecalho>
        <Ionicons style={styles.iconPerfil} name="person-circle-outline"></Ionicons>
      <View style={styles.container}>
        <Text style={{fontFamily: TEMAS.fonts['petch_Bold'], fontSize: 20, alignSelf:'center'}}> Perfil    </Text>
      </View>
      <TouchableOpacity style={styles.botao} onPress={() => confirmarLogoffENavegar(navigation)}>
        <Text style={styles.textoBotao}>
          Log out
        </Text>
        <Ionicons style={styles.iconSair} name="log-in-outline"></Ionicons>
      </TouchableOpacity>
      </View>
    </VStack>
  );
}

const styles = StyleSheet.create({
  

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: TEMAS.fonts['petch_Bold'],
    paddingLeft: 20,
    top: -50,
  },

  background: {
    backgroundColor: TEMAS.colors.gray[300],
    height:850,
    fontFamily: TEMAS.fonts['petch_Bold'],
  },

  logo: {
    width: 70,
    resizeMode: "contain",
    alignSelf:'flex-start',
    top:-60,
    paddingLeft: 6,
  },

  title: {
    fontSize: 100,
    fontFamily: TEMAS.fonts['petch_Bold'],
    color:'black',
    top:30,
  },

  iconPerfil: {
    color: 'white',
    padding:1,
    fontSize:100,
    top:-90,
    alignSelf:'center',
  },

  iconSair: {
    color: 'white',
    fontSize:30,
  },

  botao: {
    fontWeight: 'bold',
    marginTop: 10,
    backgroundColor: TEMAS.colors.blue[500],
    borderRadius: 10,
    marginBottom: 20,
    position: 'absolute', 
    bottom: 30,
    height:55,
    width:200,
    alignContent:'center',
    justifyContent:'center',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',

  },

textoBotao:{
    fontFamily: TEMAS.fonts['petch_Bold'],
    color:'white',
    textAlign: "center",
    fontSize: 15,
    padding:5
},

})