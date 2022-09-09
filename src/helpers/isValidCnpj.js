const handleCalc = (array, number) => {
  const slice = array.slice(0, number)
  let factor = number - 7
  let sum = 0

  for (let i = number; i >= 1; i--) {
    const n = slice[number - i]
    sum += n * factor--
    if (factor < 2) factor = 9
  }

  const result = 11 - (sum % 11)

  return result > 9 ? 0 : result
}
module.exports = () => {
  if (!cnpj) return false;

  if (cnpj.length > 14) return false;

  const digitsOnly = /^\d{14}$/.test(cnpj);

  if (!digitsOnly) return false;

  const match = cnpj.toString().match(/\d/g);
  const numbers = Array.isArray(match) ? match.map(Number) : [];

  if (numbers.length !== 14) return false;
  
  const items = [...new Set(numbers)];
  if (items.length === 1) return false;

  const digits = numbers.slice(12);
  
  const numbersLenghtWithoutTwoDigits = 14 - 2;
  const digit0 = handleCalc(numbers, numbersLenghtWithoutTwoDigits);
  if (digit0 !== digits[0]) return false

  const numbersLenghtWithoutOneDigit = 14 - 1;
  const digit1 = handleCalc(numbers, numbersLenghtWithoutOneDigit)
  return digit1 === digits[1]
}