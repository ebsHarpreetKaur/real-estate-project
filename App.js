import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AppState } from 'react-native';
import AppNavigation from './src/Routes';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { AlertNotificationRoot } from 'react-native-alert-notification';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#20B2AA',
    secondary: 'yellow',
  },
};


export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AlertNotificationRoot>

        <AppNavigation />
      </AlertNotificationRoot>

    </PaperProvider>
  );
}
