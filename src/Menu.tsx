import {VStack, Image, Text, Box, FormControl, Input, Button} from 'native-base'; // VStack é como se fosse a View do react-native
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
          <Cabecalho>
            <Image source={logoCKC1} alt="Logo CKC" width={40}  resizeMode="contain"/>
          </Cabecalho>
        
        {/* Card de sortear */}
          <Box              
          bgColor={'black'}
          >
              <TouchableOpacity>
                <Image source={clover}/>
                <Text>Sortear</Text>
                <Text>Sortear os karts para os pilotos</Text>
              </TouchableOpacity>
          </Box>
        {/* Card de Check-in */}
          <Box              
          bgColor={'black'}
          >
              <TouchableOpacity>
                <Image source={check}/>
                <Text>Check-in</Text>
                <Text>Listar pilotos inscritos nas corridas</Text>
              </TouchableOpacity>
          </Box>
        {/* Card de Check-out */}
          <Box              
          bgColor={'black'}
          >
              <TouchableOpacity>
                <Image source={logout}/>
                <Text>Check-out</Text>
                <Text>Validar as condições do piloto ao final da corrida</Text>
              </TouchableOpacity>
          </Box>

        </VStack>  
    )
}