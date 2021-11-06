export interface ISettingsConfig {
  port: number;
  sessionSecret: string;
  userPasswordSaltRounds: string;
}

export interface IDatabaseConfig {
  url: string;
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}
