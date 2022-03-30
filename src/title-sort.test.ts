import {assertStrictEquals} from './test_deps.ts';
import {getModuleRelativePath} from './utils.ts';
import {titleSort} from './title-sort.ts';

async function getList (...paths: string[]): Promise<string[]> {
  const filePath = getModuleRelativePath(
    import.meta,
    'testdata',
    ...paths,
  );
  const text = await Deno.readTextFile(filePath);
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
