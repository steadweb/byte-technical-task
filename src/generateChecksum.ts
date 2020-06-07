const generateChecksum = (data: string) => {
  let checksum = 0;
  const digits = data.split("").map(v => parseInt(v));

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

export default generateChecksum;
