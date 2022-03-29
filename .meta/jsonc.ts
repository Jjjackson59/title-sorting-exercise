import {jsonc as modJsonC} from './deps.ts';

export type ParseOptions = modJsonC.ParseOptions;

export class ParseError extends Error {
  name = 'ParseError';

  static createFromObject (parseError: modJsonC.ParseError) {
    return new this(modJsonC.printParseErrorCode(parseError.error));
  }
}

export type JsonSerializable = boolean | null | number | string | JsonSerializable[] | { [key: string]: JsonSerializable };

export function parse (jsonc: string, options?: ParseOptions): JsonSerializable {
  const parseErrors: modJsonC.ParseError[] = [];
  const parsed = modJsonC.parse(jsonc, parseErrors, options);

  if (parseErrors.length > 0) {
    const errors = parseErrors.map(ParseError.createFromObject);
    const msg = `Errors encountered while parsing JSONC`;
    throw new AggregateError(errors, msg);
  }

  return parsed;
}
