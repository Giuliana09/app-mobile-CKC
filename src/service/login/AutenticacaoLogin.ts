import api from '../api';

export async function fazerLogin(email: string, senha: string) {
    
    try {
        const resultado = await api.post('/login', {
            email,
            senha
        });

        // Caso de consulta a API com sucesso (a API devolve apenas o Status, sem corpo)
        console.log('Status Code do Login: ', resultado.status);

        return {
            status: resultado.status
        }
    } catch (error: any) {
        console.log('Erro na requisição:', error.message);
        if (error.response) {
            console.log('Erro exposto pela API:', error.response.data);
        }

        // Caso de erro ele retorna o Status, Titulo e o Detalhe
        return {
            status: error.response.data.status,
            title: error.response.data.title,
            details: error.response.data.details,
        };
    }
}