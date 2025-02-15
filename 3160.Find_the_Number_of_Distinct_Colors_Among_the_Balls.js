/**
 * @param {number} limit
 * @param {number[][]} queries
 * @return {number[]}
 */
var queryResults = function(limit, queries) {
  const colorMap = new Map();
  const ballMap = new Map();
  const result = [];
  for(const [ball,color] of queries) {
      if(ballMap.has(ball)) {
          const oldColor = ballMap.get(ball);
          const count = colorMap.get(oldColor) - 1;
          colorMap.set(oldColor, count);
          if(count === 0) {
              colorMap.delete(oldColor);
          }
      }
      ballMap.set(ball,color);
      colorMap.set(color, (colorMap.get(color) || 0) + 1);
      result.push(colorMap.size);
  }
  return result;
};

console.log(queryResults(1,[[0,1],[1,4],[1,1],[1,4],[1,1]]));

