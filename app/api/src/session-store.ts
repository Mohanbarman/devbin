import * as session from 'express-session';
import MySQLSession from 'express-mysql-session';
import mysql from 'mysql';
import { IDatabaseConfig, ISettingsConfig } from './types/config.types';

export const createSession = (
  settings: ISettingsConfig,
  dbConfig: IDatabaseConfig,
) => {
  const MySqlStore = MySQLSession(session);
  const dbConnection = mysql.createConnection(dbConfig);
  const sessionStore = new MySqlStore(dbConfig, dbConnection);
  return session.default({
    secret: settings?.sessionSecret || '',
    saveUninitialized: false,
    store: sessionStore,
    resave: false,
  });
};
