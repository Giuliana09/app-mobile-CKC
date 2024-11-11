import React, { useState } from "react";
import { Input, FormControl, IconButton,  HStack } from "native-base";
import { Ionicons } from '@expo/vector-icons';

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
    onChangeText,
  } : InputProps) : JSX.Element {

    const [senhaVisivel, setSenhaVisivel] = useState(secureTextEntry); 

    // Alterna a visibilidade da senha
    const alternarVisibilidadeSenha = () => {
      setSenhaVisivel(!senhaVisivel);
    };

    return (
      <FormControl mb={3}>
        {label &&(
      <FormControl.Label
        _text={{
          fontWeight: 'bold', // Define o peso da fonte
        }}
      >
        {label}
      </FormControl.Label>
    )}
        <HStack alignItems="center">
          <Input
            placeholder={placeholder}
            size="lg"
            w="100%"
            p={"4"}
            mt={"1"}
            fontFamily='body'
            borderRadius="xl"
            bgColor="gray.100"
            shadow={3}
            secureTextEntry={senhaVisivel}
            value={value}
            onChangeText={onChangeText}
          />
          {secureTextEntry && (
            <IconButton 
              onPress={alternarVisibilidadeSenha}
              ml={-16} // Espaçamento direito do ícone
              icon={
                senhaVisivel ? (
                  <Ionicons name="eye-off-outline" size={24} />
                ) : (
                  <Ionicons name="eye" size={24} />
                )
              }
            />
          )}
        </HStack>
      </FormControl>
    );
  };

