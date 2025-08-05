const findQueryWordInInput = (queries: string[], inputs: string[]) => {
  const inputMap = new Map<string, number[]>();
  const queryFoundTotal: number[] = [];

  inputs.forEach((i, idx) => {
    const inputIndexes = inputMap.get(i);

    if (inputIndexes) {
      inputMap.set(i, [...inputIndexes, idx]);
    } else {
      inputMap.set(i, [idx]);
    }
  });

  queries.forEach((q) => {
    const inputIndexes = inputMap.get(q) ?? [];

    queryFoundTotal.push(inputIndexes.length);
  });

  return queryFoundTotal;
};

const QUERY = ["bbb", "ac", "dz"];
const INPUT = ["xc", "dz", "bbb", "dz"];

const foundIndexes = findQueryWordInInput(QUERY, INPUT);
console.log(foundIndexes);
