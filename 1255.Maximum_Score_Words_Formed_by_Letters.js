/**
 * @param {string[]} words
 * @param {character[]} letters
 * @param {number[]} score
 * @return {number}
 */

var mapper = function (arr, string) {
  for (const char of string) {
    arr[char.charCodeAt(0) - 97]++;
  }
};

var getTotalScore = function (words, ltrArr, score) {
  let temp = 0;
  if(! words || !words.length) {
    return temp;
  }
  const temArr = [...ltrArr];
  for (const word of words) {
    for (const char of word) {
      const charVal = char.charCodeAt(0) - 97;
      if (ltrArr[charVal] <= 0) {
        return 0;
      }
      temp += score[charVal];
      ltrArr[charVal]--;
    }
  }
  return temp;
};

var getSubsets = function (words) {
  const subsets = [[]];
  for(const word of words) {
    const newSet = [];
    for(const subset of subsets) {
      newSet.push([...subset, word]);
    }
    subsets.push(...newSet);
  }
  return subsets;
};

var maxScoreWords = function (words, letters, score) {
  const ltrArr = new Array(26).fill(0);
  let max = 0;
  mapper(ltrArr, letters);
  const subsets = getSubsets(words);
  for (const subset of subsets) {
    const totalScore = getTotalScore(subset, [...ltrArr], score);
    max = Math.max(max, totalScore);
  }

  return max;
};

const words = ["dog", "cat", "dad", "good"];
const letters = ["a", "a", "c", "d", "d", "d", "g", "o", "o"];
const score = [
  1, 0, 9, 5, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
console.log(maxScoreWords(words, letters, score));
