export function navegarParaTelaSemParametros(navigation: any, rota: string, tela: string) {
    navigation.navigate(rota, {
        screen: tela
    });
}