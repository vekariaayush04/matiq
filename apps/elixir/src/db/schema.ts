import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core'

/**
 * User table - extends better-auth schema
 * Stores additional user profile data
 */
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  emailVerified: boolean('email_verified').default(false),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

/**
 * Session table - for better-auth
 */
export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at'),
  token: text('token').notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => users.id),
})

/**
 * Account table - for OAuth providers
 */
export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => users.id),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})

/**
 * Verification table - for email verification
 */
export const verifications = pgTable('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

/**
 * User stats - tracks game performance
 */
export const userStats = pgTable('user_stats', {
  userId: text('user_id').references(() => users.id).primaryKey(),
  totalGames: integer('total_games').default(0),
  wins: integer('wins').default(0),
  losses: integer('losses').default(0),
  draws: integer('draws').default(0),
  totalScore: integer('total_score').default(0),
  highestStreak: integer('highest_streak').default(0),
  currentStreak: integer('current_streak').default(0),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

/**
 * Game history - stores completed games
 */
export const gameHistory = pgTable('game_history', {
  id: serial('id').primaryKey(),
  gameId: text('game_id').notNull(),
  player1Id: text('player1_id').references(() => users.id),
  player2Id: text('player2_id').references(() => users.id),
  player1Score: integer('player1_score').default(0),
  player2Score: integer('player2_score').default(0),
  winnerId: text('winner_id').references(() => users.id),
  isDraw: boolean('is_draw').default(false),
  startedAt: timestamp('started_at').notNull(),
  endedAt: timestamp('ended_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Type exports
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type UserStats = typeof userStats.$inferSelect
export type NewUserStats = typeof userStats.$inferInsert
export type GameHistory = typeof gameHistory.$inferSelect
export type NewGameHistory = typeof gameHistory.$inferInsert
