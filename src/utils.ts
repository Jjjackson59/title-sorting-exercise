import {path} from './test_deps.ts';

export function getModuleDir (importMeta: ImportMeta): string {
  return path.dirname(path.fromFileUrl(importMeta.url));
}

export function getModuleRelativePath (
  importMeta: ImportMeta,
  ...paths: string[]
): string {
  return path.join(getModuleDir(importMeta), ...paths);
}
