import Login from './src/Login';
// import EsqueciSenha from './src/pages/EsqueciSenha';
import {NativeBaseProvider, StatusBar} from 'native-base';
import { TEMAS } from './src/style/temas';


export default function App() {

  //                  TESTE DA API
  // useEffect(() => {
  //   async function pegarDados(){
  //     const resultados = await api.get('/usuario')
  //     console.log(resultados.data)
  //   }
  //   pegarDados()
  // }, [])

  return (
    <NativeBaseProvider theme={TEMAS}>
      <StatusBar backgroundColor={TEMAS.colors.black[300]}></StatusBar>
      <Login/>
      {/* <EsqueciSenha/> */}
    </NativeBaseProvider>
  );
}

