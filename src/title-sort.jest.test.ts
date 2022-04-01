import {fileURLToPath} from 'url';
import path from 'path';
import {readFile} from 'fs/promises';

import {titleSort} from './title-sort.js';

async function getList (...paths: string[]): Promise<string[]> {
  const filePath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'testdata',
    ...paths,
  );
  const text = await readFile(filePath, {encoding: 'utf8'});
  return text.split('\n').map(str => str.trim()).filter(Boolean);
}

describe('titleSort', () => {
  test('sorts book titles', async () => {
    const expected = JSON.stringify(await getList('book_titles_sorted'));
    const unsorted = await getList('book_titles_unsorted');
    const sorted = unsorted.sort(titleSort);
    const actual = JSON.stringify(sorted);
    expect(actual).toBe(expected);
  });

  test('sorts movie titles', async () => {
    const expected = JSON.stringify(await getList('movie_titles_sorted'));
    const unsorted = await getList('movie_titles_unsorted');
    const sorted = unsorted.sort(titleSort);
    const actual = JSON.stringify(sorted);
    expect(actual).toBe(expected);
  });

  test('sorts mixed case titles', async () => {
    const expected = JSON.stringify(await getList('mixed_case_sorted'));
    const unsorted = await getList('mixed_case_unsorted');
    const sorted = unsorted.sort(titleSort);
    const actual = JSON.stringify(sorted);
    expect(actual).toBe(expected);
  });
});
