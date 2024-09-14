import api from "./api"



export async function fazerLogin(email: string, senha: string) {
    if (!email || !senha) return null;

    try {
        const resultado = await api.post('/login', {
            email,
            senha
        });
        console.log('Resposta completa da API:', resultado);  // Mostrar a resposta completa
        console.log('Usuario logado', resultado);
        return resultado.data;  // se `resultado.data` está retornando os dados corretos
    } catch (error) {
        console.log('Erro: catch', error.message);
        if (error.response) {
            console.log('Erro na resposta:', error.response.data);
        }
        return null;
    }
}
