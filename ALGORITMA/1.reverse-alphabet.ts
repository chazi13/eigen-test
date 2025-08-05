const reverseAlphabet = (str: string) => {
  const strArr = str.split("");
  const letters = strArr.filter((c) => /^[a-z]$/i.test(c));

  const reversedArr = strArr.map((c) =>
    /^[a-z]$/i.test(c) ? letters.pop() : c
  );

  return reversedArr.join("");
};

const reversedStr = reverseAlphabet("NEGIE1");
console.log(reversedStr);
