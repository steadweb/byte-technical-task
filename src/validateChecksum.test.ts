import validateChecksum from "./validateChecksum";
import { NUMBER_COMPARE_GENERATOR, TSV_GENERATOR } from "./generateChecksum";
import * as fs from "fs";
import * as path from "path";

describe("validateChecksum", () => {
  describe("NUMBER_COMPARE_GENERATOR", () => {
    test("a value of 1122 and a checksum of 3 should return true", () => {
      expect(validateChecksum("1122", 3, NUMBER_COMPARE_GENERATOR)).toBe(true);
    });

    test("a value of 1111 and a checksum of 4 should return true", () => {
      expect(validateChecksum("1111", 4, NUMBER_COMPARE_GENERATOR)).toBe(true);
    });

    test("a value of 91212129 and a checksum of 9 should return true", () => {
      expect(validateChecksum("91212129", 9, NUMBER_COMPARE_GENERATOR)).toBe(
        true
      );
    });

    test("01-general.txt value and a checksum of 1393 should return true", () => {
      expect(
        validateChecksum(
          fs
            .readFileSync(path.resolve("src", "__testdata__", "01-general.txt"))
            .toString(),
          1393,
          NUMBER_COMPARE_GENERATOR
        )
      ).toBe(true);
    });

    test("a value of 91212129 and an invalid checksum should return false", () => {
      expect(validateChecksum("2222", -1, NUMBER_COMPARE_GENERATOR)).toBe(
        false
      );
      expect(validateChecksum("2222", 8, NUMBER_COMPARE_GENERATOR)).toBe(true);
    });
  });

  describe("TSV_GENERATOR", () => {
    test("a row of 5 1 9 5 should validate a checksum of 8 to true", () => {
      expect(validateChecksum("5	1	9	5", 8, TSV_GENERATOR)).toBe(true);
    });

    test("a row of 7 5 3 should validate the checksum of 4 to true", () => {
      expect(validateChecksum("7	5	3", 4, TSV_GENERATOR)).toBe(true);
    });

    test("a row of 2 4 6 8 should validate the checksum of 6 to true", () => {
      expect(validateChecksum("2	4	6	8", 6, TSV_GENERATOR)).toBe(true);
    });

    test("the tsv file 02-general.tsv value and checksum of 32121 should return true", () => {
      const rows = fs
        .readFileSync(path.resolve("files", "02-general.tsv"))
        .toString()
        .split("\n");

      expect(validateChecksum(rows, 32121, TSV_GENERATOR)).toBe(true);
    });

    test("a row of 0 5 7 9 with an invalid checksum should return false", () => {
      expect(validateChecksum("0	5	7	9", -2, TSV_GENERATOR)).toBe(false);
      expect(validateChecksum("0	5	7	9", 9, TSV_GENERATOR)).toBe(true);
    });
  });
});
