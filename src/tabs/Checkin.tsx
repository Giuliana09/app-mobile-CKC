import React from "react";
import { useState } from "react";
import { VStack, Image, Input, Box, Text, Select, CheckIcon } from "native-base";
import { StyleSheet } from "react-native";
import { Cabecalho } from "../components/Cabecalho";
import logoCKC1 from "../assets/logoCKC1.png";
import { TEMAS } from "../style/temas";
import Ionicons from "react-native-vector-icons/Ionicons";


export default function Checkin() {
  const [selected, setSelectedValue] = useState("");

  return (
    <VStack style={styles.view}>
        {/* cabeçalho com a logo */}
        <Cabecalho>
          <Image source={logoCKC1} alt="Logo CKC" width={40} resizeMode="contain"/>
        </Cabecalho>

        {/* barra de pesquisa */}
        <Box style={styles.input_pequisa}>
        <Input style={styles.pesquisa}
          placeholder = "Pesquisar corrida"
          variant="unstyled"
          InputRightElement={
            <Ionicons name="search" size={20} color={"gray"} style={styles.icone_pesquisa}/>
          } />
        </Box>

        {/* componente filtrar */}        
        <Box> 
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Filtrar:</Text>         
          <Select
            selectedValue={selected}
            minWidth={200}
            accessibilityLabel="Mês"
            placeholder="Mês"
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />,
            }}
          />
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
        </Box>
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
    flex: 1,
    marginLeft: 20,
    marginVertical: -30,
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
});