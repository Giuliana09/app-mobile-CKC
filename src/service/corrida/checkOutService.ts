import api from '../api';

export function navegarParaTelaDeInformacoesDoCheckOut(idCorrida: number, navigation: any) {
  navigation.navigate('CheckOutStack', {
    screen: 'DetalhesCorridaCheckOut',
    params: { idCorrida },
  });
}

export function navegarParaTelaDeRealizarCheckOut(idInscricao: number, corrida: any, navigation: any) {
    navigation.navigate('CheckOutStack', {
      screen: 'RealizarCheckOut',
      params: { 
        idInscricao,
        corrida
      },
    });
  }


export const listarDadosDosPilotosParaCheckOut = async (idCorrida: number) => {
    try {
        const resultado = await api.get(`/check-out?id_corrida=${idCorrida}`);
        
        const resultadoTotal = await api.get(`/check-out?id_corrida=${idCorrida}&tamanho=${resultado.data.totalElements}`);

      return {
        status: resultadoTotal.status,
        dados: resultadoTotal.data
      };
    } catch (error: any) {
      console.log('Erro na requisição:', error.message);
      if (error.response) {
        console.log('Erro exposto pela API:', error.response.data);
      }
      return {
        status: error.response?.data?.status || 500,
        title: error.response?.data?.title || 'Erro inesperado',
        details: error.response?.data?.details || 'Não foi possível obter os dados do Check-out.',
      };
    }
};

export const realizarCheckOutDoPiloto = async (idInscricao: number, pesoFinal: number, classificado: boolean) => {
    try {
      const response = await api.put('/check-out', {
        id_inscricao: idInscricao,
        peso_final: pesoFinal,
        classificado: classificado,
      });
  
      return {
        status: response.status
      };
    } catch (error: any) {
      console.log('Erro na requisição:', error.message);
      if (error.response) {
        console.log('Erro exposto pela API:', error.response.data);
      }
      return {
        status: error.response?.data?.status || 500,
        title: error.response?.data?.title || 'Erro inesperado',
        details: error.response?.data?.details || 'Não foi possível realizar o Check-out.',
      };
    }
  };

  export const listarDadosParaCheckout = async (idInscricao: number) => {
    try {
      const response = await api.get(`/check-in/${idInscricao}`);
      return {
        status: response.status,
        dados: response.data
      };
    } catch (error: any) {
      console.log('Erro na requisição:', error.message);
      if (error.response) {
        console.log('Erro exposto pela API:', error.response.data);
      }
      return {
        status: error.response?.data?.status || 500,
        title: error.response?.data?.title || 'Erro inesperado',
        details: error.response?.data?.details || 'Não foi possível obter os dados do Check-in.',
      };
    }
  };