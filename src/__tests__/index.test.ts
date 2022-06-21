import { describe, expect, test } from "vitest";

import * as Module from "../index.js";

const BASE_URL = "https://example.com/pull";

describe("Convert a string of numbers starting with # to a GitHub link", () => {
  test("to link", () => {
    let input = "#123";
    let output = Module.sharpToMdLink(BASE_URL, input);
    expect(output).toBe(`[#123](${BASE_URL}/123)`);

    input = "#456";
    output = Module.sharpToMdLink(BASE_URL, input);
    expect(output).toBe(`[#456](${BASE_URL}/456)`);
  });

  test("special character", () => {
    let input = "(#123)";
    let output = Module.sharpToMdLink(BASE_URL, input);
    expect(output).toBe(`([#123](${BASE_URL}/123))`);

    input = "（#123）";
    output = Module.sharpToMdLink(BASE_URL, input);
    expect(output).toBe(`（[#123](${BASE_URL}/123)）`);

    input = " #123 ";
    output = Module.sharpToMdLink(BASE_URL, input);
    expect(output).toBe(` [#123](${BASE_URL}/123) `);
  });

  test("Strings that must not be made into links", () => {
    let input = `${BASE_URL}/123#123`;
    let output = Module.sharpToMdLink(BASE_URL, input);
    expect(output).toBe(input);

    input = `${BASE_URL}/123#245a`;
    output = Module.sharpToMdLink(BASE_URL, input);
    expect(output).toBe(input);

    input = ` 123#245 `;
    output = Module.sharpToMdLink(BASE_URL, input);
    expect(output).toBe(input);

    input = ` abc#245 `;
    output = Module.sharpToMdLink(BASE_URL, input);
    expect(output).toBe(input);
  });

  test("Multi links", () => {
    const input = "#123 #234 #345 #456";
    const output = Module.sharpToMdLink(BASE_URL, input);
    expect(output).toBe(`[#123](${BASE_URL}/123) [#234](${BASE_URL}/234) [#345](${BASE_URL}/345) [#456](${BASE_URL}/456)`);
  });

  test("In the article", () => {
    let input = `#123 に対して
#456を#555をマージ`;
    let output = Module.sharpToMdLink(BASE_URL, input);
    expect(output).toBe(`[#123](https://example.com/pull/123) に対して
[#456](https://example.com/pull/456)を[#555](https://example.com/pull/555)をマージ`);

    input = `https://example.com/hoge#123 は変換せずに#123は変換する`;
    output = Module.sharpToMdLink(BASE_URL, input);
    expect(output).toBe("https://example.com/hoge#123 は変換せずに[#123](https://example.com/pull/123)は変換する");
  });
});
