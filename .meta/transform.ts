import {getModuleRelativePath} from '../src/utils.ts';

import {parseFlags} from './deps.ts';
import {parse} from './jsonc.ts';

function getDataPath (...paths: string[]): string {
  return getModuleRelativePath(import.meta, 'data', ...paths);
}

function getTestDataPath (...paths: string[]): string {
  return getModuleRelativePath(import.meta, '..', 'src', 'testdata', ...paths);
}

export type Book = {
  author: string;
  id: string;
  title: string;
};

export type Movie = {
  id: string;
  title: string;
  year: number;
};

export const books = parse(await Deno.readTextFile(getDataPath('books.jsonc'))) as Book[];
export const movies = parse(await Deno.readTextFile(getDataPath('movies.jsonc'))) as Movie[];

async function writeTitlesUnsorted (): Promise<void> {
  const stringifyTitles = (arr: {title: string}[]) => arr.map(({title}) => `${title}\n`).join('');
  await Deno.writeTextFile(getTestDataPath('book_titles_unsorted'), stringifyTitles(books));
  await Deno.writeTextFile(getTestDataPath('movie_titles_unsorted'), stringifyTitles(movies));
}

async function main () {
  const {write} = parseFlags(Deno.args);
  if (!write) return;
  if (write === 'unsorted') {
    await writeTitlesUnsorted();
    console.log('Unsorted titles written to "testdata" directory');
  }
}

if (import.meta.main) main();
