import api from "../api";
import { navegarParaTelaComParametros, navegarParaTelaSemParametros } from "../navegacao/navegacaoService"; 

export async function verificarERealizarNavegacao(idCorrida: number, navigation: any) {
    try {
        const resultado = await api.get(`/sorteador/verificar?id_corrida=${idCorrida}`);
        
        const totalUsuariosComNumeroDeKart = resultado.data.total_usuario_com_numero_de_kart || 0;
        const totalUsuariosComCheckIn = resultado.data.total_usuario_com_check_in || 0;

        // Verificação para indicar a navegação
        if (totalUsuariosComNumeroDeKart === totalUsuariosComCheckIn) {
            navegarParaTelaSemParametros(navigation, 'SortearStack', 'ConfirmacaoSorteio'); 
        } else {
            navegarParaTelaComParametros(navigation, 'SortearStack', 'ListaDeKartsConfig', { 
                qtdDePessoasComCheckIn: totalUsuariosComCheckIn, 
                idCorrida: idCorrida 
            });  
        }
    } catch (error) {
        console.error("Erro ao fazer a requisição de Verificar Sorteio:", error);
    }
}