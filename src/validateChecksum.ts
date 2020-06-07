import generateChecksum from "./generateChecksum";

const validateChecksum = (data: string, userChecksum: number) => {
  return generateChecksum(data) === userChecksum;
};

export default validateChecksum;
