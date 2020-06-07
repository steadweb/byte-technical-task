import generateChecksum from "./generateChecksum";
import * as fs from "fs";
import * as path from "path";

describe("generateChecksum", () => {
  test("a value of 1122 should generate a checksum of 3", () => {
    expect(generateChecksum("1122")).toBe(3);
  });

  test("a value of 1111 should generate a checksum of 3", () => {
    expect(generateChecksum("1111")).toBe(4);
  });

  test("a value of 91212129 should generate a checksum of 9", () => {
    expect(generateChecksum("91212129")).toBe(9);
  });

  test("the value in 01-general.txt value should generate a checksum of 1393", () => {
    expect(
      generateChecksum(
        fs
          .readFileSync(path.resolve("src", "__testdata__", "01-general.txt"))
          .toString()
      )
    ).toBe(1393);
  });
});
