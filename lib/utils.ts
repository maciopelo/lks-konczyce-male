export const parseDate = (date: string) => {
  const [y, m, d] = date.substring(0, 10).split("-");
  return `${d}/${m}/${y}`;
};
