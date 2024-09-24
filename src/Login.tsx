import {Image, Text, Box, ScrollView, useToast} from 'native-base'; // VStack é como se fosse a View do react-native
import { StyleSheet, TouchableOpacity } from 'react-native';
import { TEMAS } from './style/temas'; 
import logoCKC1 from './assets/logoCKC1.png'
import { Cabecalho } from './components/Cabecalho';
import { EntradaTexto } from './components/EntradaTexto';
import { Botao } from './components/Botao';
import { useState } from 'react';
import { fazerLogin } from './service/AutenticacaoLogin';
import { useLoadFonts } from './hooks/useLoadFonts';
import { notificacãoLogin } from './service/notificacaoLogin';





export default function Login({navigation} : any ) {

  const[email, setEmail] = useState('')
  const[senha, setSenha] = useState('')
  const toast = useToast()  // toast irá exibir um alerta  pop-up com uma mensagem de erro
 

  async function login(){
    const resultado = await fazerLogin(email, senha);
    console.log('Resultado do login:', resultado);   // Verifique o que está sendo retornado aqui
    
    const notificacao = await notificacãoLogin(); // notificação    
    
    // se a altenticação der certo o usuario será redirecionado para a tela de menu
    if(resultado || resultado === ""){ 
      navigation.navigate('Menu')
    }
    else{ // se der erro, um alerta irá aparecer
      toast.show({
        title: notificacao.title,
        description: notificacao.details,
        backgroundColor:"red.500"
      })
    }
  }

  
  const fontsLoaded = useLoadFonts(); // para verificação do uso da fonte

  if (!fontsLoaded) {
    return null;  // A SplashScreen está sendo gerenciada automaticamente
  }

  return (

    <ScrollView style={style.contrainer} > {/*  Troquei o VStack */}
      {/* cabeçalho com a logo */}
      <Cabecalho>
        <Image source={logoCKC1} alt="Logo CKC" width={40}  resizeMode="contain"/>
      </Cabecalho>

      {/* Titulo */}
      <Text style={style.tituloPage}>
          Login
      </Text>
    
      <Box style={style.inputs} >  
        <EntradaTexto 
        label="Email"
        placeholder="Insira seu endereço de e-mail"
        value={email}
        onChangeText={setEmail}
        />

      <EntradaTexto
        label="Senha"
        placeholder="Insira sua senha"
        value={senha}
        onChangeText={setSenha}
        // secureTextEntry
        />
      </Box>
      
      {/* bt do google */}
      <Box style={style.btGoogle}>
          <TouchableOpacity>
            <Text>Continuar com o Google</Text>
          </TouchableOpacity>
      </Box>

      {/* bt entar */}
      <Botao style={style.btEntrar}
      onPress={login}
      // onPress={ () => navigation.navigate('Menu')}
      >
        Entrar
      </Botao>

      {/* link de esqueci minha senha */}
      <Box style={style.linkSenha}>
        <Text>Esqueceu sua senha?</Text>
          <TouchableOpacity>
            <Text>clique aqui</Text>
          </TouchableOpacity>
      </Box>

    </ScrollView>
  );
}

export const style = StyleSheet.create({
  contrainer:{
    flex: 1,  // flex={1} => quer dizer que a VStack vai ocupar a tela inteira 
    backgroundColor:TEMAS.colors.gray[300]
  },
  tituloPage:{
    fontSize: TEMAS.fontSizes['6xl'],
    fontFamily:TEMAS.fonts['petch_Bold'],
    color: TEMAS.colors.black[300],
    marginBottom: 2
  },
  inputs:{
    flex:4,
    backgroundColor: TEMAS.colors.gray[300], 
    alignItems:'center',
    padding: 5,
  },
  inputEmail:{

  },
  inputSenha:{

  },
  btGoogle:{
    width: '100%',
    flexDirection: 'row',
    backgroundColor:TEMAS.colors.black[300],
  },
  btEntrar:{

  },
  linkSenha:{
     width:'100%',
     flexDirection: 'row'
  }
})