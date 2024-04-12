import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AppState } from 'react-native';
import AppNavigation from './src/Routes';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import 'expo-dev-client';
import { theme_color } from './config';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme_color,
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
