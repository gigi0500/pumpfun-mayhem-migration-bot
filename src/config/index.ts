import dotenv from 'dotenv';

dotenv.config();

export const config = {
  server: {
    port: parseInt(process.env.PORT || '3006', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  solana: {
    rpcUrl: process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
    privateKey: process.env.SOLANA_PRIVATE_KEY || '',
    publicKey: process.env.SOLANA_PUBLIC_KEY || '',
  },
  migration: {
    enabled: process.env.MIGRATION_ENABLED === 'true',
    bondingCurveThreshold: parseFloat(process.env.BONDING_CURVE_THRESHOLD || '0.95'),
    autoMigrate: process.env.AUTO_MIGRATE === 'true',
    preMigrationEntry: process.env.PRE_MIGRATION_ENTRY === 'true',
    postMigrationExit: process.env.POST_MIGRATION_EXIT === 'true',
    maxPositionSize: parseFloat(process.env.MAX_POSITION_SIZE || '1.0'),
    stopLossPercentage: parseFloat(process.env.STOP_LOSS_PERCENTAGE || '10'),
    takeProfitPercentage: parseFloat(process.env.TAKE_PROFIT_PERCENTAGE || '50'),
    monitorIntervalMs: parseInt(process.env.MONITOR_INTERVAL_MS || '5000', 10),
    tokenAddresses: process.env.TOKEN_ADDRESSES?.split(',').filter(Boolean) || [],
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || 'logs/migration.log',
  },
};

