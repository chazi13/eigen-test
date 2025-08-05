const subSumMatrixDiagonal = (matrix: number[][]) => {
  if (!matrix.length || matrix.some((m) => m.length !== matrix.length)) {
    throw new Error("it's not NxN matrix");
  }

  const mainDiagonal = matrix
    .map((row, i) => row[i])
    .reduce<number>((acc, curr) => acc + curr, 0);
  const antiDiagonal = matrix
    .map((row, i) => row[row.length - 1 - i])
    .reduce<number>((acc, curr) => acc + curr, 0);

  return mainDiagonal - antiDiagonal;
};

const total = subSumMatrixDiagonal([
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
]);
console.log(total);
