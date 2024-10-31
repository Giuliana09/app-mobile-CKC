import React from 'react';
import { useState } from 'react';
import { ScrollView, useToast, Image, Text, Box } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { notificacaoLogin } from './service/login/notificacaoLogin';
import { fazerLogin } from './service/login/AutenticacaoLogin';
import { useLoadFonts } from './hooks/useLoadFonts';
import { Cabecalho } from './components/Cabecalho';
import logoCKC1 from './assets/logoCKC1.png';
import { TEMAS } from './style/temas';
import { EntradaTexto } from './components/EntradaTexto';
import { Botao } from './components/Botao';


export default function Login({ navigation }: any) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const toast = useToast();

  async function login() {
    const resultado = await fazerLogin(email, senha);
    const notificacao = notificacaoLogin(resultado?.status, resultado?.title, resultado?.details);
    
    if (resultado?.status === 200) {
      navigation.navigate('Menu');
    } else {
      // Exibindo os Detalhes do erro no Console
      console.log("Status Code do Erro: ", resultado?.status);
      console.log("Titulo do Erro:", resultado?.title);
      console.log("Detalhes: ", resultado?.details);
      //console.log("variavel", process.env.MY_IP);
    }

    // Exibindo a notificação em casos de Sucesso e Erro
    toast.show({
      title: notificacao.title,
      description: notificacao.details,
      backgroundColor: notificacao.background,
    });
    
  }

  
  const fontsLoaded = useLoadFonts();
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={style.container}>
      {/* cabeçalho com a logo */}
      <Cabecalho>
        <Image source={logoCKC1} alt="Logo CKC" width={40} resizeMode='contain' />
      </Cabecalho>

      {/* titulo */}
      <Text style={style.tituloPag} fontSize="6xl">Login</Text>

      {/* inputs */}
      <Box style={style.inputs}>
        <EntradaTexto
          label="Email"
          placeholder="Insira seu endereço de e-mail"
          value={email}
          onChangeText={setEmail}
        />

        <EntradaTexto
          label="Senha"
          placeholder="Insira sua senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />
      </Box>

      {/* botão */}
      <Box style={style.botoes}>
        <Botao style={style.btEntrar}
          onPress={login}
        //onPress={navigation.navigate('Menu')}
        >Entrar</Botao>
      </Box>

      {/* link de esqueci a senha */}
      <Box style={style.linkSenha}>
        <Text style={style.linkSenhaTexto}>Esqueceu sua senha?</Text>
        <TouchableOpacity>
          <Text style={style.linkSenhaClick}>Clique aqui</Text>
        </TouchableOpacity>
      </Box>
    </ScrollView>
  );
}

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TEMAS.colors.gray[300],
  },

  tituloPag: {
    fontFamily: 'ChakraPetch-Bold',
    color: TEMAS.colors.black[300],
    textAlign: 'center',
    marginTop: 60,
  },

  inputs: {
    flex: 4,
    padding: 5,
    margin: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TEMAS.colors.gray[300],
  },

  botoes: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  btEntrar: {
    height: 50,
    width: '90%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: TEMAS.fontSizes.sm,
    borderRadius: TEMAS.fontSizes.sm,
    backgroundColor: TEMAS.colors.black[300],
  },

  linkSenha: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  linkSenhaTexto: {
    fontSize: TEMAS.fontSizes.md,
    marginHorizontal: 5,
  },

  linkSenhaClick: {
    fontSize: TEMAS.fontSizes.md,
    fontFamily: 'ChakraPetch-Bold',
  },
});