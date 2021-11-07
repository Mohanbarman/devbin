export interface ISettingsConfig {
  port: number;
  sessionSecret: string;
  userPasswordSaltRounds: number;
  binPasswordSaltRounds: number;
}

export interface IDatabaseConfig {
  url: string;
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}
