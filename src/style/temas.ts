import { extendTheme } from 'native-base'

export const TEMAS = extendTheme({
    colors: {
        gray: '#C4C4C4',
        while:'#fff',
        black:{
            300: '#1E1A18',
        },
        blue:{
            500:'#0033C1'
        },
    },

    fontSizes: {
        xs: 11, // minúsculo
        sm: { // pequeno
            smMin:14,
            smMax: 16
        }, 
        md: {// medio
            mdMin:20,
            mdMed:24,
            mdMax:32
        }, 
        lg:{ // largo
            lgMin:36,
            lgMax:40    
        },
        xl: 48  // big

    }
})