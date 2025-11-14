export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  bondingCurveProgress: number;
  migrationReady: boolean;
  timestamp: number;
}

export interface MigrationResult {
  success: boolean;
  tokenAddress: string;
  txHash?: string;
  type: 'pre-migration' | 'migration' | 'post-migration';
  amount: number;
  price: number;
  timestamp: number;
  error?: string;
}

export interface BotStatus {
  isRunning: boolean;
  monitoredTokens: number;
  totalMigrations: number;
  successfulMigrations: number;
  failedMigrations: number;
  startTime: number;
}

