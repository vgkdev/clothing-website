export const getIndexSize = (size) => {
  return size === "S" ? 0 : size === "M" ? 1 : 2;
};
