import { useState, useEffect, useCallback } from 'react';
import { authClient } from '../lib/auth';

interface AuthUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuth = (): AuthState => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending) {
      setIsLoading(false);
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image ?? null,
        });
      } else {
        setUser(null);
      }
    }
  }, [session, isPending]);

  const handleSignIn = useCallback(async () => {
    try {
      setIsLoading(true);

      // Use better-auth's built-in social OAuth sign-in
      // This handles the redirect flow properly with expoClient plugin
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/',
      });

    } catch (error) {
      console.error('Sign in error:', error);
      setIsLoading(false);
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await authClient.signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }, []);

  return {
    isAuthenticated: !!session?.user,
    isLoading: isLoading || isPending,
    user,
    signIn: handleSignIn,
    signOut: handleSignOut,
  };
};
