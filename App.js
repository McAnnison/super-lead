import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import UploadScreen from './src/screens/UploadScreen';
import GenreSelectionScreen from './src/screens/GenreSelectionScreen';
import ProcessingScreen from './src/screens/ProcessingScreen';
import PlaybackScreen from './src/screens/PlaybackScreen';
import LibraryScreen from './src/screens/LibraryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6C63FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Upload" 
            component={UploadScreen}
            options={{ title: 'Upload Notes' }}
          />
          <Stack.Screen 
            name="GenreSelection" 
            component={GenreSelectionScreen}
            options={{ title: 'Choose Genre' }}
          />
          <Stack.Screen 
            name="Processing" 
            component={ProcessingScreen}
            options={{ title: 'Creating Your Song', headerLeft: null }}
          />
          <Stack.Screen 
            name="Playback" 
            component={PlaybackScreen}
            options={{ title: 'Your Learning Song' }}
          />
          <Stack.Screen 
            name="Library" 
            component={LibraryScreen}
            options={{ title: 'My Songs' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
