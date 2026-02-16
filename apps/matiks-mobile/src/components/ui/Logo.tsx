/**
 * Logo Component
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MATIKS</Text>
      <Text style={styles.subtitle}>Math Duel</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.accent,
    marginTop: 4,
    letterSpacing: 2,
  },
});

export default Logo;
