/**
 * Fiducia — HTTP Server Entrypoint
 */

import { app } from './app.js';
import { connectToMongoAtlas } from './config/mongodb.js';
import { startKeepAliveDaemon } from './services/infrastructure/keepAlive.service.js';

const PORT = Number(process.env.PORT) || 4000;

async function bootstrap() {
  const dbInfo = await connectToMongoAtlas();
  startKeepAliveDaemon();

  app.listen(PORT, () => {
    console.log(`============================================================`);
    console.log(`🛡️  Fiducia Backend Online on Port ${PORT}`);
    console.log(`📦 Storage Mode: ${dbInfo.status} (DB: ${dbInfo.dbName})`);
    console.log(`⚡ Zero-Cold-Start Keep-Alive Daemon: ACTIVE (10m interval)`);
    console.log(`============================================================`);
  });
}

bootstrap();
