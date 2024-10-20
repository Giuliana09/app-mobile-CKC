import { extendTheme } from 'native-base'
import { green } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'
import { OrganizeImportsMode } from 'typescript'

export const TEMAS = extendTheme({
    colors: {
        gray: {
            300: '#C4C4C4'
        },
        black:{
            300: '#1E1A18',
            500: '#000',
        },
        blue:{
            500:'#0033C1'
        },
        yellow:{
            300:'#B5CC18',
            500:'#FBBC04',
        },
        white: '#fff',
        green:{
            300:'#069B0C'
        },
        orange:{
            300: '#CC5918',
        },
    },

    fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 20,
        xl: 36,
    },

    fonts: {
        body: 'ChakraPetch-Regular',
        petch_Bold: 'ChakraPetch-Bold',
        petch_Light: 'ChakraPetch-Light',
        petch_semiBold: 'ChakraPetch-SemiBold',
        petch_medium: 'ChakraPetch-Medium',
      },
})