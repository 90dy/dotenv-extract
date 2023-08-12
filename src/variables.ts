import path from 'path'
import createDebug from 'debug';
import { findRootSync } from '@manypkg/find-root';

const debug = createDebug('dotenv-extract:variables')

export const projectRoot = path.resolve(
  path.dirname(
    require.resolve(
      (process.env.NX_TASK_TARGET_PROJECT || process.cwd()) + '/package.json',
    ),
  ),
);
export const workspaceRoot =
  process.env.NX_WORKSPACE_ROOT || findRootSync(process.cwd()).rootDir;

debug('projectRoot', projectRoot);
debug('workspaceRoot', workspaceRoot);
