import {VStack, Image, Text, Box, FormControl, Input, Button} from 'native-base'; // VStack é como se fosse a View do react-native
import { TouchableOpacity } from 'react-native';
import { TEMAS } from './style/temas'; 
import logoCKC1 from './assets/logoCKC1.png'
import logoGoogle from './assets/logoGoogle.png'
// import curva from './assets/curva.png'
import { Cabecalho } from './components/Cabecalho';
export default function Login() {

  return (
        // flex={1} => quer dizer que a VStack vai ocupar a tela inteira                                                                               
        <VStack flex={1} backgroundColor={TEMAS.colors.gray[300]} justifyContent="center">
          {/* cabeçalho com a logo */}
          <Cabecalho>
            <Image source={logoCKC1} alt="Logo CKC" width={40}  resizeMode="contain"/>
          </Cabecalho>
          {/* Titulo */}
          <Text fontSize="5xl"
            fontWeight="bold"
            color="black"
            textAlign="center"
            // mt = margin top
            mt={1}
            mb={5}
          >
            Login
          </Text>
          
          <Box flex={5} backgroundColor={TEMAS.colors.gray[300]} alignItems="center"  p={5} >  
          
            <FormControl mt={3}>
              {/* compo de Email */}
              <FormControl.Label>Email:</FormControl.Label>
              <Input 
                placeholder='Insira seu email aqui'
                /* tamanho do texto dentro do input */
                size='lg'
                w="100%"
                borderRadius='lg'
                bgColor='gray.100'
                //sombra  
                shadow={3}
              />
            </FormControl>

            <FormControl mt={3}>
              {/* compo de Senha */}
              <FormControl.Label>Senha:</FormControl.Label>
              <Input 
                placeholder='Insira sua senha'
                /* tamanho do texto dentro do input */
                size='lg'
                w="100%"
                borderRadius='lg'
                bgColor='gray.100'
                //sombra  
                shadow={3}
              />
            </FormControl>
          </Box>
          
          {/* bt do google */}
          <Box 
          w="100%" 
          flexDirection="row"      
          bgColor={'black'}
          >
              <Image source={logoGoogle}/>
              <TouchableOpacity>
                <Text>Continuar com o Google</Text>
              </TouchableOpacity>
          </Box>

          {/* <Button 
          mb={5}
          bg='black.300'
          mt={10} 
          >          
           Continuar com o Google
          </Button> */}

          {/* bt entar */}
          <Button 
          mb={5}
          bg='black.300'
          mt={10}>
            Entrar
          </Button>

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

