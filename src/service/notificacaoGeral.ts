

export function notificacaoGeral(status: number, title?: string, details?: string) {
if (status >= 200 && status <= 299 ) {
    
    return{
        title: 'Bem-sucedido',
        details: 'A operação foi concluida com êxito.',
        background: "green.500" // Verde para sucesso
    };

    

 } else {
        return{
            title: title || 'Erro',
            details: details || 'Ocorreu um erro ao processar sua solicitação. Tente novamente.',
            background: "red.500" // Vermelho para erro
        };
    }
}
