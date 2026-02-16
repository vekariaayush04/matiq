/**
 * CircularTimer Component - Sleek and simple
 *
 * ⚠️ DO NOT MODIFY THIS COMPONENT WITHOUT EXPLICIT PERMISSION ⚠️
 * This timer component has been finalized as per user requirements.
 * Any changes must be approved by the user first.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

interface CircularTimerProps {
  timeLeft: number | null;
}

export const CircularTimer: React.FC<CircularTimerProps> = ({ timeLeft }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⏱</Text>
      <Text style={styles.time}>{timeLeft ?? '--'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  icon: {
    fontSize: 14,
    marginRight: 4,
  },
  time: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
});

export default CircularTimer;
