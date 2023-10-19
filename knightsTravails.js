// function Node([x, y], path = []) {
//   return { x, y, path };
// }

// function checkNodeInArray(array, node) {
//   return array.some((item) => {
//     return item.x === node.x && item.y === node.y;
//   });
// }

// function KnightMoves(startCoOrds, endCoOrds) {
//   const startNode = Node(startCoOrds);
//   const coOrdsQueue = [startNode];
//   let path = [];
//   let visited = [];

//   function chessRecursion(startCoOrds, endCoOrds) {
//     console.log({ coOrdsQueue, visited, path });
//     const x = startCoOrds[0];
//     const y = startCoOrds[1];
//     const a = endCoOrds[0];
//     const b = endCoOrds[1];

//     if (x === a && y === b) {
//       return;
//     } else {
//       const enqueueNode = coOrdsQueue.shift();
//       visited.push([enqueueNode.x, enqueueNode.y]);
//       let newPath = enqueueNode.path.slice(1);
//       console.log({ newPath });
//       if (newPath !== path) {
//         path = newPath;
//         console.log({ path });
//       }
//       if (x + 1 < 8 && y + 2 < 8) {
//         const node = Node([x + 1, y + 2], path);
//         node.path = [path.flat(), [x, y]];
//         if (!checkNodeInArray(visited, node) && !checkNodeInArray(path, node)) {
//           coOrdsQueue.push(node);
//         }
//       }
//       if (x - 1 >= 0 && y + 2 < 8) {
//         const node = Node([x - 1, y + 2], path);
//         if (!checkNodeInArray(visited, node) && !checkNodeInArray(path, node)) {
//           node.path.push([x, y]);
//           coOrdsQueue.push(node);
//         }
//       }
//       if (x - 2 >= 0 && y + 1 < 8) {
//         const node = Node([x - 2, y + 1], path);
//         if (!checkNodeInArray(visited, node) && !checkNodeInArray(path, node)) {
//           node.path.push([x, y]);
//           coOrdsQueue.push(node);
//         }
//       }
//       if (x - 2 >= 0 && y - 1 >= 0) {
//         const node = Node([x - 2, y - 1], path);
//         if (!checkNodeInArray(visited, node) && !checkNodeInArray(path, node)) {
//           node.path.push([x, y]);
//           coOrdsQueue.push(node);
//         }
//       }
//       if (x + 1 < 8 && y - 2 >= 0) {
//         const node = Node([x + 1, y - 2], path);
//         if (!checkNodeInArray(visited, node) && !checkNodeInArray(path, node)) {
//           node.path.push([x, y]);
//           coOrdsQueue.push(node);
//         }
//       }
//       if (x + 2 < 8 && y - 1 >= 0) {
//         const node = Node([x + 2, y - 1], path);
//         if (!checkNodeInArray(visited, node) && !checkNodeInArray(path, node)) {
//           node.path.push([x, y]);
//           coOrdsQueue.push(node);
//         }
//       }
//       if (x + 2 < 8 && y + 1 < 8) {
//         const node = Node([x + 2, y + 1], path);
//         if (!checkNodeInArray(visited, node) && !checkNodeInArray(path, node)) {
//           node.path = [path.flat(), [x, y]];
//           coOrdsQueue.push(node);
//         }
//       }
//       return chessRecursion([coOrdsQueue[0].x, coOrdsQueue[0].y], endCoOrds);
//     }
//   }

//   chessRecursion(startCoOrds, endCoOrds);

//   path.push(endCoOrds);

// console.log(visited);

// return path;

// return (function formatPath(path) {
//   let result = [];
//   for (let i = 0; i < path.length; i += 2) {
//     result.push([path[i], path[i + 1]]);
//   }
//   return result;
// })(finalPath);
// }

// console.log(KnightMoves([0, 0], [3, 3]));

// KnightMoves([0, 0], [3, 3]);

// let node21 = Node([0, 1], []);
// node21.path.push([2, 1]);
// console.log(node21);

function Node([x, y], path = null) {
  return { x, y, path };
}

function KnightMoves2(start, end) {
  const startNode = Node(start);
  const queue = [startNode];
  const visited = [];
  const a = end[0];
  const b = end[1];

  function recursion(node) {
    const x = node.x;
    const y = node.y;
    if (x === a && y === b) {
      return node;
    } else {
      const visitedNode = queue.shift();
      visited.push(visitedNode);
      if (x + 1 < 8 && y + 2 < 8) {
        const childNode = Node([x + 1, y + 2], node);
        queue.push(childNode);
      }
      if (x - 1 >= 0 && y + 2 < 8) {
        const childNode = Node([x - 1, y + 2], node);
        queue.push(childNode);
      }
      if (x - 2 >= 0 && y + 1 < 8) {
        const childNode = Node([x - 2, y + 1], node);
        queue.push(childNode);
      }
      if (x - 2 >= 0 && y - 1 >= 0) {
        const childNode = Node([x - 2, y - 1], node);
        queue.push(childNode);
      }
      if (x + 1 < 8 && y - 2 >= 0) {
        const childNode = Node([x + 1, y - 2], node);
        queue.push(childNode);
      }
      if (x + 2 < 8 && y - 1 >= 0) {
        const childNode = Node([x + 2, y - 1], node);
        queue.push(childNode);
      }
      if (x + 2 < 8 && y + 1 < 8) {
        const childNode = Node([x + 2, y + 1], node);
        queue.push(childNode);
      }
      return recursion(queue[0]);
    }
  }
  const finalNode = recursion(startNode);

  const finalPath = [];

  (function generatePath(node) {
    if (node === null) return;
    finalPath.unshift([node.x, node.y]);
    generatePath(node.path);
  })(finalNode);

  console.log(visited);

  return finalPath;
}

console.log(KnightMoves2([0, 0], [7, 6]));
