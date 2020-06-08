# Byte - Technical Task

This is a technical task for Byte. The code provided provides modules to validate data and a checksum

## Prerequisites

You'll need the following installed locally to run the install and run the tests within this project:

- Node 12.x
- NPM 6.x

## Quick start

NPM and Node are required to run this. Run the following commands

```bash
npm i
npm test
```

Output should be as follows:

```bash
 PASS  src/validateChecksum.test.ts
  validateChecksum
    NUMBER_COMPARE_GENERATOR
      ✓ a value of 1122 and a checksum of 3 should return true (1 ms)
      ✓ a value of 1111 and a checksum of 4 should return true (1 ms)
      ✓ a value of 91212129 and a checksum of 9 should return true
      ✓ 01-general.txt value and a checksum of 1393 should return true (1 ms)
      ✓ a value of 91212129 and an invalid checksum should return false
    TSV_GENERATOR
      ✓ a row of 5 1 9 5 should validate a checksum of 8 to true (1 ms)
      ✓ a row of 7 5 3 should validate the checksum of 4 to true
      ✓ a row of 2 4 6 8 should validate the checksum of 6 to true
      ✓ the tsv file 02-general.tsv value and checksum of 32121 should return true (1 ms)
      ✓ a row of 0 5 7 9 with an invalid checksum should return false

 PASS  src/generateChecksum.test.ts
  generateChecksum
    NUMBER_COMPARE_GENERATOR
      ✓ a value of 1122 should generate a checksum of 3 (1 ms)
      ✓ a value of 1111 should generate a checksum of 4
      ✓ a value of 91212129 should generate a checksum of 9
      ✓ the value in 01-general.txt value should generate a checksum of 1393 (1 ms)
      ✓ expect an invalid generator version to throw an error (9 ms)
    TSV_GENERATOR
      ✓ a row of 5 1 9 5 should generate a checksum of 8
      ✓ a row of 7 5 3 should generate a checksum of 4
      ✓ a row of 2 4 6 8 should generate a checksum of 6 (1 ms)
      ✓ the tsv file 02-general.tsv value should generate a checksum of 32121

Test Suites: 2 passed, 2 total
Tests:       19 passed, 19 total
Snapshots:   0 total
Time:        1.664 s
```

## Notes

A build function hasn't been provided to transpile this functionality down to JavaScript that could be used a module or understood by ES6 compat modules as this is a technical test.
