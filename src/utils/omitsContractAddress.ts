export const omitsContractAddress = (str: string, frontLen: number, endLen: number) => {
  if (!str) return '-'
  return `${str.substring(0, frontLen)}***${str.substring(str.length - endLen)}`;
}