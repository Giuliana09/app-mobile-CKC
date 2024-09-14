import { extendTheme } from 'native-base'

export const TEMAS = extendTheme({
    colors: {
        gray: {
            300: '#C4C4C4'
        },
        black:{
            300: '#1E1A18',
        },
        blue:{
            500:'#0033C1'
        },
        while:'#fff'
    },

    fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 20,
        xl: 36,
    }
})