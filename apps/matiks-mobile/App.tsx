/**
 * Main Application Component
 * Orchestrates game flow and renders appropriate screens
 */

import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { AuthScreen } from './src/components/screens/AuthScreen';
import { GameScreen } from './src/components/screens/GameScreen';
import { useAuth } from './src/hooks/useAuth';
import { COLORS } from './src/constants';

export default function App() {
  // Auth state - always call this first
  const { isAuthenticated, isLoading: authLoading, user, signIn } = useAuth();

  // Player state - use auth name or fallback to local state
  const [name, setName] = useState('');

  // Set name from authenticated user
  useEffect(() => {
    if (isAuthenticated && user) {
      setName(user.name || 'Player');
    }
  }, [isAuthenticated, user]);

  // Render based on auth state
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {authLoading ? null : !isAuthenticated ? (
        <AuthScreen onSignIn={signIn} isLoading={authLoading} />
      ) : (
        <GameScreen name={name} onNameChange={setName} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
