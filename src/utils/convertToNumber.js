export const convertToNumber = (string) => {
  const number = Number(string);
  if (Number.isNaN(number) || number <= 0) {
    return 0;
  }
  return number;
};
