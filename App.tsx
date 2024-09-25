import {NativeBaseProvider, StatusBar} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import { TEMAS } from './src/style/temas';
import { useLoadFonts } from './src/hooks/useLoadFonts';
import Rotas from './src/navigation/Rotas';


export default function App() {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null;  
  }

  return (
    <NativeBaseProvider theme={TEMAS}>
      <StatusBar backgroundColor={TEMAS.colors.black[300]}></StatusBar>
      <NavigationContainer>
        <Rotas/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

