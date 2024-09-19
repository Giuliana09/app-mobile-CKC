import {VStack, Image, Text, Box} from 'native-base'; // VStack é como se fosse a View do react-native
import { TouchableOpacity } from 'react-native';
import { TEMAS } from './style/temas'; 
import logoCKC1 from './assets/logoCKC1.png'
import { Cabecalho } from './components/Cabecalho';
import { EntradaTexto } from './components/EntradaTexto';
import { Botao } from './components/Botao';
import { useState } from 'react';
import { fazerLogin } from './service/AutenticacaoLogin';
import { useLoadFonts } from './hooks/useLoadFonts';





export default function Login({navigation} : any ) {

  const[email, setEmail] = useState('')
  const[senha, setSenha] = useState('')

  async function login(){
    const resultado = await fazerLogin(email, senha)
    // Verifique o que está sendo retornado aqui
    console.log('Resultado do login:', resultado);  
    
    if(resultado || resultado === ""){
      navigation.navigate('Menu')
    }
    else{
      console.log('Erro')
    }
  }

  // para verificação do uso da fonte
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null;  // A SplashScreen está sendo gerenciada automaticamente
  }

  return (
        // flex={1} => quer dizer que a VStack vai ocupar a tela inteira                                                                               
        <VStack flex={1} backgroundColor={TEMAS.colors.gray[300]} justifyContent="center">
          {/* cabeçalho com a logo */}
          <Cabecalho>
            <Image source={logoCKC1} alt="Logo CKC" width={40}  resizeMode="contain"/>
            {/* Titulo */}
          </Cabecalho>

         
          {/* Titulo */}
          <Text 
          fontSize="6xl"
          fontFamily="petch_Bold"
          textAlign="center"        
      
          color="black"
          mb={2}
          >
              Login
          </Text>
          
        
          <Box flex={4} backgroundColor={TEMAS.colors.gray[300]} alignItems="center"  p={5} >  
          
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
          <Box 
          w="100%" 
          flexDirection="row"      
          bgColor={'black'}
          >
              <TouchableOpacity>
                <Text>Continuar com o Google</Text>
              </TouchableOpacity>
          </Box>

          {/* bt entar */}
          <Botao 
          onPress={login}
          // onPress={ () => navigation.navigate('Menu')}
          >
            Entrar
          </Botao>

        {/* link de esqueci minha senha */}
          <Box w="100%" flexDirection="row">
            <Text>Esqueceu sua senha?</Text>
              <TouchableOpacity>
                <Text>clique aqui</Text>
              </TouchableOpacity>
          </Box>

        </VStack>
  );
}

