/**
 * PlayingScreen Component
 *
 * ⚠️ DO NOT MODIFY THIS COMPONENT WITHOUT EXPLICIT PERMISSION ⚠️
 * This screen includes the game layout with timer, scorecards, and question display.
 * Any changes must be approved by the user first.
 */

import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { CircularTimer, QuestionCard, PlayerCard } from '../game';
import { Question } from '../../types';
import { COLORS } from '../../constants';

interface PlayingScreenProps {
  playerName: string;
  playerScore: number | null;
  opponentName: string;
  opponentScore: number | null;
  question: Question;
  answer: string;
  onAnswerChange: (value: string) => void;
  correctness: 'correct' | 'wrong' | null;
  timeLeft: number | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  scoreUpdated?: boolean;
}

export const PlayingScreen: React.FC<PlayingScreenProps> = ({
  playerName,
  playerScore,
  opponentName,
  opponentScore,
  question,
  answer,
  onAnswerChange,
  correctness,
  timeLeft,
  currentQuestionIndex,
  totalQuestions,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar - minimal */}
      <View style={styles.topBar}>
        <View style={styles.playerLeft}>
          <PlayerCard
            name={playerName}
            score={playerScore}
            isCurrentPlayer={true}
          />
        </View>

        <CircularTimer timeLeft={timeLeft} />

        <View style={styles.playerRight}>
          <PlayerCard
            name={opponentName}
            score={opponentScore}
          />
        </View>
      </View>

      {/* Question area */}
      <View style={styles.questionSection}>
        <QuestionCard
          question={question}
          answer={answer}
          onAnswerChange={onAnswerChange}
          correctness={correctness}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  playerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  playerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  questionSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});

export default PlayingScreen;
