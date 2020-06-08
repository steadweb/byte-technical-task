import generateChecksum from "./generateChecksum";
import { NUMBER_COMPARE_GENERATOR } from "./generateChecksum";

interface Validation {
  (data: string | string[], userChecksum: number, version: string): boolean;
}

const validateChecksum: Validation = (
  data,
  userChecksum,
  version = NUMBER_COMPARE_GENERATOR
) => generateChecksum(data, version) === userChecksum;

export default validateChecksum;
