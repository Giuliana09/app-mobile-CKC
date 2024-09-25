import {Image, Text, Box, ScrollView, useToast} from 'native-base'; // VStack é como se fosse a View do react-native
import { StyleSheet, TouchableOpacity } from 'react-native';
import { TEMAS } from './style/temas'; 
import logoCKC1 from './assets/logoCKC1.png'
import logoGoogle from './assets/logoGoogle.png'
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

    <ScrollView contentContainerStyle={style.contrainer} > {/*  Troquei o VStack */}
      {/* cabeçalho com a logo */}
      <Cabecalho style={style.cabecalho}>
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
      <Box style={style.botoes}>
        {/* bt do google */}
        <Box style={style.btGoogle}>
          <Image source={logoGoogle}  alt="Logo da google" />
            <TouchableOpacity >
              <Text style={style.btGoogleTexto}>Continuar com o Google</Text>
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
          <Text>Esqueceu sua senha? </Text>
            <TouchableOpacity>
              <Text style={style.linkSenhaClick}>clique aqui</Text>
            </TouchableOpacity>
        </Box>
      </Box>
    </ScrollView>
  );
}

export const style = StyleSheet.create({
  contrainer:{
    flex: 1,  // flex={1} => quer dizer que a VStack vai ocupar a tela inteira 
    backgroundColor:TEMAS.colors.gray[300]
  },

  cabecalho:{
    flex: 3,
  },

  tituloPage:{
    marginTop: 24,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: TEMAS.fontSizes['6xl'],
    fontFamily:TEMAS.fonts['petch_Bold'],
    color: TEMAS.colors.black[300],
    marginBottom: 2,

  },
  inputs:{
    flex:4,
    padding: 5,
    margin: 18,
    alignItems:'center',
    backgroundColor: TEMAS.colors.gray[300], 
  },

  botoes:{
    alignItems:'center',
    justifyContent: 'center',
    marginBottom:30,
    marginTop: -70,
  },

  btGoogle:{
    padding: 15,
    width: '90%',
    gap: 7,
    marginBottom: -10,
    flexDirection: 'row',
    alignItems:'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: TEMAS.fontSizes.sm,
    backgroundColor:TEMAS.colors.black[300],
  },
  
  btGoogleTexto:{
    width: '100%',
    textAlign: 'center',
    flexDirection: 'row',
    color:TEMAS.colors.white, 
    fontSize:TEMAS.fontSizes.sm,
  },
  
  btEntrar:{
    padding: 15,
    width: '90%',
    marginBottom:40,
    flexDirection: 'row',
    textAlign: 'center',
    alignItems:'center',
    justifyContent: 'center',
    fontSize:TEMAS.fontSizes.sm,
    borderRadius: TEMAS.fontSizes.sm,
    backgroundColor:TEMAS.colors.black[300],
    
  },
  
  linkSenha:{
    fontSize: TEMAS.fontSizes.sm,
    width:'100%',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
  },
  linkSenhaClick:{
    fontFamily:TEMAS.fonts['petch_Bold'],
  },
})