/**
 * AuthScreen Component
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Logo, Card, Button } from '../ui';
import { COLORS } from '../../constants';

interface AuthScreenProps {
  onAuthSuccess: () => void;
  onSkipAuth: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onAuthSuccess,
  onSkipAuth,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Logo />

        <Card style={styles.card}>
          <Text style={styles.title}>Welcome to Matiks</Text>
          <Text style={styles.subtitle}>
            Challenge other players in real-time math duels
          </Text>

          <Button
            title="Sign in with Google"
            onPress={onAuthSuccess}
            style={styles.button}
          />

          <TouchableOpacity onPress={onSkipAuth}>
            <Text style={styles.skipText}>Continue as Guest</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
  },
  card: {
    width: '100%',
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    width: '100%',
    marginBottom: 16,
  },
  skipText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
});

export default AuthScreen;
