import { Input, FormControl } from "native-base";

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
        {label && <FormControl.Label>{label}</FormControl.Label>}
        <Input
          placeholder={placeholder}
          size="lg"
          w="100%"
          fontFamily='body'
          borderRadius="lg"
          bgColor="gray.100"
          secureTextEntry={secureTextEntry}
          shadow={3}
          value={value}
          onChangeText={onChangeText}
        />
      </FormControl>
    );
  };