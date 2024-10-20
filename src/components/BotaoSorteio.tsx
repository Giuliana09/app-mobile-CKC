import React from 'react';
import { Button } from 'native-base';
import { TEMAS } from '../style/temas';
import { StyleSheet } from 'react-native';

interface BotaoSorteioProps {
  sorteando: boolean;
  pilotoAtual: any;
  exibiuPiloto: boolean;
  realizarSorteioParaPiloto: (piloto: any) => void;
  passarParaProximoPiloto: () => void;
  botaoTexto: string;
}

const BotaoSorteio: React.FC<BotaoSorteioProps> = ({
  sorteando,
  pilotoAtual,
  exibiuPiloto,
  realizarSorteioParaPiloto,
  passarParaProximoPiloto,
  botaoTexto,
}) => {
  return (
    <Button 
      style={styles.botao} 
      isDisabled={sorteando || !pilotoAtual}
      onPress={() => {
        if (!sorteando) {
          if (!exibiuPiloto) {
            realizarSorteioParaPiloto(pilotoAtual);
          } else {
            passarParaProximoPiloto();
          }
        }
      }}
    >
      {botaoTexto}
    </Button>
  );
};

export default BotaoSorteio;

const styles = StyleSheet.create({
  botao: {
    marginTop: 30,
    width: '60%',
    alignSelf: 'center',
    backgroundColor: TEMAS.colors.blue[500],
    borderRadius: 10,
  },
});
