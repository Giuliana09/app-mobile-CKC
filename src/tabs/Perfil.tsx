import React from "react";
import { VStack, Text, Box } from "native-base";
import {  useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { confirmarLogoffENavegar } from "../service/perfil/perfilService";
import { Cabecalho } from "../components/Cabecalho";
import perfil from "../assets/perfil.jpg";
import { TEMAS } from "../style/temas";
import Ionicons from "react-native-vector-icons/Ionicons";




export default function Perfil() {
  const navigation = useNavigation();
  
  return (
    <VStack style={styles.view}>
      <Cabecalho key="cabecalho">
        <Image style={styles.foto} source={perfil} alt="piloto de kart" />
      </Cabecalho>
      <Text style={styles.titulo} fontSize="5xl">olá, Thiago!</Text>

      <Box style={styles.box}>
        <Text style={styles.texto}>Vá até Check-in e escolha uma corrida para começar!</Text>
        <Box style={styles.box_icone}>
          <Ionicons style={styles.icone1} name="rocket-outline"></Ionicons>
          <Ionicons style={styles.icone_check} name="checkmark-outline"></Ionicons>
        </Box>
      </Box>

      <Box style={styles.box}>
        <Text style={styles.texto}>Você já fez o Check-in? Então agora vá para Sortear os kart e boa sorte!</Text>
        <Box style={styles.box_icone}>
          <Ionicons style={styles.icone2} name="dice-outline"></Ionicons>
          <Ionicons style={styles.icone_check} name="checkmark-outline"></Ionicons>
        </Box>
      </Box>

      <Box style={styles.box}>
        <Text style={styles.texto}>A corrida acabou? Então vá para Check-out para finalizar e já pensar na próxima!</Text>
        <Box style={styles.box_icone}>
          <Ionicons style={styles.icone3} name="trophy-outline"></Ionicons>
          <Ionicons style={styles.icone_check} name="checkmark-outline"></Ionicons>
        </Box>
      </Box>

      <Text style={styles.texto}>Ou click no botão para sair.</Text>

      <TouchableOpacity style={styles.botao} onPress={() => confirmarLogoffENavegar(navigation)}>
        <Text style={styles.textoBotao}>Sair</Text>
      </TouchableOpacity>
    </VStack>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: TEMAS.colors.gray[300],
  },

  foto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: TEMAS.colors.gray[300],
  },

  titulo: {
    fontFamily: TEMAS.fonts['petch_Bold'],
    color: TEMAS.colors.black[300],
    textAlign: "center",
    marginTop: 60,
  },

  texto: {
    fontFamily: TEMAS.fonts['body'],
    fontSize: TEMAS.fontSizes.md,
    textAlign: "center",
  },

  box: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 20,
  },

  box_icone: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  icone1: {
    fontSize: TEMAS.fontSizes.xl,
    color: TEMAS.colors.red[300],
    marginLeft: 10,
  },

  icone2: {
    fontSize: TEMAS.fontSizes.xl,
    color: TEMAS.colors.green[300],
    marginLeft: 10,
  },

  icone3: {
    fontSize: TEMAS.fontSizes.xl,
    color: TEMAS.colors.orange[300],
    marginLeft: 10,
  },

  icone_check: {
    fontSize: TEMAS.fontSizes.xl,
    color: TEMAS.colors.black[300],
  },

  botao: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 100,
    marginVertical: 20,
    backgroundColor: TEMAS.colors.blue[500],
  },

  textoBotao: {
    color: TEMAS.colors.white,
    fontSize: TEMAS.fontSizes.md,
    fontFamily: TEMAS.fonts['petch_Bold'],
    textAlign: "center",
  },
});
  

  