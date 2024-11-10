import api from '../api';

export function navegarParaTelaDeInformacoesDoCheckIn(idCorrida: number, navigation: any) {
  navigation.navigate('CheckInStack', {
    screen: 'DetalhesCorridaCheckIn',
    params: { idCorrida },
  });
}

export function navegarParaTelaDeRealizarCheckIn(idInscricao: number, navigation: any) {
  navigation.navigate('CheckInStack', {
    screen: 'RealizarCheckIn',
    params: { idInscricao },
  });
}

export const listarPilotosPorCorrida = async (idCorrida: number) => {
  try {
    const response = await api.get(`/inscricao?check=true&id_corrida=${idCorrida}`);
    
    const responseTotal = await api.get(`/inscricao?check=true&id_corrida=${idCorrida}&tamanho=${response.data.totalElements}`);

    return {
      status: responseTotal.status,
      dadosPilotos: responseTotal.data.content,
      qtdPilotos: responseTotal.data.totalElements
    };

  } catch (error: any) {
    console.log('Erro na requisição:', error.message);
    if (error.response) {
      console.log('Erro exposto pela API:', error.response.data);
    }

    return {
      status: error.response?.data?.status || 500,
      title: error.response?.data?.title || 'Erro inesperado',
      details: error.response?.data?.details || 'Não foi possível buscar os pilotos.',
    };
  }
};

export const listarDadosParaCheckIn = async (idInscricao: number) => {
  try {
    const response = await api.get(`/inscricao/${idInscricao}`);
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

export const realizarCheckInDoPiloto = async (idInscricao: number, pesoInicial: number, lastro: number) => {
  try {
    const response = await api.post('/check-in', {
      inscricao_id: idInscricao,
      peso_inicial: pesoInicial,
      lastro: lastro,
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
      details: error.response?.data?.details || 'Não foi possível realizar o Check-in.',
    };
  }
};

// Função para calcular o lastro com base no peso inicial e na categoria
export const calcularLastro = (pesoInicial: number, categoria: string): number => {
  if (!pesoInicial || !categoria) return 0;

  const pesoCategoria = parseInt(categoria.split('_')[1]);
  const lastro = pesoCategoria - pesoInicial;

  return lastro > 0 ? lastro : 0; 
};

export const verificarSeJaFezCheckIn = async (idInscricao: number) => {
  try {
      const response = await api.get(`/check-in/${idInscricao}`);
      return {
          status: response.status,
          dados: response.data,
      };
  } catch (error: any) {
      return {
          status: error.response?.data?.status || 500,
          title: error.response?.data?.title || 'Erro inesperado',
          details: error.response?.data?.details || 'Não foi possível verificar se já foi feito check-in.',
      };
  }
};

export const processarCheckIn = async (idInscricao: number, pesoInicial: number, lastroNumber: number) => {
  try {
      const checkInExistente = await verificarSeJaFezCheckIn(idInscricao);

      if (checkInExistente.status === 200) {
          // Atualiza o check-in existente
          const response = await api.put('/check-in', {
              inscricao_id: idInscricao,
              peso_inicial: pesoInicial,
              lastro: lastroNumber 
          });

          if (response.status === 200) {
              return {
                  status: response.status,
              };
          }
      } 
      
      // Se não existir, cria um novo check-in
      const response = await realizarCheckInDoPiloto(idInscricao, pesoInicial, lastroNumber);

      if (response.status === 201) {
          return {
              status: response.status,
          };
      }

      // Caso de erro, detalha o que ocorreu
      const errorDetails =  'Erro ao realizar o check-in.';
      return {
          status: response.status,
          title: response.title,
          details: response.details,
      };
  } catch (error: any) {
      console.log('Erro na requisição:', error.message);
      return {
          status: error.response?.data?.status || 500,
          title: error.response?.data?.title || 'Erro inesperado',
          details: error.response?.data?.details || 'Não foi possível processar o Check-in.',
      };
  }
};


