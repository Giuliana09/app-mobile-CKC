import { Alert } from "react-native";
import { navegarParaTelaSemParametrosENavigator } from "../navegacao/navegacaoService";

export function confirmarLogoffENavegar(navigation: any) {
    Alert.alert(
        "Confirmação de Logoff",
        "Você realmente deseja fazer logoff?",
        [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "Sim",
                onPress: () => navegarParaTelaSemParametrosENavigator(navigation, 'Login')
            }
        ]
    );
}