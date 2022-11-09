import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/components/HomeScreen';
import { Settings } from './src/components/Settings';
import { TournamentScreen } from './src/components/TournamentScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Settings' component={Settings} />
        <Stack.Screen name='Tournament' component={TournamentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
