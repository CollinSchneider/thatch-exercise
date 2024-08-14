export function numberToCurrency(number) {
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}