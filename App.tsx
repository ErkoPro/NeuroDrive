import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { NeuroDriveProvider } from './src/context/NeuroDriveContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <NeuroDriveProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </NeuroDriveProvider>
  );
}
