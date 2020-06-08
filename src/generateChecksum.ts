const formatNumbers = (data: string, splitOn: string): Array<number> =>
  data.split(splitOn).map(v => parseInt(v));

const numberCompareGenerator = (data: string): number => {
  let checksum = 0;
  const digits = formatNumbers(data, "");

  digits.forEach((v, k) => {
    const next = digits[k + 1];

    if (next !== undefined && next === v) {
      checksum += v;
    }
  });

  if (digits[0] === digits[digits.length - 1]) {
    checksum += digits[0];
  }

  return checksum;
};

const tsvGenerator = (rows: string[]): number => {
  let checksum = 0;

  rows.forEach(data => {
    const digits = formatNumbers(data, "	");

    if (digits) {
      const result = Math.max(...digits) - Math.min(...digits);

      // Don't allow NaN results to be calculated
      // Found this duringthe handling of splitting the array on \n and tabs
      if (!isNaN(result)) {
        checksum += result;
      }
    }
  });

  return checksum;
};

export const NUMBER_COMPARE_GENERATOR = "0";
export const TSV_GENERATOR = "1";

interface ChecksumGenerator {
  (data: string | Array<string>, version: string): number;
}

const generateChecksum: ChecksumGenerator = (
  data: string | string[],
  version: string = NUMBER_COMPARE_GENERATOR
) => {
  if (
    (version === NUMBER_COMPARE_GENERATOR || version === undefined) &&
    typeof data === "string"
  ) {
    // Default version to NUMBER_COMPARE_GENERATOR
    return numberCompareGenerator(data);
  }

  if (version === TSV_GENERATOR) {
    if (data && typeof data === "string") {
      data = [data];
    }

    if (Array.isArray(data)) {
      return tsvGenerator(data);
    }
  }

  throw new Error(`Generator version unknown: ${version}`);
};

export default generateChecksum;
