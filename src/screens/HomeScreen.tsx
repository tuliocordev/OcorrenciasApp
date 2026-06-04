import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { colors, fontSize, radius, spacing } from '../styles/theme';
import { Ocorrencia } from '../../App';

type Props = {
  ocorrencias: Ocorrencia[];
};

export default function HomeScreen({ ocorrencias }: Props) {
  const totalOcorrencias = ocorrencias.length;
  const ultimaOcorrencia = ocorrencias[0];

  return (
    <View style={styles.container}>
      <Header
        titulo="App de Ocorrências"
        subtitulo="Registre problemas da cidade com organização, navegação e interface visual moderna."
      />

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Total de Ocorrências</Text>
        <Text style={styles.numero}>{totalOcorrencias}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Última Ocorrência</Text>
        {ultimaOcorrencia ? (
          <>
            <Text style={styles.item}>Título: {ultimaOcorrencia.titulo}</Text>
            <Text style={styles.item}>Local: {ultimaOcorrencia.local}</Text>
          </>
        ) : (
          <Text style={styles.item}>Nenhuma ocorrência cadastrada.</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Resumo</Text>
        <Text style={styles.item}>Usuário: tulio</Text>
        <Text style={styles.item}>Ocorrências: {totalOcorrencias}</Text>
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  cardTitulo: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  numero: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  item: {
    fontSize: fontSize.md,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
});