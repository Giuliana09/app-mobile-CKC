import React, { useEffect, useState } from "react";
import { VStack, Image, Input, Box, Text, Select, CheckIcon, FlatList, Button, useToast } from "native-base"; 
import { consultarCorridas, formatarDataCorrida, consultarKartodromos } from '../service/corrida/corridaService'; 
import { IcorridaParametros } from '../service/corrida/IcorridaParametros'; 
import { notificacaoGeral } from '../service/notificacaoGeral'; 
import { Cabecalho } from "../components/Cabecalho"; 
import logoCKC1 from "../assets/logoCKC1.png"; 
import Ionicons from "react-native-vector-icons/Ionicons"; 
import { navegarParaTelaDeInformacoesDoCheckIn } from "../service/corrida/checkInService";
import { StyleSheet } from "react-native";
import { TEMAS } from "../style/temas";
import { useNavigation } from '@react-navigation/native';

export default function Checkout() {
  const [parametros, setParametros] = useState<IcorridaParametros>({
    mes: undefined,
    kartodromo: "",
    pesquisa: ""
  });

  const [corridas, setCorridas] = useState<any[]>([]);
  const [kartodromos, setKartodromos] = useState<any[]>([]); 
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const [selectedMonth, setSelectedMonth] = useState("undefined");
  const [selectedKartodromo, setSelectedKartodromo] = useState("");
  const navigation = useNavigation();

  // Carregar os nomes dos kartodromos na montagem do componente
  useEffect(() => {
    const fetchKartodromos = async () => {
      const response = await consultarKartodromos();
      if (response.status === 200) {
        setKartodromos(response.nomesKartodromos); 
      } else {
        console.error(response.details);
      }
    };

    fetchKartodromos();
  }, []);

  // Faz a busca dinamicamente em caso de mudanças no Filtro de Mes, Kartodromo, Dia ou Nome
  useEffect(() => {
    const fetchCorridas = async () => {
      const response = await consultarCorridas(parametros);
      if (response.status === 200) {
        setCorridas(response.dadosCorridas);
        setError(null);
      } else {
        setError(response.details);
        const notificacao = notificacaoGeral(response.status, response.title, response.details);
        toast.show({
          title: notificacao.title,
          description: notificacao.details,
          backgroundColor: notificacao.background,
        });
      }
    };

    fetchCorridas();
  }, [parametros]); 

  return (
      <VStack style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
        <Cabecalho>
          <Image source={logoCKC1} alt="Logo CKC" width={40} resizeMode="contain" />
        </Cabecalho>

        {/* Barra de pesquisa */}
        <Box style={styles.input_pequisa}>
          <Input
            style={styles.pesquisa}
            placeholder="Pesquisar corrida"
            variant="unstyled"
            InputRightElement={
              <Ionicons name="search" size={20} color={"gray"} style={styles.icone_pesquisa} />
            }
            onChangeText={(text) => setParametros({ ...parametros, pesquisa: text })}
          />
        </Box>

        {/* Componente filtrar (seletor de meses) */}
        <Box style={styles.selectorContainer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Filtrar:</Text>
          <Select
            selectedValue={selectedMonth}
            minWidth={200}
            accessibilityLabel="Mês"
            placeholder="Selecione um mês"
            onValueChange={(itemValue) => {
              setSelectedMonth(itemValue);
              setParametros({ ...parametros, mes: itemValue === "undefined" ? undefined : Number(itemValue) });
            }}          
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />,
            }}
          >
            <Select.Item label="Selecione um Mês" value="undefined" />
            {/* Opções de meses */}
            <Select.Item label="Janeiro" value="1" />
            <Select.Item label="Fevereiro" value="2" />
            <Select.Item label="Março" value="3" />
            <Select.Item label="Abril" value="4" />
            <Select.Item label="Maio" value="5" />
            <Select.Item label="Junho" value="6" />
            <Select.Item label="Julho" value="7" />
            <Select.Item label="Agosto" value="8" />
            <Select.Item label="Setembro" value="9" />
            <Select.Item label="Outubro" value="10" />
            <Select.Item label="Novembro" value="11" />
            <Select.Item label="Dezembro" value="12" />
          </Select>
        </Box>

        {/* Componente filtrar (seletor de Kartodromo) */}
        <Box style={styles.selectorContainer}>
          <Select
            selectedValue={selectedKartodromo}
            minWidth={200}
            accessibilityLabel="Kartódromo"
            onValueChange={(itemValue) => {
              setSelectedKartodromo(itemValue);
              setParametros({ ...parametros, kartodromo: itemValue });
            }}          
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />,
            }}
          >
            <Select.Item label="Selecione um Kartodromo" value="" />
            {kartodromos.map((kartodromo) => (
              <Select.Item key={kartodromo} label={kartodromo} value={kartodromo} />
            ))}
          </Select>
        </Box>

        {/* Lista de corridas */}
        <FlatList
          data={corridas}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={({ item }) => (
            <Box padding={2} borderBottomWidth={1} borderBottomColor="gray.200">
              <Text bold>{item.nome} - {item.campeonato_nome}</Text>
              <Text>{formatarDataCorrida(item.data)}</Text>
              <Button onPress={() => {
                  navegarParaTelaDeInformacoesDoCheckIn(item.id, navigation);
              }}>
                Realizar Check-in
              </Button>
            </Box>
          )}
          ListEmptyComponent={<Text>Nenhuma corrida encontrada.</Text>}
        />
      </VStack>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: TEMAS.colors.gray[300],
  },

  input_pequisa: {
    marginLeft: 20,
    marginBottom: 40, 
  },

  pesquisa: {
    fontSize: TEMAS.fontSizes.md,
    borderRadius: 40,
    backgroundColor: TEMAS.colors.gray[100],
  },

  selectorContainer: {
    marginLeft: 20,
    marginBottom: 10, 
  },

  icone_pesquisa: {
    position: "relative",
    right: 30,
  },
});
