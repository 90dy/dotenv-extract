import createDebug from 'debug';
import { expand } from 'dotenv-expand';
import flow from 'dotenv-flow';
import path from 'path';
import { projectRoot, workspaceRoot } from './variables';

const debug = createDebug('dotenv-extract:expand');

if (typeof process === 'undefined' || process.release.name !== 'node')
  throw new Error(
    '@idgarages/dotenv-extract must be used at build time (node environment) only',
  );

debug('process.env', process.env);

console.info(
  `loading project env (${path.relative(workspaceRoot, projectRoot)})...`,
);
const projectRootEnv = flow.config({
  default_node_env: 'review',
  node_env: process.env.NODE_ENV,
  path: projectRoot,
  silent: true,
  // prevent to have modules with dotenv-flow to load their own .env files
  purge_dotenv: true,
});
if (projectRootEnv.error) {
  throw new Error(
    'Could not load project environment variables.\r\nCheck your ' +
      path.relative(workspaceRoot, projectRoot) +
      ' `.env` files.',
    {
      cause: projectRootEnv.error,
    },
  );
}
debug('projectRootEnv', projectRootEnv.parsed);

console.info(`loading workspace env...`);
const workspaceRootEnv = flow.config({
  default_node_env: 'review',
  node_env: process.env.NODE_ENV,
  path: workspaceRoot,
  silent: true,
  // dotenv-flow will treat last projectRootEnv as shell env variable and will not override it
  purge_dotenv: false,
});
if (workspaceRootEnv.error) {
  throw new Error(
    'Could not load workspace environment variables.\r\nCheck your workspace root `.env` files.',
    {
      cause: workspaceRootEnv.error,
    },
  );
}
debug('workspaceRootEnv', workspaceRootEnv.parsed);

console.info('expanding environment variables...');
const result = expand({
  parsed: {
    ...(process.env as Record<string, string>),
    ...workspaceRootEnv.parsed!,
    ...projectRootEnv.parsed!,
  },
});
if (result.error) {
  throw new Error(
    'Could not expand environment variables.\r\nCheck your `.env` files.',
    {
      cause: result.error,
    },
  );
}

debug('process.env', process.env);
process.env = result.parsed as NodeJS.ProcessEnv;
debug('process.env', process.env);

export default result;
