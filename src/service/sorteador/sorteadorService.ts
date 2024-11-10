import api from "../api";

export const listarDadosDePilotosQueParticiparaoDoSorteio = async (idCorrida: number) => {
  try {
    const response = await api.get(`/sorteador?id_corrida=${idCorrida}`);
    const responseTotal = await api.get(`/sorteador?id_corrida=${idCorrida}&tamanho=${response.data.totalElements}`);
    return {
      status: responseTotal.status,
      dados: responseTotal.data
    };
  } catch (error: any) {
    console.log('Erro na requisição para Sorteador:', error.message);
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


export const realizarSorteioDaCorrida = async (idCorrida: number, maiorNumeroDeKart: number, numerosForaDoSorteio: number[]) => {
  try {
    if (numerosForaDoSorteio == null) {
      numerosForaDoSorteio = [];
    }

    const response = await api.post('/sorteador', {
      id_corrida: idCorrida,
      maior_numero_de_kart: maiorNumeroDeKart,
      numeros_fora_do_sorteio: numerosForaDoSorteio,
    });

    return {
      status: response.status,
      dados: response.data
    };

  } catch (error: any) {
    console.log('Erro na requisição de realizar Sorteio:', error.message);
    if (error.response) {
      console.log('Erro exposto pela API:', error.response.data);
    }
    return {
      status: error.response?.data?.status || 500,
      title: error.response?.data?.title || 'Erro inesperado',
      details: error.response?.data?.details || 'Não foi possível realizar o Sorteio.',
    };
  }
};

export const obterListaDePilotosParaCompartilharViaWhatsapp = async (idCorrida: number) => {
  try {
    const response = await api.get(`/check-in/compartilhar?id_corrida=${idCorrida}`);

    return {
      status: response.status,
      dados: response.data
    };

  } catch (error: any) {
    console.log('Erro na requisição de compartilhar Lista por Whatsapp:', error.message);
    if (error.response) {
      console.log('Erro exposto pela API:', error.response.data);
    }
    return {
      status: error.response?.data?.status || 500,
      title: error.response?.data?.title || 'Erro inesperado',
      details: error.response?.data?.details || 'Não foi possível realizar o Sorteio.',
    };
  }
};

