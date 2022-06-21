/**
 * 否定後読み (?<!\/|\d)
 */
const PATTERN = /(?<![a-zA-Z0-9])(#\d+)/g;

type ReplacerFunc = (substring: string, ...args: unknown[]) => string;

export const sharpToMdLink = (baseUrl: string, text: string): string => {
  const replacer: ReplacerFunc = (substring: string) => {
    const [_, number] = substring.split("#");
    return `[${substring}](${baseUrl}/${number})`;
  };
  return text.replace(PATTERN, replacer);
};
