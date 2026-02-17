import { createAuthClient } from 'better-auth/react';
import { expoClient } from '@better-auth/expo/client';
import * as SecureStore from 'expo-secure-store';

const AUTH_URL = process.env.EXPO_PUBLIC_AUTH_URL || 'https://matiks.pgstay.in';

export const authClient = createAuthClient({
  baseURL: AUTH_URL,
  basePath: '/api/auth',
  plugins: [
    expoClient({
      scheme: 'matiks',
      storage: SecureStore,
    }),
  ],
});

export const { useSession, signIn, signOut } = authClient;
