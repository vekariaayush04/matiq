/**
 * AuthScreen Component - Google Sign-in
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Logo, Card } from '../ui';
import { COLORS } from '../../constants';

interface AuthScreenProps {
  onSignIn: () => void;
  isLoading?: boolean;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSignIn, isLoading }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Logo />

        <Card style={styles.card}>
          <Text style={styles.title}>Matiks</Text>
          <Text style={styles.subtitle}>
            Real-time math duels
          </Text>

          <TouchableOpacity
            style={[styles.googleButton, isLoading && styles.buttonDisabled]}
            onPress={onSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            )}
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
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  googleButton: {
    backgroundColor: '#4285f4',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    minHeight: 50,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});

export default AuthScreen;
