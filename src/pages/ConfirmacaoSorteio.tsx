import React, { useState } from 'react';
import { Button, Text, VStack, Modal,  Icon, Box, View } from 'native-base';
import ConfirmacoesChecks from '../components/ConfirmacoesChecks';
import { Share, StyleSheet, Touchable } from 'react-native';
import { TEMAS } from '../style/temas';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { navegarParaTelaComParametros } from '../service/navegacao/navegacaoService';
import { obterListaDePilotosParaCompartilharViaWhatsapp } from '../service/sorteador/sorteadorService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
            <TouchableOpacity style={style.bt_cor} onPress={handlePrepararEExibirListaParaCompartilhar}>
                <Text style={style.tx_wtzaap}>Compartilhar</Text>
                <Ionicons style={style.ic_wtzaap} name="logo-whatsapp"></Ionicons>
            </TouchableOpacity>
                
            {/* Modal para compartilhar lista */}
            <Modal  isOpen={modalEstaVisivel} onClose={() => setVisibilidadeModal(false)} size="lg">
                <Modal.Content style={style.boxModal}>
                    <Modal.CloseButton />
                    <Modal.Header style={style.tituloModal}>
                        <Text style={style.txTituloModal} fontSize="27">Lista de Pilotos</Text>
                        <Text style={style.txSubTituloModal}>OBS.: Mensagem já formatada para o Whatsapp</Text>
                    </Modal.Header>
                    <Modal.Body style={style.textoModal}>
                        {listaParaCompartilhar}
                    </Modal.Body>
                    <Modal.Footer style={style.footerModal}>                        
                        <Button style={style.btCompartilharWhatsModal} onPress={consumirApiECompartilharViaWhatsapp}>
                            <View style={style.containerIconeTexto}>
                                <Text style={style.txBtModal}>Compartilhar via WhatsApp</Text>
                                <Ionicons style={style.ic_whatsModal} name="logo-whatsapp"></Ionicons> 
                            </View>
                            
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

    bt_cor: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,  
        backgroundColor: TEMAS.colors.gray[300],
    },

    tx_wtzaap: {
        color: TEMAS.colors.black[300],
        fontSize: 20,
        marginRight: 5,
    },

    ic_wtzaap: {
        color: TEMAS.colors.green[300],
        fontSize: 22,
    },
    boxModal:{
        width:"90%",
        borderRadius: 20,
    },
 
    tituloModal:{
        backgroundColor: '#f0f0f0', 
        borderBottomWidth: 1, 
        borderColor: '#ccc',
        alignItems: 'center',
    },
    txTituloModal:{
        flexShrink: 1,
        marginTop: 10,
        fontFamily: 'ChakraPetch-Bold',
        alignSelf: 'center', 
        textAlign: 'center',
    },
    txSubTituloModal:{
        fontFamily: 'ChakraPetch-Medium',
        marginTop:5,
        marginBottom:-10,
    },
    textoModal:{
        fontSize: 15,
        marginBottom: 5,
        marginLeft:10,
        color: "#138E34", 
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'ChakraPetch-Medium',
    },
    

    btCompartilharWhatsModal:{
        backgroundColor: '#138E34',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '100%',
    },
    containerIconeTexto: {
        padding:12,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 8, 
    },
    txBtModal:{
        fontSize: 19,
        color: '#ffffff',
        fontFamily: 'ChakraPetch-SemiBold',
        
    },
    ic_whatsModal:{
        fontSize: 28,
        color: '#ffffff',
        fontFamily: 'ChakraPetch-Bold',
       
    },
    footerModal:{
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        padding: 10,
        justifyContent: 'center',

    },
});
