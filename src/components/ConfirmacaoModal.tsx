import React from 'react';
import { Modal, Button } from 'native-base';
import { StyleSheet, Text } from 'react-native';
import { TEMAS } from '../style/temas';

type ConfirmacaoModalProps = {
    isVisible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    titulo: string;
};

const ConfirmacaoCheck: React.FC<ConfirmacaoModalProps> = ({ isVisible, onConfirm, onCancel, titulo }) => {
    return (
        <Modal isOpen={isVisible} onClose={onCancel}>
            <Modal.Content style={styles.modal} maxWidth="600px">
                <Modal.Header style={styles.modal}>
                    <Text style={styles.titulo}>{titulo}</Text>
                </Modal.Header>
                <Modal.Footer style={styles.modal}>
                    <Button.Group space={2}>
                        <Button style={styles.botaoConfirmar} onPress={onConfirm}>
                        <Text style={styles.textoBotaoConfirmar}>Confirmar</Text>
                        </Button>
                        <Button style={styles.botaoCancelar} variant="outline" onPress={onCancel}>
                            <Text style={styles.textoBotaoCancelar}>Não</Text>
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: TEMAS.colors.black['300'],
        width: '90%',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    titulo: {
        fontSize: TEMAS.fontSizes.lg,
        fontFamily: TEMAS.fonts['petch_Bold'],
        color: TEMAS.colors.white, 
    },
    botaoConfirmar: {
        width: '50%',
        backgroundColor: TEMAS.colors.blue['500'],
    },
    textoBotaoConfirmar: {
        fontFamily: TEMAS.fonts['petch_Bold'],
        color: TEMAS.colors.white, 
    },
    botaoCancelar: {
        width: '50%',
        backgroundColor: TEMAS.colors.gray['300'], 
    },
    textoBotaoCancelar: {
        fontFamily: TEMAS.fonts['petch_Bold'],
        color: TEMAS.colors.black['300'],
    },
});

export default ConfirmacaoCheck;
