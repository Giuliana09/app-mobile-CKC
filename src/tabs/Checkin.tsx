import React, { useEffect, useState } from "react";
import { Image, Input, Box, Text, Select, CheckIcon, FlatList, Button, useToast, VStack } from "native-base"; 
import { consultarCorridas, formatarDataCorrida, consultarKartodromos } from '../service/corrida/corridaService'; 
import { IcorridaParametros } from '../service/corrida/IcorridaParametros'; 
import { notificacaoGeral } from '../service/notificacaoGeral'; 
import { Cabecalho } from "../components/Cabecalho"; 
import logoCKC1 from "../assets/logoCKC1.png";
import largada from "../assets/largada.png"; 
import Ionicons from "react-native-vector-icons/Ionicons"; 
import { navegarParaTelaDeInformacoesDoCheckIn } from "../service/corrida/checkInService";
import { StyleSheet } from "react-native";
import { TEMAS } from "../style/temas";
import { useNavigation } from '@react-navigation/native';

export default function Checkin() {
  const [parametros, setParametros] = useState<IcorridaParametros>({
    mes: undefined,
    kartodromo: "",
    pesquisa: ""
  });

  const [corridas, setCorridas] = useState<any[]>([]);
  const [kartodromos, setKartodromos] = useState<any[]>([]); 
  const [errorCorridas, setErrorCorridas] = useState<string | null>(null);
  const [errorKartodromos, setErrorKartodromos] = useState<string | null>(null);
  const [temLogKartodromosError, setTemLogKartodromosError] = useState(false);
  const toast = useToast();
  const [selectedMonth, setSelectedMonth] = useState("undefined");
  const [selectedKartodromo, setSelectedKartodromo] = useState("");
  const navigation = useNavigation();

  // Carregar os nomes dos kartodromos na montagem do componente
  useEffect(() => {
    const fetchKartodromos = async () => {
      const response = await consultarKartodromos();
      if (response.status === 200 && Array.isArray(response.nomesKartodromos)) {
        setKartodromos(response.nomesKartodromos);
        setErrorKartodromos(null);
      } else {
        setErrorKartodromos(response?.details || "Erro ao carregar nomes dos Kartodromos.");
        setTemLogKartodromosError(true);
      }
    };

    fetchKartodromos();
  }, []);

  // Faz a busca dinamicamente em caso de mudanças no Filtro de Mes, Kartodromo, Dia ou Nome
  useEffect(() => {
    const fetchCorridas = async () => {
      const response = await consultarCorridas(parametros);
      if (response.status === 200 && Array.isArray(response.dadosCorridas)) {
        setCorridas(response.dadosCorridas); 
        setErrorCorridas(null);
      } else {
        setErrorCorridas(response.details);
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

  // Log de erros de corridas
  useEffect(() => {
    if (errorCorridas) {
      console.log("Resposta ao carregar as Corridas: ", errorCorridas);
    }
  }, [errorCorridas]);

  return (
    <FlatList
      data={corridas}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={(
        <VStack>
          <Cabecalho key="cabecalho">
            <Image source={logoCKC1} alt="Logo CKC" width={40} resizeMode="contain" />
          </Cabecalho>

          {/* Barra de pesquisa */}
          <Box style={styles.input_pequisa} key="filtroPesquisa">
            <Input
              style={styles.pesquisa}
              placeholder="Pesquisar corrida"
              variant="unstyled"
              InputRightElement={
                <Ionicons style={styles.icone_pesquisa} name="search" size={20} color={"gray"} />
              }
              onChangeText={(text) => setParametros({ ...parametros, pesquisa: text })}
            />
          </Box>

          {/* Componente filtrar (seletor de meses) */}
          <Text style={styles.titulo_filtrar}>Filtrar:</Text>
          <Box style={styles.seletores}>          
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
                bg: "blue.400",
                endIcon: <CheckIcon size={5} color="#fff" />,
              }}
              fontSize={TEMAS.fontSizes.sm}
              borderColor={TEMAS.colors.black[300]}
              borderRadius={12}
              backgroundColor="#636363"
              color={TEMAS.colors.white}
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
          <Box style={styles.seletores} >
            <Select
              selectedValue={selectedKartodromo}
              minWidth={200}
              accessibilityLabel="Kartódromo"
              onValueChange={(itemValue) => {
                setSelectedKartodromo(itemValue);
                setParametros({ ...parametros, kartodromo: itemValue });
              }}          
              _selectedItem={{
                bg: "blue.400",
                endIcon: <CheckIcon size={5} color="#fff" />,
              }}
              fontSize={TEMAS.fontSizes.sm}
              borderColor={TEMAS.colors.black[300]}
              borderRadius={12}
              backgroundColor="#636363"
              color={TEMAS.colors.white}
            >
              <Select.Item label="Selecione um Kartodromo" value="" />
              {kartodromos.length > 0 && Array.isArray(kartodromos) && !errorKartodromos ? (
                kartodromos.map((kartodromo) => (
                  <Select.Item key={`${kartodromo}`} label={kartodromo} value={kartodromo} />
                ))
              ) : (
                !temLogKartodromosError && (
                  <>
                    {console.log("Resposta ao carregar os nomes do Kartodromo: ", errorKartodromos)}
                    {setTemLogKartodromosError(true)}
                  </>
                )
              )}
            </Select>
          </Box>
          <Text style={styles.titulo_proximas}>Próximas Corridas:</Text>
        </VStack>
      )}
      renderItem={({ item }) => (
        <Box style={styles.card_itens}>
          <Image style={styles.card_img} source={largada} alt="largada dos karts" />
          <Box style={styles.card_infos}>
            <Text style={styles.card_titulo}>{item.nome} - {item.campeonato_nome}</Text>
            <Text style={styles.card_data}>{formatarDataCorrida(item.data)}</Text>
            <Button style={styles.card_botao} onPress={() => {
              navegarParaTelaDeInformacoesDoCheckIn(item.id, navigation);
            }}>
              Fazer Check-in
            </Button>
          </Box>
        </Box>
      )}
      ListEmptyComponent={
        <Text style={styles.aviso}>
          Nenhuma corrida encontrada.
          <Ionicons key="aviso-icone" style={styles.aviso_icone} name="cog-outline" />
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: TEMAS.colors.gray[300],
  },

  input_pequisa: {
    position: "relative",
    marginHorizontal: 30,
    marginVertical: -30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  pesquisa: {
    fontSize: TEMAS.fontSizes.md,
    borderRadius: 40,
    backgroundColor: TEMAS.colors.gray[100],
  },

  icone_pesquisa: {
    position: "relative",
    right: 30,
  },

  titulo_filtrar: {
    marginTop: 40,
    marginLeft: 30,
    marginBottom: 10,
    fontSize: TEMAS.fontSizes.md,
    color: TEMAS.colors.gray[900],
  },

  seletores: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },

  titulo_proximas: {
    marginTop: 20,
    marginLeft: 30,
    fontSize: TEMAS.fontSizes.md,
    color: TEMAS.colors.gray[900],
  },

  card_itens: {
    flexDirection: "row",
    marginHorizontal: 30,
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: TEMAS.colors.gray[100],
  },

  card_img: {
    width: "40%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },

  card_infos: {
    flex: 1,
    padding: 20,
  },

  card_titulo: {
    fontSize: TEMAS.fontSizes.sm,
    fontWeight: "bold",
    color: TEMAS.colors.gray[900],
  },

  card_data: {
    fontSize: TEMAS.fontSizes.sm,
    marginVertical: 5,
    color: TEMAS.colors.gray[900],
  },

  card_botao: {
    marginTop: 10,
    backgroundColor: TEMAS.colors.blue[400],
    borderRadius: 10,
  },

  aviso: {
    marginTop: 20,
    marginLeft: 30,
    fontSize: TEMAS.fontSizes.md,
    color: TEMAS.colors.gray[900],
  },

  aviso_icone: {
    fontSize: TEMAS.fontSizes.lg,
    color: TEMAS.colors.gray[900],
  }
});
