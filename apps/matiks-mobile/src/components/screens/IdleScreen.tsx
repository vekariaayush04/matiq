/**
 * IdleScreen Component
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Logo, Card, Button, Input } from '../ui';
import { COLORS } from '../../constants';

interface IdleScreenProps {
  name: string;
  onNameChange: (name: string) => void;
  onPlay: () => void;
}

export const IdleScreen: React.FC<IdleScreenProps> = ({
  name,
  onNameChange,
  onPlay,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Logo />

        <Card style={styles.card}>
          <Text style={styles.title}>Ready to Play?</Text>
          <Text style={styles.subtitle}>
            Enter your name and challenge players worldwide
          </Text>

          <Input
            placeholder="Your name"
            value={name}
            onChangeText={onNameChange}
            maxLength={20}
            autoCapitalize="words"
            containerStyle={styles.inputContainer}
          />

          <Button
            title="Find Match"
            onPress={onPlay}
            disabled={!name.trim()}
            style={styles.button}
          />
        </Card>

        <View style={styles.info}>
          <Text style={styles.infoText}>60 second math duel</Text>
          <Text style={styles.infoDot}>•</Text>
          <Text style={styles.infoText}>Solve as many as you can</Text>
          <Text style={styles.infoDot}>•</Text>
          <Text style={styles.infoText}>1v1 real-time</Text>
        </View>
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
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  button: {
    width: '100%',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginHorizontal: 4,
  },
  infoDot: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
});

export default IdleScreen;
