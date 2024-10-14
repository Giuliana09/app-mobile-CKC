import api from '../api'; 

export function navegarParaTelaDeInformacoesDoCheckIn(idCorrida: number, navigation: any) {
    console.log("Chamei a navigation", idCorrida)
    navigation.navigate('CheckOutStack', {
        screen: 'DetalhesCorridaCheckIn',
        params: { idCorrida }, // Passando o parâmetro
      });
}
