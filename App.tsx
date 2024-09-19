import {NativeBaseProvider, StatusBar} from 'native-base';
import { TEMAS } from './src/style/temas';
import Rotas from './src/navigation/Rotas';
import { useLoadFonts } from './src/hooks/useLoadFonts';


export default function App() {

  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null;  
  }

  return (
    <NativeBaseProvider theme={TEMAS}>
      <StatusBar backgroundColor={TEMAS.colors.black[300]}></StatusBar>
      <Rotas/>
    </NativeBaseProvider>
  );
}

