import {parseFlags, path} from './deps.ts';
import {parse} from './jsonc.ts';

const dataDir = path.join(path.dirname(path.fromFileUrl(import.meta.url)), '..', 'data');
const testDataDir = path.join(path.dirname(path.fromFileUrl(import.meta.url)), '..', 'testdata');

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

export const books = parse(await Deno.readTextFile(path.join(dataDir, 'books.jsonc'))) as Book[];
export const movies = parse(await Deno.readTextFile(path.join(dataDir, 'movies.jsonc'))) as Movie[];

async function writeTitlesUnsorted (): Promise<void> {
  const stringifyTitles = (arr: {title: string}[]) => arr.map(({title}) => `${title}\n`).join('');
  await Deno.writeTextFile(path.join(testDataDir, 'book_titles_unsorted'), stringifyTitles(books));
  await Deno.writeTextFile(path.join(testDataDir, 'movie_titles_unsorted'), stringifyTitles(movies));
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
