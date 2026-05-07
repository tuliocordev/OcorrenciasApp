import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Header from '../components/Header';
import { colors, fontSize, radius, spacing } from '../styles/theme';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Header
                titulo="App de Ocorrências"
                subtitulo="Registre problemas da cidade com organização, navegação e interface visual moderna."
            />

            <View style={styles.cardInfo}>
                <Ionicons name="phone-portrait-outline" size={42} color={colors.primary} />
                <Text style={styles.cardTitulo}>Projeto do Semestre</Text>
                <Text style={styles.cardTexto}>
                    Aqui ainda são dados estáticos, mas em breve teremos uma lista dinâmica de ocorrências cadastradas pelos usuários.
                </Text>
            </View>

            <View style={styles.resumoBox}>
                <Text style={styles.resumoTitulo}>O que teremos no app?</Text>
                <Text style={styles.item}>• Cadastro de ocorrência</Text>
                <Text style={styles.item}>• Lista de registros</Text>
                <Text style={styles.item}>• Foto com câmera</Text>
                <Text style={styles.item}>• Localização por GPS</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.lg,
        justifyContent: 'center',
    },
    cardInfo: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        padding: spacing.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: spacing.lg,
    },
    cardTitulo: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
        color: colors.text,
        marginTop: spacing.sm,
        marginBottom: spacing.xs,
    },
    cardTexto: {
        fontSize: fontSize.md,
        color: colors.textLight,
        textAlign: 'center',
        lineHeight: 22,
    },
    resumoBox: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
    },
    resumoTitulo: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: spacing.sm,
    },
    item: {
        fontSize: fontSize.md,
        color: colors.textLight,
        marginBottom: spacing.xs,
    },
});