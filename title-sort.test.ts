import {assertStrictEquals, path} from './test_deps.ts';
import {titleSort} from './title-sort.ts';

const testDataDir = path.join(path.dirname(path.fromFileUrl(import.meta.url)), 'testdata');

async function getList (relativePath: string): Promise<string[]> {
  const text = await Deno.readTextFile(path.join(testDataDir, relativePath));
  return text.split('\n').map(str => str.trim()).filter(Boolean);
}

Deno.test('titleSort', async ({step}) => {
  await step('sorts book titles', async () => {
    const expected = JSON.stringify(await getList('book_titles_sorted'));
    const unsorted = await getList('book_titles_unsorted');
    const sorted = unsorted.sort(titleSort);
    const actual = JSON.stringify(sorted);
    assertStrictEquals(actual, expected);
  });

  await step('sorts movie titles', async () => {
    const expected = JSON.stringify(await getList('movie_titles_sorted'));
    const unsorted = await getList('movie_titles_unsorted');
    const sorted = unsorted.sort(titleSort);
    const actual = JSON.stringify(sorted);
    assertStrictEquals(actual, expected);
  });

  await step('sorts mixed case titles', async () => {
    const expected = JSON.stringify(await getList('mixed_case_sorted'));
    const unsorted = await getList('mixed_case_unsorted');
    const sorted = unsorted.sort(titleSort);
    const actual = JSON.stringify(sorted);
    assertStrictEquals(actual, expected);
  });
});
