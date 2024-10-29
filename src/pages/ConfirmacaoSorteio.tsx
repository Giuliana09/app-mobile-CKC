import React, { useState } from 'react';
import { Button, Text, VStack, Modal,  Icon } from 'native-base';
import ConfirmacoesChecks from '../components/ConfirmacoesChecks';
import { Share, StyleSheet } from 'react-native';
import { TEMAS } from '../style/temas';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { navegarParaTelaComParametros } from '../service/navegacao/navegacaoService';
import { obterListaDePilotosParaCompartilharViaWhatsapp } from '../service/sorteador/sorteadorService';

type ParamList = {
    ConfirmacaoSorteio: {
        idCorrida: number,
        maiorNumeroDeKart: number,
        numerosForaDoSorteio: number[],
        qtdDePessoasComCheckIn: number
    };
};

export default function ConfirmacaoSorteio() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<ParamList, 'ConfirmacaoSorteio'>>();
    const { idCorrida, maiorNumeroDeKart, numerosForaDoSorteio, qtdDePessoasComCheckIn } = route.params;

    const [listaParaCompartilhar, setListaParaCompartilhar] = useState<string | null>(null);
    const [modalEstaVisivel, setVisibilidadeModal] = useState(false); 

    async function handleCheckout() {
        navegarParaTelaComParametros(navigation, 'CheckOutStack', 'DetalhesCorridaCheckOut', {
            idCorrida: idCorrida,
        });
    }

    async function handleRefazerSorteio() {
        if (maiorNumeroDeKart === 0 && numerosForaDoSorteio.length === 0) {
            navegarParaTelaComParametros(navigation, 'SortearStack', 'ListaDeKartsConfig', {
                idCorrida: idCorrida,
                qtdDePessoasComCheckIn: qtdDePessoasComCheckIn,
            });
        } else {
            navegarParaTelaComParametros(navigation, 'SortearStack', 'ListaDeKartsConfirmarExclusao', {
                numerosForaDoSorteio: numerosForaDoSorteio,
                maiorNumeroDeKart: maiorNumeroDeKart,
                idCorrida: idCorrida,
                qtdDePessoasComCheckIn: qtdDePessoasComCheckIn,
            });
        }  
    }

    async function handlePrepararEExibirListaParaCompartilhar() {
        try {
            const response = await obterListaDePilotosParaCompartilharViaWhatsapp(idCorrida);

            if (response.status === 200) {
                setListaParaCompartilhar(response.dados);
                setVisibilidadeModal(true); 
            } else {
                console.error("Erro ao obter a lista para compartilhar:", response.details);
            }
        } catch (error) {
            console.error("Erro ao compartilhar lista:", error);
        }
    }

    // Função para compartilhar via WhatsApp 
    async function consumirApiECompartilharViaWhatsapp() {
        console.log('Consumindo a API e passando o listaParaCompartilhar nela, para compartilhar via WhatsApp...');

        if (listaParaCompartilhar) {
            try {
              const resultado = await Share.share({
                message: listaParaCompartilhar,
              });
              if (resultado.action === Share.sharedAction) {
                console.log('Compartilhado com sucesso!');
              }
            } catch (error) {
                console.error('Erro ao compartilhar:', error);
              }
          }
      
    }

    return (
        <VStack style={style.container}>
            <ConfirmacoesChecks
                textSucesso="Todos os sorteios dessa corrida foram finalizados com sucesso!"
                textBotao="Fazer o check-out da corrida"
                onPressBotao={handleCheckout}
                textBotaoAlterar="Refazer sorteio"
                onPressBotaoAlterar={handleRefazerSorteio}
            />
            <Button style={style.botao1}
             onPress={handlePrepararEExibirListaParaCompartilhar}>
                Compartilhar lista por WhatsApp
            </Button>

            {/* Modal para compartilhar lista */}
            <Modal isOpen={modalEstaVisivel} onClose={() => setVisibilidadeModal(false)} size="lg">
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>
                        <Text>Lista de Pilotos</Text>
                        <Text>OBS.: Mensagem já formatada para o Whatsapp</Text>
                    </Modal.Header>
                    <Modal.Body>
                        {listaParaCompartilhar}
                    </Modal.Body>
                    <Modal.Footer style={style.botaoModal} >
                        <Button  onPress={consumirApiECompartilharViaWhatsapp}>
                            <Icon name="share" /> {}
                            Compartilhar via WhatsApp
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </VStack>
    );
}

export const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: TEMAS.colors.black[300],
        padding: 20,
    },
    botao1:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: TEMAS.colors.black[500],
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 30,
        gap: 5,
    },
    botaoModal:{
        backgroundColor: TEMAS.colors.black[500], 
    }
   
   
});
