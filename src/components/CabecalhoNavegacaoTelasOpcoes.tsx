import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const CabecalhoTelasOpcoes = ({ navigation } : any) => ({
    headerShown: true,
    title: '',
    headerTransparent: true,
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" style={{ marginLeft: 10 }} />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: 'black',
    },
  });

export default CabecalhoTelasOpcoes;