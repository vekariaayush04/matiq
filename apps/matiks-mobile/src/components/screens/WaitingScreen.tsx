/**
 * WaitingScreen Component
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Logo } from '../ui';
import { COLORS } from '../../constants';

export const WaitingScreen: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Logo />

        <Animated.View style={[styles.spinnerContainer, { transform: [{ scale: pulseAnim }] }]}>
          <View style={styles.spinner} />
        </Animated.View>

        <Text style={styles.title}>Finding Opponent</Text>
        <Text style={styles.subtitle}>
          Waiting for another player to join...
        </Text>
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
  },
  spinnerContainer: {
    marginTop: 60,
    marginBottom: 32,
  },
  spinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderTopColor: COLORS.primary,
    borderRightColor: COLORS.primary,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default WaitingScreen;
