/**
 * EndedScreen Component
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Logo, Card, Button } from '../ui';
import { PlayerCard } from '../game';
import { COLORS } from '../../constants';

interface EndedScreenProps {
  isWinner: boolean;
  playerScore: number;
  opponentScore: number;
  onPlayAgain: () => void;
}

export const EndedScreen: React.FC<EndedScreenProps> = ({
  isWinner,
  playerScore,
  opponentScore,
  onPlayAgain,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Logo />

        <Card style={styles.card}>
          <Text style={[
            styles.resultText,
            isWinner ? styles.winner : styles.loser,
          ]}>
            {isWinner ? 'You Win!' : 'You Lose'}
          </Text>

          <View style={styles.scoreBoard}>
            <PlayerCard
              name="You"
              score={playerScore}
              isCurrentPlayer={true}
              isWinner={isWinner}
            />
            <Text style={styles.scoreVs}>{playerScore} - {opponentScore}</Text>
            <PlayerCard
              name="Opponent"
              score={opponentScore}
              isWinner={!isWinner}
            />
          </View>

          <Button
            title="Play Again"
            onPress={onPlayAgain}
            style={styles.button}
          />
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
    marginTop: 32,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 24,
  },
  winner: {
    color: COLORS.success,
  },
  loser: {
    color: COLORS.error,
  },
  scoreBoard: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreVs: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginVertical: 16,
  },
  button: {
    width: '100%',
  },
});

export default EndedScreen;
