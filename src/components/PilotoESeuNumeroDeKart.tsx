import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Box, Text } from 'native-base';
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { TEMAS } from '../style/temas';

interface PilotoESeuNumeroDeKartProps {
  pilotoAtual: any;
  sorteando: boolean;
  numeroSorteado: number | null;
}

const PilotoESeuNumeroDeKart: React.FC<PilotoESeuNumeroDeKartProps> = ({
  pilotoAtual,
  sorteando,
  numeroSorteado,
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  // Função para iniciar a animação de rotação
  const iniciarRotacao = () => {
    spinValue.setValue(0);
    Animated.loop( // Usando loop para animação contínua
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  };

  useEffect(() => {
    if (sorteando) {
      iniciarRotacao();
    } else {
      spinValue.setValue(0); // Reseta a animação quando não está sorteando
    }
  }, [sorteando]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (!pilotoAtual) return null;

  return (
    <Box style={styles.card}>
      <Text style={styles.cardTitulo}>Kart Número</Text>
      <Box style={styles.numeroContainer}>
        {sorteando ? (
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <IconFontAwesome name="spinner" size={100} style={styles.iconeDeLoading} />
          </Animated.View>
        ) : (
          <Text style={styles.numeroSorteado}>{numeroSorteado}</Text>
        )}
      </Box>
      <Text style={styles.pilotoLabel}>Para o piloto(a):</Text>
      <Text style={styles.pilotoNome}>{pilotoAtual.nome} {pilotoAtual.sobrenome}</Text>
    </Box>
  );
};

export default PilotoESeuNumeroDeKart;

const getLineHeight = (fontSize: number) => {
  return Math.round(fontSize * 1.2); 
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '90%',
    height: 420,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 30, 
    marginTop: 10,
  },
  cardTitulo: {
    fontSize: TEMAS.fontSizes.lg,
    lineHeight: getLineHeight(TEMAS.fontSizes.lg),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  numeroContainer: {
    height: 190, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  iconeDeLoading: {
    color: TEMAS.colors.blue[500],
  },
  numeroSorteado: {
    fontSize: 160,
    lineHeight: getLineHeight(160),
    fontFamily: TEMAS.fonts['petch_Bold'],
    color: TEMAS.colors.blue[500],
    textAlign: 'center',
  },
  pilotoLabel: {
    fontSize: TEMAS.fontSizes.lg,
    lineHeight: getLineHeight(TEMAS.fontSizes.lg),
    fontFamily: TEMAS.fonts['petch_Bold'],
    textAlign: 'center',
  },
  pilotoNome: {
    fontSize: TEMAS.fontSizes.xl,
    lineHeight: getLineHeight(TEMAS.fontSizes.xl),
    color: TEMAS.colors.blue[500],
    fontFamily: TEMAS.fonts['petch_Bold'],
    textAlign: 'center',
  },
});
