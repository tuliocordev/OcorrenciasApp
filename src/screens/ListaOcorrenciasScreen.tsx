import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import OccurrenceCard from '../components/OccurrenceCard';
import { colors, fontSize, spacing } from '../styles/theme';
import { Ocorrencia } from '../../App';
import { listarOcorrenciaPorSlug, SLUG_ALUNO } from '../services/api';

export default function ListaOcorrenciasScreen() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);

  useEffect(() => {
    async function buscarOcorrencias() {
      try {
        const dados = await listarOcorrenciaPorSlug(SLUG_ALUNO);
        setOcorrencias(dados);
      } catch (error) {
        console.error('Erro ao buscar ocorrências:', error);
      }
    }

    buscarOcorrencias();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        titulo="Lista de Ocorrências"
        subtitulo="As ocorrências cadastradas aparecerão abaixo."
      />

      {ocorrencias.length === 0 ? (
        <View style={styles.vazioBox}>
          <Text style={styles.vazioTexto}>
            Nenhuma ocorrência cadastrada até o momento.
          </Text>
        </View>
      ) : (
        <FlatList
          data={ocorrencias}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OccurrenceCard
              titulo={item.titulo}
              descricao={item.descricao}
              local={item.local}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  vazioBox: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.lg,
  },
  vazioTexto: {
    fontSize: fontSize.md,
    color: colors.textLight,
    textAlign: 'center',
  },
});