import * as dotenv from '../src/index';

declare global {
  namespace NodeJS {
    type DotEnv = typeof dotenv;
    interface ProcessEnv extends DotEnv {}
  }
}
export {};
