export function notificacaoLogin(status: number, title?: string, details?: string) {
  if (status === 200) {
      return {
          title: 'Login bem-sucedido',
          details: 'Você foi autenticado com sucesso.',
          background: "green.500" // Verde para sucesso
      };
  } else {
      return {
          title: title || 'Erro de Login',
          details: details || 'Ocorreu um erro durante o login. Tente novamente mais tarde.',
          background: "red.500" // Vermelho para erro
      };
  }
}