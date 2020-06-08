import generateChecksum from "./generateChecksum";
import { NUMBER_COMPARE_GENERATOR, TSV_GENERATOR } from "./generateChecksum";
import * as fs from "fs";
import * as path from "path";

describe("generateChecksum", () => {
  describe("NUMBER_COMPARE_GENERATOR", () => {
    test("a value of 1122 should generate a checksum of 3", () => {
      expect(generateChecksum("1122", NUMBER_COMPARE_GENERATOR)).toBe(3);
    });

    test("a value of 1111 should generate a checksum of 4", () => {
      expect(generateChecksum("1111", NUMBER_COMPARE_GENERATOR)).toBe(4);
    });

    test("a value of 91212129 should generate a checksum of 9", () => {
      expect(generateChecksum("91212129", NUMBER_COMPARE_GENERATOR)).toBe(9);
    });

    test("the value in 01-general.txt value should generate a checksum of 1393", () => {
      expect(
        generateChecksum(
          fs
            .readFileSync(path.resolve("src", "__testdata__", "01-general.txt"))
            .toString(),
          NUMBER_COMPARE_GENERATOR
        )
      ).toBe(1393);
    });

    test("expect an invalid generator version to throw an error", () => {
      expect(() => generateChecksum("1122", "foo")).toThrow(
        "Generator version unknown: foo"
      );
    });
  });

  describe("TSV_GENERATOR", () => {
    test("a row of 5 1 9 5 should generate a checksum of 8", () => {
      expect(generateChecksum("5	1	9	5", TSV_GENERATOR)).toBe(8);
    });

    test("a row of 7 5 3 should generate a checksum of 4", () => {
      expect(generateChecksum("7	5	3", TSV_GENERATOR)).toBe(4);
    });

    test("a row of 2 4 6 8 should generate a checksum of 6", () => {
      expect(generateChecksum("2	4	6	8", TSV_GENERATOR)).toBe(6);
    });

    test("the tsv file 02-general.tsv value should generate a checksum of 32121", () => {
      const rows = fs
        .readFileSync(path.resolve("files", "02-general.tsv"))
        .toString()
        .split("\n");

      expect(generateChecksum(rows, TSV_GENERATOR)).toBe(32121);
    });
  });
});
