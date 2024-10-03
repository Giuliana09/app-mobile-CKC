import {VStack, Image, Text, Box} from 'native-base'; // VStack é como se fosse a View do react-native
import { TouchableOpacity, StyleSheet } from 'react-native';
import { TEMAS } from './style/temas';
import { useNavigation } from '@react-navigation/native';
import { Cabecalho } from './components/Cabecalho';
import logoCKC1 from './assets/logoCKC1.png';
import clover from './assets/clover.png';
import check from './assets/check_circle.png';
import logout from './assets/logout.png';
import Tabs from './tabs';

  export default function Menu() {
    const navigation = useNavigation();
    
    return (
      <VStack style={styles.view}>
        {/* cabeçalho com a logo */}
        <Cabecalho>
          <Image style={styles.logo} source={logoCKC1} alt="Logo CKC"/>
        </Cabecalho>
      
        {/* Card de sortear */}
        <Box style={styles.onecard}>
          <TouchableOpacity>
          <Image style={styles.iconMenu} source={clover} alt="icone de trevo"/>
          <Text style={styles.textLG}>Sortear</Text>
          <Text style={styles.textMD}>Sortear os karts para os pilotos</Text>
          </TouchableOpacity>
        </Box>

        {/* Card de check-in */}
        <Box style={styles.card}>
          <TouchableOpacity>
          <Image style={styles.iconMenu} source={check} alt="icone de check"/>
          <Text style={styles.textLG}>Check-in</Text>
          <Text style={styles.textMD}>Listar pilotos inscritos nas corridas</Text>
          </TouchableOpacity>
        </Box>

        {/* Card de check-out */}
        <Box style={styles.card}>
          <TouchableOpacity>
          <Image style={styles.iconMenu} source={logout} alt= "icone de saida"/>
          <Text style={styles.textLG}>Check-out</Text>
          <Text style={styles.textMD}>Validar os pilotos ao final da corrida</Text>
          </TouchableOpacity>
        </Box>

        {/* Componente de navegação */}
        <Tabs /> 
      </VStack>  
    )
  }

  const styles = StyleSheet.create({
    view: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: TEMAS.colors.gray[300],
    },

    logo: {
      width: 180,
      resizeMode: "contain",
    },

    onecard: {
      flex: 2,
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      height: 180,
      marginHorizontal: 20,
      marginVertical: 10,
      paddingHorizontal: 40,
      paddingVertical: 40,
      borderRadius: 10,
      color: TEMAS.colors.white,
      backgroundColor: TEMAS.colors.blue[500],
    },

    card: {
      flex: 2,
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      height: 180,
      marginHorizontal: 20,
      marginVertical: 10,
      paddingHorizontal: 40,
      paddingVertical: 40, 
      borderRadius: 10,
      color: TEMAS.colors.white,
      backgroundColor: TEMAS.colors.black[300],
    },

    iconMenu: {
      width: 80,
      height: 80,
      alignSelf: "center",
    },

    textLG: {
      marginTop: 10,
      alignSelf: "center",
      fontSize: TEMAS.fontSizes.lg,
      color: TEMAS.colors.white,
    },

    textMD: {
      alignSelf: "center",
      fontSize: TEMAS.fontSizes.md,
      color: TEMAS.colors.white,
    },

  });