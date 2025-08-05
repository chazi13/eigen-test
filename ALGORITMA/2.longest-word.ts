const findLongestWord = (str: string) => {
  const chunks = str.split(" ");
  let longestWord = "";

  for (let i = 0; i < chunks.length; i++) {
    const word = chunks[i];

    if (word.length > longestWord.length) {
      longestWord = word;
    }
  }

  return longestWord;
};

const longestWord = findLongestWord(
  "Saya sangat senang mengerjakan soal algoritma"
);

console.log(longestWord);
