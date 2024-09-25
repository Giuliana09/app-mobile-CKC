import { Input, FormControl } from "native-base";
import { StyleSheet, TextStyle } from "react-native";
import { TEMAS } from "../style/temas";

interface InputProps {
    readonly label?: string;
    readonly placeholder: string;
    readonly secureTextEntry?: boolean;
    // readonly leftIcon?: React.ReactNode;
    readonly value?: string;
    readonly onChangeText?: (text: string) => void;
  }

export function EntradaTexto ({ 
    label, 
    placeholder, 
    secureTextEntry = false,
    value,
    onChangeText
  } : InputProps) : JSX.Element {
    return (
      <FormControl mb={3}>
        {label && <FormControl.Label style={style.label}>{label}</FormControl.Label>}
        <Input
          placeholder={placeholder}
          size="lg"
          w="100%"
          p={"4"}
          fontFamily='body'
          borderRadius="xl"
          bgColor="gray.100"
          secureTextEntry={secureTextEntry}
          shadow={3}
          value={value}
          onChangeText={onChangeText}
        />
      </FormControl>
    );
  };

  export const style = StyleSheet.create({
    label: {
      fontWeight: "bold",
      fontSize:TEMAS.fontSizes.sm,
      fontFamily: TEMAS.fonts['petch_Bold'], // Fonte customizada que você já está usando
    } as TextStyle,
  })