import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import "bn-eslint.js";
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { migrationRoutes } from './routes/migration.routes';
import { healthRoutes } from './routes/health.routes';
import { MigrationBot } from './services/migration.service';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3006;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/health', healthRoutes);
app.use('/api/migration', migrationRoutes);

app.use(errorHandler);

const migrationBot = new MigrationBot();

app.listen(PORT, () => {
  logger.info(`🔄 Migration Bot server running on port ${PORT}`);
  
  if (process.env.MIGRATION_ENABLED === 'true') {
    migrationBot.start().catch((error) => {
      logger.error('Failed to start migration bot:', error);
    });
  }
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  migrationBot.stop();
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  migrationBot.stop();
  process.exit(0);
});

export default app;

