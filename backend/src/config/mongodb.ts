/**
 * Domain 08: Unified MongoDB Atlas M0 Database & Vector Store Connection Manager
 * Supports automatic in-memory fallback when running offline or in CI/CD unit tests.
 */

import { MongoClient, Db } from 'mongodb';

let mongoClient: MongoClient | null = null;
let databaseInstance: Db | null = null;
let connectionStatus: 'CONNECTED' | 'IN_MEMORY_FALLBACK' | 'DISCONNECTED' = 'DISCONNECTED';

export async function connectToMongoAtlas(): Promise<{
  status: 'CONNECTED' | 'IN_MEMORY_FALLBACK';
  dbName: string;
}> {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || 'fiducia';

  if (!uri || uri.includes('<username>')) {
    connectionStatus = 'IN_MEMORY_FALLBACK';
    return { status: 'IN_MEMORY_FALLBACK', dbName };
  }

  try {
    mongoClient = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    await mongoClient.connect();
    databaseInstance = mongoClient.db(dbName);
    connectionStatus = 'CONNECTED';
    return { status: 'CONNECTED', dbName };
  } catch (err) {
    console.warn(
      '[MongoDB Atlas] Could not connect to remote cluster, engaging deterministic in-memory store fallback:',
      (err as Error).message
    );
    connectionStatus = 'IN_MEMORY_FALLBACK';
    return { status: 'IN_MEMORY_FALLBACK', dbName };
  }
}

export function getDatabase(): Db | null {
  return databaseInstance;
}

export function getMongoConnectionStatus(): 'CONNECTED' | 'IN_MEMORY_FALLBACK' | 'DISCONNECTED' {
  return connectionStatus;
}
