/**
 * ScoreBoard Component
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlayerCard } from './PlayerCard';
import { COLORS } from '../../constants';

interface ScoreBoardProps {
  playerName: string;
  playerScore: number | null;
  opponentName: string;
  opponentScore: number | null;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  playerName,
  playerScore,
  opponentName,
  opponentScore,
}) => {
  return (
    <View style={styles.container}>
      <PlayerCard
        name={playerName}
        score={playerScore}
        isCurrentPlayer={true}
      />
      <Text style={styles.vs}>VS</Text>
      <PlayerCard
        name={opponentName}
        score={opponentScore}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  vs: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
});

export default ScoreBoard;
