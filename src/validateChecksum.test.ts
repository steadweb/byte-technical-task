import validateChecksum from "./validateChecksum";
import * as fs from "fs";
import * as path from "path";

describe("validateChecksum", () => {
  test("a value of 1122 and a checksum of 3 should return true", () => {
    expect(validateChecksum("1122", 3)).toBe(true);
  });

  test("a value of 1111 and a checksum of 4 should return true", () => {
    expect(validateChecksum("1111", 4)).toBe(true);
  });

  test("a value of 91212129 and a checksum of 9 should return true", () => {
    expect(validateChecksum("91212129", 9)).toBe(true);
  });

  test("01-general.txt value and a checksum of 1393 should return true", () => {
    expect(
      validateChecksum(
        fs
          .readFileSync(path.resolve("src", "__testdata__", "01-general.txt"))
          .toString(),
        1393
      )
    ).toBe(true);
  });
});
