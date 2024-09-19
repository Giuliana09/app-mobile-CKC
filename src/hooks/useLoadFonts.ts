import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export function useLoadFonts() {
  const [fontsLoaded] = useFonts({
    'ChakraPetch-Bold': require('../assets/fonts/ChakraPetch-Bold.otf'),
    'ChakraPetch-Light': require('../assets/fonts/ChakraPetch-Light.otf'),
    'ChakraPetch-Medium': require('../assets/fonts/ChakraPetch-Medium.otf'),
    'ChakraPetch-Regular': require('../assets/fonts/ChakraPetch-Regular.otf'),
    'ChakraPetch-SemiBold': require('../assets/fonts/ChakraPetch-SemiBold.otf')
    
  });

  useEffect(() => {
    
    async function hideSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync(); // Impede o splash screen de sumir automaticamente
  }

  return fontsLoaded;
}
