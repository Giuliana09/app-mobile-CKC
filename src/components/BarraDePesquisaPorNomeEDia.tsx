import React from "react";
import { Box, Input, Button } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { TEMAS } from "../style/temas";

interface BarraDePesquisaPorNomeEDiaProps {
    pesquisa: string;
    onChange: (text: string) => void;
}

const BarraDePesquisaPorNomeEDia: React.FC<BarraDePesquisaPorNomeEDiaProps> = ({
    pesquisa,
    onChange
}) => {
    return (
        <Box style={styles.input_pequisa}>
            <Input
                style={styles.pesquisa}
                placeholder="Pesquisar corrida"
                variant="unstyled"
                value={pesquisa}
                onChangeText={onChange}
                InputRightElement={
                    <Ionicons style={styles.icone_pesquisa} name="search" size={20} color={"gray"} />
                }
            />
        </Box>
    );
};

// Estilos do componente
const styles = StyleSheet.create({
    input_pequisa: {
        position: "relative",
        marginLeft: 20,
        marginVertical: -30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    pesquisa: {
        borderRadius: 20,
        backgroundColor: TEMAS.colors.gray[100],
    },

    icone_pesquisa: {
        position: "relative",
        right: 30,
    },
});

export default BarraDePesquisaPorNomeEDia;
