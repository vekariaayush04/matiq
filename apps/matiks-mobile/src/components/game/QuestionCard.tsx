/**
 * QuestionCard Component
 *
 * ⚠️ DO NOT MODIFY THIS COMPONENT WITHOUT EXPLICIT PERMISSION ⚠️
 * This component includes the keypad which has been finalized as per user requirements.
 * Any changes must be approved by the user first.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Question } from '../../types';
import { COLORS, OPERATORS, ANSWER_DEBOUNCE_MS } from '../../constants';

interface QuestionCardProps {
  question: Question;
  answer: string;
  onAnswerChange: (value: string) => void;
  correctness: 'correct' | 'wrong' | null;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
  onAnswerChange,
  correctness,
  currentQuestionIndex,
  totalQuestions,
}) => {
  const [localAnswer, setLocalAnswer] = useState(answer);

  useEffect(() => {
    setLocalAnswer(answer);
  }, [answer]);

  const handlePress = (num: string) => {
    if (correctness === 'correct') return;

    const newValue = localAnswer + num;
    if (newValue.length <= 6) {
      setLocalAnswer(newValue);
      onAnswerChange(newValue);
    }
  };

  const handleDelete = () => {
    if (correctness === 'correct') return;

    const newValue = localAnswer.slice(0, -1);
    setLocalAnswer(newValue);
    onAnswerChange(newValue);
  };

  const getOperatorSymbol = (op: string) => {
    switch (op) {
      case 'ADDITION':
        return OPERATORS.ADD;
      case 'SUBTRACTION':
        return OPERATORS.SUBTRACT;
      case 'MULTIPLICATION':
        return OPERATORS.MULTIPLY;
      case 'DIVISION':
        return OPERATORS.DIVIDE;
      case 'ADD':
        return OPERATORS.ADD;
      case 'SUBTRACT':
        return OPERATORS.SUBTRACT;
      case 'MULTIPLY':
        return OPERATORS.MULTIPLY;
      case 'DIVIDE':
        return OPERATORS.DIVIDE;
      default:
        return op;
    }
  };

  const getBorderColor = () => {
    if (correctness === 'correct') return COLORS.success;
    if (correctness === 'wrong') return COLORS.error;
    return COLORS.border;
  };

  return (
    <View style={styles.container}>
      {/* Progress indicator */}
      <Text style={styles.progress}>
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </Text>

      {/* Question display with grid */}
      <View style={styles.questionWrapper}>
        {/* 4x4 Grid lines */}
        <View style={[styles.gridVLine, { left: '25%' }]} />
        <View style={[styles.gridVLine, { left: '50%' }]} />
        <View style={[styles.gridVLine, { left: '75%' }]} />
        <View style={[styles.gridHLine, { top: '25%' }]} />
        <View style={[styles.gridHLine, { top: '50%' }]} />
        <View style={[styles.gridHLine, { top: '75%' }]} />

        <Text style={styles.question}>
          {question.operand1} {getOperatorSymbol(question.operator)} {question.operand2}
        </Text>
      </View>

      {/* Answer input display */}
      <View style={[styles.answerBox, { borderColor: getBorderColor() }]}>
        <Text style={styles.answerText}>
          {localAnswer || '?'}
        </Text>
      </View>

      {/* Numpad */}
      <View style={styles.numpad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <TouchableOpacity
            key={num}
            style={styles.numpadButton}
            onPress={() => handlePress(num.toString())}
            disabled={correctness === 'correct'}
          >
            <Text style={styles.numpadText}>{num}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.numpadButton, styles.deleteButton]}
          onPress={() => handlePress('-')}
          disabled={correctness === 'correct'}
        >
          <Text style={styles.numpadText}>−</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.numpadButton}
          onPress={() => handlePress('0')}
          disabled={correctness === 'correct'}
        >
          <Text style={styles.numpadText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.numpadButton, styles.submitButton]}
          onPress={handleDelete}
          disabled={correctness === 'correct'}
        >
          <Text style={styles.numpadText}>⌫</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  progress: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 8,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  questionBox: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginVertical: 8,
  },
  questionWrapper: {
    width: 180,
    height: 180,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridVLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: COLORS.border,
  },
  gridHLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.border,
  },
  question: {
    fontSize: 52,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    letterSpacing: 2,
  },
  answerBox: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderWidth: 0,
    minWidth: 160,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  answerText: {
    fontSize: 40,
    fontWeight: '700',
    color: COLORS.accent,
    textAlign: 'center',
    letterSpacing: 1,
  },
  numpad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    gap: 8,
  },
  numpadButton: {
    width: '31%',
    height: 48,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  deleteButton: {
    backgroundColor: COLORS.surfaceLight,
    borderColor: COLORS.primary,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  numpadText: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.text,
  },
});

export default QuestionCard;
