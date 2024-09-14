import {VStack, Image, Text, Box} from 'native-base'; // VStack é como se fosse a View do react-native
import { TouchableOpacity } from 'react-native';
import { TEMAS } from './style/temas'; 
import { Cabecalho } from './components/Cabecalho';
import logoCKC1 from './assets/logoCKC1.png'
import clover from './assets/clover.png'
import check from './assets/check_circle.png'
import logout from './assets/logout.png'


export default function Menu() {

    return (
        <VStack flex={1} backgroundColor={TEMAS.colors.gray[300]} justifyContent="center">
          {/* cabeçalho com a logo */}
          <Cabecalho >
            <Image source={logoCKC1} alt="Logo CKC" width={40}  resizeMode="contain"/>
          </Cabecalho>
        
        {/* Card de sortear */}
          <Box  flex={1}             
          bgColor={'black'}
          >
              <TouchableOpacity>
                <Image source={clover}/>
                <Text>Sortear</Text>
                <Text>Sortear os karts para os pilotos</Text>
              </TouchableOpacity>

        {/* Card de Check-in */}
              <TouchableOpacity>
                <Image source={check}/>
                <Text>Check-in</Text>
                <Text>Listar pilotos inscritos nas corridas</Text>
              </TouchableOpacity>
        {/* Card de Check-out */}
            <TouchableOpacity>
              <Image source={logout}/>
              <Text>Check-out</Text>
              <Text>Validar as condições do piloto ao final da corrida</Text>
            </TouchableOpacity>
          </Box>
          
    
        </VStack>  
    )
}