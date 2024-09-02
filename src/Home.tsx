import {VStack, Image, Text, Box} from 'native-base'; //como se fosse a View do react-native
import { TEMAS } from './style/temas'; 
import logoCKC1 from './assets/logoCKC1.png'
import curva from './assets/curva.png'
import Login from './pages/Login';
export default function Home() {

  return (
        // flex={1} => quer dizer que a VStack vai ocupar a tela inteira
        <VStack flex={1} backgroundColor={TEMAS.colors.gray}>
            <Box flex={1.5} backgroundColor={TEMAS.colors.black[300]} alignItems="center" justifyContent="center">
              <Image source={logoCKC1} alt="Logo CKC" width={40}  resizeMode="contain"/>
            </Box>
            <Box position="relative">
              <Image source={curva} alt="Onda"
              width="100%" 
              height={100} 
              resizeMode="cover"/>
            </Box>
            
        <VStack flex={4.5} backgroundColor={TEMAS.colors.gray} alignItems="center"  p={5} >  
          <text fontSize="xl">Login</text>
        </VStack>

        </VStack>
  );
}

