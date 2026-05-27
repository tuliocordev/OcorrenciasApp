import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../styles/theme';

export default function VoltarInicioButton() {
    return (
        <TouchableOpacity style={styles.botao}>
            <Ionicons name="arrow-back-outline" size={20} color={colors.primary} />
            <Text style={styles.texto}>Voltar</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    botao: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    texto: {
        color: colors.primary,
        marginLeft: 4,
        fontSize: 16,
    },
});