import axios from 'axios';

export const notificacaoLogin = async () => {
  try {
    const response = await axios.get('/login');
    return { 
      title: response.data.title || null,
      details: response.data.details || null,
      error: null 
    }; // Sucesso
  } catch (error: any) {
    
      return { 
        title: error.response?.data?.title || 'Erro de Autenticação',
        details: error.response?.data?.details || 'Senha ou email incorretos.',
        error: error.message
      }; // Erro
    
  }
};