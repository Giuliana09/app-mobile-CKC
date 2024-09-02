import {VStack, Image} from 'native-base'; //como se fosse a View do react-native
import { TEMAS } from '../style/temas';
import logoCKC1  from '../assets/logoCKC1.png';

export default function Login() {

  return (
        // flex={1} => quer dizer que a VStack vai ocupar a tela inteira
        <VStack flex={1} bgColor={TEMAS.colors.gray} alignItems="center" p={5}>  
            <Image source={logoCKC1} alt="Logo CKC"/>
        </VStack>
  );
}

