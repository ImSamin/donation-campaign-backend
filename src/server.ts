import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorlogger, logger } from './shared/logger';

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`🛢️ Database is connected successfully`);
    server = app.listen(config.port, () => {
      logger.info(`App listening on port ${config.port}`);
    });
  } catch (error) {
    errorlogger.error(error);
  }

  process.on('unhandledRejection', error => {
    //console.log('Unhandled rejection is detected, we are closing the server')
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
