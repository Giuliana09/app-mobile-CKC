import axios from 'axios';

export const notificacãoLogin = async () => {
  try {
    const response = await axios.get('/login');
    return { 
      title: response.data.title || null,
      details: response.data.details || null,
    
      error: null 
    }; // Sucesso
  } catch (error) {
    return { 
      title: error.response?.data?.title || 'Erro de Autenticação',
      details: error.response?.data?.details || 'Senha ou email incorretos.',
    }; // Erro
  }
};
