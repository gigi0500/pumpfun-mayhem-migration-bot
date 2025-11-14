import { Router, Request, Response } from 'express';
import { MigrationBot } from '../services/migration.service';

const router = Router();
const migrationBot = new MigrationBot();

router.get('/status', (req: Request, res: Response) => {
  try {
    const status = migrationBot.getStatus();
    res.json({ success: true, data: status });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get status' });
  }
});

router.post('/start', async (req: Request, res: Response) => {
  try {
    await migrationBot.start();
    res.json({ success: true, message: 'Migration bot started' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to start bot' });
  }
});

router.post('/stop', (req: Request, res: Response) => {
  try {
    migrationBot.stop();
    res.json({ success: true, message: 'Migration bot stopped' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to stop bot' });
  }
});

router.get('/migrations', (req: Request, res: Response) => {
  try {
    const migrations = migrationBot.getMigrationHistory();
    res.json({ success: true, data: migrations });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get migrations' });
  }
});

export { router as migrationRoutes };

