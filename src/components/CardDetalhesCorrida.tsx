import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatarDataCorrida, formatarHorarioCorrida } from '../service/corrida/corridaService';
import CategoriasDeCorridas from './CategoriasDeCorridas'; // Ajuste o caminho conforme necessário
import { TEMAS } from '../style/temas';

interface CardDetalhesCorridaProps {
  corrida: {
    nome: string;
    campeonato: {
      nome: string;
    };
    classificacao: 'CKC_110' | 'CKC_95' | 'DDL_90' | null;
    data: string;
    horario: string;
  };
}

const CardDetalhesCorrida: React.FC<CardDetalhesCorridaProps> = ({ corrida }) => {
  return (
    <View style={styles.card_itens}>
      <Image style={styles.card_img} source={require('../assets/largada.png')} alt="largada dos karts" />
      <View style={styles.card_infos}>
        <Text style={styles.card_titulo}>{corrida.nome} - {corrida.campeonato.nome}</Text>
        <CategoriasDeCorridas item={{ classificacao: corrida.classificacao }} />
        <View style={styles.card_row}>
          <Ionicons size={16} style={styles.card_icone} name="calendar-clear-outline" />
          <Text style={styles.card_texto}>{formatarDataCorrida(corrida.data)}</Text>
        </View>
        <View style={styles.card_row}>
          <Ionicons size={16} style={styles.card_icone} name="time-outline" />
          <Text style={styles.card_texto}>{formatarHorarioCorrida(corrida.horario)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card_itens: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: TEMAS.colors.white,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  card_img: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  card_infos: {
    flex: 1,
    marginLeft: 10,
  },
  card_titulo: {
    fontSize: TEMAS.fontSizes.md,
    fontFamily: TEMAS.fonts['petch_semiBold'],
  },
  card_icone: {
    color: TEMAS.colors.black[500],
    marginRight: 5,
  },
  card_texto: {
    color: TEMAS.colors.black[500],
    fontSize: TEMAS.fontSizes.sm,
    fontFamily: TEMAS.fonts['body'],
  },
  card_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CardDetalhesCorrida;
