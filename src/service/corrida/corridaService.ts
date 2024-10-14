import api from '../api'; 
import { montarUrlCorridas } from './urlCorridasConstrutor'; 
import { IcorridaParametros } from './IcorridaParametros'; 

export async function consultarCorridas(parametros: IcorridaParametros) {
    try {
        const url = montarUrlCorridas(parametros);

        // Log da URL completa de busca de Corridas
        const fullUrl = `${api.defaults.baseURL}${url}`; 
        console.log('URL da Busca na API:', fullUrl); 

        // Requisição
        const resultado = await api.get(url);

        // Caso de consulta a API com sucesso (a API devolve apenas o Status e os dados)
        console.log('Status Code:', resultado.status);

        return {
            status: resultado.status,
            dadosCorridas: resultado.data.content 
        };
    } catch (error: any) {
        console.log('Erro na requisição:', error.message);
        if (error.response) {
            console.log('Erro exposto pela API:', error.response.data);
        }

        return {
            status: error.response?.data?.status || 500,
            title: error.response?.data?.title || 'Erro inesperado',
            details: error.response?.data?.details || 'Não foi possível buscar as corridas.',
        };
    }
}

// Função para consultar os nomes dos kartódromos (Para os filtros de Kartodromos)
export async function consultarKartodromos() {
    try {
        const resultado = await api.get('/kartodromo/nomes'); 
        return {
            status: resultado.status,
            nomesKartodromos: resultado.data 
        };
    } catch (error: any) {
        return {
            status: error.response?.data?.status || 500,
            title: error.response?.data?.title || 'Erro inesperado',
            details: error.response?.data?.details || 'Não foi possível buscar os dados.'
        };
    }
}

// Função para formatar data da Corrida (DD/MM/YYYY)
export const formatarDataCorrida = (data: string): string => {
    const dataFormatada = data.split('T')[0]; 
    const [ano, mes, dia] = dataFormatada.split('-'); 
    return `${dia}/${mes}/${ano}`; 
};
