import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

// Defina o tipo para os parametros da rota
type ParamList = {
  DetalhesCorridaCheckIn: { idCorrida: number };
};

function DetalhesCorridaCheckIn() {
  const route = useRoute<RouteProp<ParamList, 'DetalhesCorridaCheckIn'>>();
  const { idCorrida } = route.params; 

  console.log("ID da Corrida recebido:", idCorrida);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Corrida</Text>
      <Text>ID da Corrida: {idCorrida}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DetalhesCorridaCheckIn;
