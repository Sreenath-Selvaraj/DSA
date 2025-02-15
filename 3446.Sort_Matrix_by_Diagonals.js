/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
var sortMatrix = function (grid) {
  const n = grid.length;
  let result = [];
  const map = new Map();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const key = i - j;
      console.log(key);
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(grid[i][j]);
    }
  }
  for (const [key, values] of map) {
    if (key >= 0) {
      values.sort((a, b) => b - a);
    } else {
      values.sort((a, b) => a - b);
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      grid[i][j] = map.get(i - j).shift();
    }
  }
  return grid;
};

// Example usage:
let grid = [
  [1, 7, 3],
  [9, 8, 2],
  [4, 5, 6],
];

let result = sortMatrix(grid);
console.log(result);
