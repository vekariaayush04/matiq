/**
 * ReadyScreen Component
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlayerCard } from '../game';
import { COLORS } from '../../constants';

interface ReadyScreenProps {
  playerName: string;
  opponentName: string;
  countDown: number | null;
}

export const ReadyScreen: React.FC<ReadyScreenProps> = ({
  playerName,
  opponentName,
  countDown,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Get Ready!</Text>

        <View style={styles.countdown}>
          <Text style={styles.countdownText}>{countDown ?? '--'}</Text>
        </View>

        <View style={styles.players}>
          <PlayerCard
            name={playerName}
            score={null}
            isCurrentPlayer={true}
          />
          <Text style={styles.vs}>VS</Text>
          <PlayerCard
            name={opponentName}
            score={null}
          />
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
    alignItems: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 40,
  },
  countdown: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
  },
  countdownText: {
    fontSize: 56,
    fontWeight: '800',
    color: COLORS.text,
  },
  players: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  vs: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginHorizontal: 12,
  },
});

export default ReadyScreen;
