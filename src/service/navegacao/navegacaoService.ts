export function navegarParaTelaSemParametros(navigation: any, rota: string, tela: string) {
    navigation.navigate(rota, {
        screen: tela
    });
}

export function navegarParaTelaComParametros(navigation:any, rota: string, tela: string, params: any) {
    navigation.navigate(rota, { screen: tela, params: params });
}