import React, { useState, memo, useCallback } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { VStack, Text, Image, Button, FlatList, useToast } from "native-base";
import { Cabecalho } from "../../components/Cabecalho";
import { TEMAS } from "../../style/temas";
import logoCKC1 from "../../assets/logoCKC1.png";
import { Dimensions, StyleSheet } from "react-native";
import { navegarParaTelaComParametros } from "../../service/navegacao/navegacaoService";
import { notificacaoGeral } from "../../service/notificacaoGeral";

type ParamList = {
  ListaDeKartsSelecionar: {
    maiorNumeroDeKart: number,
    idCorrida: number,
    qtdDePessoasComCheckIn: number
  };
};

const KartButton = memo(({ item, isSelected, onPress }: { item: number, isSelected: boolean, onPress: () => void }) => {
  return (
    <Button
      onPress={onPress}
      style={[styles.numeroKartBotao, isSelected && styles.numeroKartBotaoSelected]}
    >
      <Text style={styles.kartText}>{item}</Text>
    </Button>
  );
});

export default function ListaDeKartsSelecionar() {
  const route = useRoute<RouteProp<ParamList, 'ListaDeKartsSelecionar'>>();
  const { maiorNumeroDeKart, idCorrida, qtdDePessoasComCheckIn } = route.params;
  const [numerosForaDoSorteio, setNumerosForaDoSorteio] = useState<number[]>([]);
  const toast = useToast();
  const navigation = useNavigation();

  const handleSelectKart = useCallback((numero: number) => {
    setNumerosForaDoSorteio(prevState =>
      prevState.includes(numero)
        ? prevState.filter(num => num !== numero)
        : [...prevState, numero]
    );
  }, []);

  const renderKartButton = ({ item }: { item: number }) => {
    const isSelected = numerosForaDoSorteio.includes(item);
    return (
      <KartButton
        item={item}
        isSelected={isSelected}
        onPress={() => handleSelectKart(item)}
      />
    );
  };

  const handleContinuar = () => {
    const numerosParaSorteio = maiorNumeroDeKart - numerosForaDoSorteio.length;
    const faltando = qtdDePessoasComCheckIn - numerosParaSorteio;

    if (numerosParaSorteio < qtdDePessoasComCheckIn) {
      const mensagem = `Não é possível realizar o sorteio, pois faltará ${faltando} número(s) para todos os pilotos com check-in feito [${qtdDePessoasComCheckIn}]`;
      const notificacao = notificacaoGeral(400, "Erro no Sorteio", mensagem);
      toast.show({
        title: notificacao.title,
        description: notificacao.details,
        backgroundColor: notificacao.background,
      });
      return;
    }

    // Navegar para a próxima tela passando os numeros Fora do sorteio, id corrida e qtd de pessoas com Check-in
    navegarParaTelaComParametros(navigation, 'SortearStack', 'ListaDeKartsConfirmarExclusao', {
      numerosForaDoSorteio: numerosForaDoSorteio,
      maiorNumeroDeKart: maiorNumeroDeKart,
      idCorrida: idCorrida,
      qtdDePessoasComCheckIn: qtdDePessoasComCheckIn
    });
  };

  return (
    <VStack flex={1} style={styles.view}>
      <Cabecalho key="cabecalho">
        <Image source={logoCKC1} alt="Logo CKC" width={40} resizeMode="contain" />
      </Cabecalho>
      <VStack>
            <Text style={styles.titulo}>Lista de Karts</Text>
            <Text style={styles.subtitulo}>Pilotos com Check-in feito [{qtdDePessoasComCheckIn}]</Text>
            <Text style={styles.texto}>Selecione os números que deseja retirar do sorteio:</Text>
          </VStack>
      <FlatList
        data={Array.from({ length: maiorNumeroDeKart }, (_, i) => i + 1)}
        keyExtractor={(item) => item.toString()}
        numColumns={3}
        initialNumToRender={8}
        maxToRenderPerBatch={4}
        contentContainerStyle={styles.contentContainerStyle}
        windowSize={10}
        renderItem={renderKartButton}
        ListFooterComponent={
          <VStack>
            <Button style={styles.botao} onPress={handleContinuar}>
              Confirmar seleção
            </Button>
          </VStack>
        }
      />
    </VStack>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: TEMAS.colors.gray[300],
  },
  titulo: {
    marginTop: 60,
    fontSize: TEMAS.fontSizes.lg,
    fontFamily: TEMAS.fonts['petch_Bold'],
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: TEMAS.fontSizes.md,
    fontFamily: TEMAS.fonts['petch_Bold'],
    marginBottom: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  texto: {
    marginTop: 10,
    fontSize: TEMAS.fontSizes.sm,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingBottom: 20,
  },
  numeroKartBotao: {
    backgroundColor: TEMAS.colors.blue[500],
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  numeroKartBotaoSelected: {
    backgroundColor: TEMAS.colors.red[500],
  },
  kartText: {
    color: TEMAS.colors.white,
    fontSize: TEMAS.fontSizes.lg,
    fontFamily: TEMAS.fonts['petch_Bold'],
  },
  botao: {
    marginTop: 20,
    backgroundColor: TEMAS.colors.blue[500],
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
  },
});
