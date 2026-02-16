/**
 * PlayerCard Component - Sleek and minimal
 *
 * ⚠️ DO NOT MODIFY THIS COMPONENT WITHOUT EXPLICIT PERMISSION ⚠️
 * This scorecard component has been finalized as per user requirements.
 * Any changes must be approved by the user first.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

interface PlayerCardProps {
  name: string;
  score: number | null;
  isCurrentPlayer?: boolean;
  isWinner?: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  name,
  score,
  isCurrentPlayer = false,
  isWinner = false,
}) => {
  const displayName = name.length > 5 ? name.substring(0, 5) + '...' : name;

  return (
    <View style={styles.container}>
      <View style={[styles.avatar, isCurrentPlayer && styles.avatarSelf]}>
        <Text style={styles.avatarText}>
          {name?.[0]?.toUpperCase() || 'P'}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {isCurrentPlayer ? 'You' : displayName}
        </Text>
        <Text style={[styles.score, isWinner && styles.winnerScore]}>
          {score ?? 0}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatarSelf: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
  },
  info: {
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginBottom: 1,
  },
  score: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 18,
  },
  winnerScore: {
    color: COLORS.success,
  },
});

export default PlayerCard;
