import { useState, useEffect } from "react";
import { useToast } from "native-base";
import { notificacaoGeral } from "../notificacaoGeral";
import { navegarParaTelaComParametros } from "../navegacao/navegacaoService";
import { useNavigation } from "@react-navigation/native";
import { notificacaoSorteioFinalizado } from "./sorteadorService";

export function useSorteioService(dadosSorteio: any[], indexInicial: number, idCorrida: number, qtdDePessoasComCheckIn: number) {
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
            const notificacaoDeFinalizacao = notificacaoSorteioFinalizado();

            toast.show({
                title: notificacaoDeFinalizacao.title,
                description: notificacaoDeFinalizacao.details,
                backgroundColor: notificacaoDeFinalizacao.background,
            });

            // Navegar para a próxima tela passando o maiorNumeroDeKart e o idCorrida
            navegarParaTelaComParametros(navigation, 'SortearStack', 'ConfirmarSorteio', {
                idCorrida: idCorrida,
                qtdDePessoasSorteadas: dadosSorteio.length,
                qtdDePessoasComCheckIn: qtdDePessoasComCheckIn
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
