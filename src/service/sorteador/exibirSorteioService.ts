import { useState, useEffect } from "react";
import { useToast } from "native-base";
import { navegarParaTelaComParametros } from "../navegacao/navegacaoService";
import { useNavigation } from "@react-navigation/native";


export function useSorteioService(dadosSorteio: any[], indexInicial: number, idCorrida: number, qtdDePessoasComCheckIn: number, maiorNumeroDeKart: number, numerosForaDoSorteio: number[]) {
    const toast = useToast();
    const navigation = useNavigation();

    const [indexAtual, setIndexAtual] = useState(indexInicial);
    const [sorteando, setSorteando] = useState(false);
    const [exibiuPiloto, setExibiuPiloto] = useState(false);
    const [numeroSorteado, setNumeroSorteado] = useState<number | null>(null);
    const [botaoTexto, setBotaoTexto] = useState<string>("Sortear Kart");

    useEffect(() => {
        const pilotoAtual = dadosSorteio[indexAtual];
        // Log pra mostrar o nome e numero, só pra verificar se ta exibindo certo, dps pode retirar
        console.log(pilotoAtual);
    }, [indexAtual, dadosSorteio]);

    const realizarSorteioParaPiloto = (piloto: any) => {
        setSorteando(true);
        setBotaoTexto("Sorteando...");
        setNumeroSorteado(piloto.numero_do_kart);
        setExibiuPiloto(true);

        setTimeout(() => {
            setSorteando(false);
            setBotaoTexto("Próximo");
        }, 2000);
    };

    const passarParaProximoPiloto = () => {
        if (indexAtual < dadosSorteio.length - 1) {
            setIndexAtual(prevIndex => prevIndex + 1);
            setNumeroSorteado(null);
            setExibiuPiloto(false);
            setBotaoTexto("Sortear Kart");
        } else {
            // Ação dps de clicar em finalizar
            setBotaoTexto("Finalizar");

            // Navegar para a próxima tela passando o maiorNumeroDeKart e o idCorrida
            navegarParaTelaComParametros(navigation, 'SortearStack', 'ConfirmarSorteio', {
                idCorrida: idCorrida,
                dadosSorteio: dadosSorteio,
                qtdDePessoasSorteadas: dadosSorteio.length,
                qtdDePessoasComCheckIn: qtdDePessoasComCheckIn,
                maiorNumeroDeKart: maiorNumeroDeKart,
                numerosForaDoSorteio: numerosForaDoSorteio
            });
        }
    };

    const pilotoAtual = dadosSorteio[indexAtual];

    return {
        indexAtual,
        sorteando,
        exibiuPiloto,
        numeroSorteado,
        botaoTexto,
        pilotoAtual,
        realizarSorteioParaPiloto,
        passarParaProximoPiloto,
    };
}
