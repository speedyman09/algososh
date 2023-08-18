import { expandString, stringToArr } from "./utils";

describe("expandStringFunc", () => {
  const setterValue = jest.fn();
  const setterLoader = jest.fn();

  const testCases = [
    { input: "test", expected: "tset" },
    { input: "oddtest", expected: "tsetddo" },
    { input: "t", expected: "t" },
    { input: "", expected: "" },
  ];

  test.each(testCases)("expandStringFunc %s", async ({ input, expected }) => {
    const result = await expandString(stringToArr(input, false), setterValue, setterLoader);
    expect(result).toEqual(stringToArr(expected, true));
  });
});
