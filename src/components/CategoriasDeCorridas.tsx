import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatarCategoriaCorrida } from '../service/corrida/corridaService';
import { TEMAS } from '../style/temas';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Definindo os tipos de classificação
export type EstilosCategoria = 'CKC_110' | 'CKC_95' | 'DDL_90';

interface ICategoriasDeCorridas {
  item: {
    classificacao: EstilosCategoria | null; 
  };
}

// Componente de Categorias de Corridas
const CategoriasDeCorridas: React.FC<ICategoriasDeCorridas> = ({ item }) => {
  // Verifica se a classificação é válida
  if (!item.classificacao) {
    return <Text>Classificação não disponível</Text>; 
  }

  return (
    <View style={styles[`container_${item.classificacao}`]}>
      <Text style={styles[`card_categoria_${item.classificacao}`]}>
        {formatarCategoriaCorrida(item.classificacao)}
      </Text>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container_CKC_110: {
    backgroundColor: TEMAS.colors.orange[500],
    paddingVertical: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
    width: 80,
  },
  container_CKC_95: {
    backgroundColor: TEMAS.colors.yellow[300],
    paddingVertical: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
    width: 80,
  },
  container_DDL_90: {
    backgroundColor: TEMAS.colors.green[300],
    paddingVertical: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
    width: 80,
  },
  card_categoria_CKC_110: {
    fontSize: TEMAS.fontSizes.xs,
    fontFamily: TEMAS.fonts['petch_Bold'],
    color: TEMAS.colors.black[300],
    alignSelf: 'center',
  },
  card_categoria_CKC_95: {
    fontSize: TEMAS.fontSizes.xs,
    fontFamily: TEMAS.fonts['petch_Bold'],
    color: TEMAS.colors.black[300],
    alignSelf: 'center',
  },
  card_categoria_DDL_90: {
    fontSize: TEMAS.fontSizes.xs,
    fontFamily: TEMAS.fonts['petch_Bold'],
    color: TEMAS.colors.black[300],
    alignSelf: 'center',
  },
});

export default CategoriasDeCorridas;
