import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatarCategoriaCorrida } from '../service/corrida/corridaService';
import { TEMAS } from '../style/temas';

// Definindo os tipos de classificação
type EstilosCategoria = 'CKC_110' | 'CKC_95' | 'DDL_90';

interface ICategoriasDeCorridas {
  item: {
    classificacao: EstilosCategoria; 
  };
}

// Componente de Categorias de Corridas
const CategoriasDeCorridas: React.FC<ICategoriasDeCorridas> = ({ item }) => {
  return (
    <View>
      <Text style={styles[`card_categoria_${item.classificacao}`]}>
        {formatarCategoriaCorrida(item.classificacao)}
      </Text>
    </View>
  );
};

// Estilos (Coloquei esses só pra nao ficar vazio e fazer teste)
const styles = StyleSheet.create({
  card_categoria_CKC_110: {
    fontFamily: TEMAS.fonts['petch_semiBold'],
    color: TEMAS.colors.blue[500],
  },
  card_categoria_CKC_95: {
    fontFamily: TEMAS.fonts['petch_semiBold'],
  },
  card_categoria_DDL_90: {
    fontFamily: TEMAS.fonts['petch_semiBold'],
  },
});

export default CategoriasDeCorridas;
