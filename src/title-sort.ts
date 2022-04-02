function consistentCase (str: string): string {
  return str.toLowerCase();
}

function removeLeadingArticle (str: string): string {
  const articleRegex = /^(?:a\s+|an\s+|the\s+)/i;
  return str.replace(articleRegex, '');
}

function removeDiacritics (str: string): string {
  const diacriticRegex = /[\u0300-\u036f]/gu;
  return str.normalize('NFD').replaceAll(diacriticRegex, '');
}

/**
 * A _compare function_ for sorting titles
 * 
 * The function ignores leading English articles (_a_, _an_, _the_),
 * and is indifferent to capitalized characters and accented characters.
 * 
 * References:
 * - [Article (grammar)](https://en.wikipedia.org/wiki/Article_(grammar))
 * - [`Array.prototype.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
 */
export function titleSort (titleA: string, titleB: string): number {
  // const a = removeDiacritics(removeLeadingArticle(consistentCase(titleA)));
  // const b = removeDiacritics(removeLeadingArticle(consistentCase(titleB)));

  // return a < b ? -1 : a > b ? 1 : 0;
  return removeLeadingArticle(titleA).localeCompare(removeLeadingArticle(titleB), undefined, {sensitivity: 'base'});
}
