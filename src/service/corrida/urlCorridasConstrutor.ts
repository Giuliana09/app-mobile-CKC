import { IcorridaParametros } from "./IcorridaParametros";

export function montarUrlCorridas(params: IcorridaParametros): string {
    const queryParametros: string[] = [];

    if (params.mes) {
        queryParametros.push(`mes=${params.mes}`);
    }
    if (params.kartodromo) {
        queryParametros.push(`kartodromo=${encodeURIComponent(params.kartodromo)}`);
    }
    if (params.pesquisa) {
        // Verifique se a pesquisa é um número (dia) ou string (nome)
        if (!isNaN(Number(params.pesquisa))) {
            queryParametros.push(`dia=${Number(params.pesquisa)}`);
        } else {
            queryParametros.push(`nome=${encodeURIComponent(params.pesquisa)}`);
        }
    }

    // Retorna a URL final com os parâmetros de consulta, usando o operador ternario para isso
    return `/corrida${queryParametros.length ? '?' + queryParametros.join('&') : ''}`;
}
