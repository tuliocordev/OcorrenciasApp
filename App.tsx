import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import HomeScreen from './src/screens/HomeScreen';
import NovaOcorrenciaScreen from './src/screens/NovaOcorrenciaScreen';
import ListaOcorrenciasScreen from './src/screens/ListaOcorrenciasScreen';
import { colors, fontSize } from './src/styles/theme';
import {
  listarOcorrenciaPorSlug,
  SLUG_ALUNO,
  deletarOcorrencia,
  atualizarOcorrencia,
} from './src/services/api';

export type Ocorrencia = {
  id: string;
  titulo: string;
  descricao: string;
  local: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
};

export type RootTabParamList = {
  Home: undefined;
  NovaOcorrencia: undefined;
  ListaOcorrencias: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);

  useEffect(() => {
    carregarOcorrencias();
  }, []);

  async function carregarOcorrencias() {
    try {
      const dados = await listarOcorrenciaPorSlug(SLUG_ALUNO);
      setOcorrencias(dados);
    } catch (error) {
      console.error('Erro ao carregar ocorrências:', error);
    }
  }

  async function removerOcorrencia(id: string) {
    try {
      await deletarOcorrencia(id);
      setOcorrencias((valorAtual) =>
        valorAtual.filter((ocorrencia) => ocorrencia.id !== id)
      );
    } catch (error) {
      console.log('Erro ao remover ocorrência:', error);
      throw error;
    }
  }

  async function editarOcorrencia(
    id: string,
    dadosAtualizados: Omit<Ocorrencia, 'id' | 'slug' | 'createdAt' | 'updatedAt' | 'deletedAt'>
  ) {
    try {
      const ocorrenciaAtualizada = await atualizarOcorrencia(id, dadosAtualizados);
      setOcorrencias((valorAtual) =>
        valorAtual.map((ocorrencia) =>
          ocorrencia.id === id ? ocorrenciaAtualizada : ocorrencia
        )
      );
    } catch (error) {
      console.log('Erro ao editar ocorrência:', error);
      throw error;
    }
  }

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textLight,
            tabBarStyle: {
              height: 65,
              paddingBottom: 8,
              paddingTop: 8,
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
            },
            tabBarLabelStyle: {
              fontSize: 12,
            },
            tabBarIcon: ({ color, size, focused }) => {
              let iconName: keyof typeof Ionicons.glyphMap = 'home';

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'NovaOcorrencia') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              } else if (route.name === 'ListaOcorrencias') {
                iconName = focused ? 'list' : 'list-outline';
              }

              return (
                <Ionicons
                  name={iconName}
                  size={size ?? fontSize.lg}
                  color={color}
                />
              );
            },
          })}
        >
          <Tab.Screen name="Home" options={{ title: 'Início' }}>
            {() => <HomeScreen ocorrencias={ocorrencias} />}
          </Tab.Screen>

          <Tab.Screen name="NovaOcorrencia" options={{ title: 'Nova' }}>
            {() => <NovaOcorrenciaScreen />}
          </Tab.Screen>

          <Tab.Screen name="ListaOcorrencias" options={{ title: 'Lista' }}>
            {() => (
              <ListaOcorrenciasScreen
                ocorrencias={ocorrencias}
                carregando={false}
                removerOcorrencia={removerOcorrencia}
                editarOcorrencia={editarOcorrencia}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>

      <Toast />
    </>
  );
}