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

function KnightMoves2(start, end) {
  function Node([x, y], path = null) {
    return { x, y, path };
  }

  if (start[0] > end[0] && start[1] > end[1]) {
    const result = KnightMoves2(end, start);
    return result.reverse();
  }

  const startNode = Node(start);
  const queue = [startNode];
  const visited = [];
  const targetX = end[0];
  const targetY = end[1];

  function alreadyVisited(node, array) {
    return array.some((visitedNode) => {
      return node.x === visitedNode.x && node.y === visitedNode.y;
    });
  }

  function addChildNode(offsetx, offsety, currentNode) {
    const resultX = currentNode.x + offsetx;
    const resultY = currentNode.y + offsety;
    const childNode = Node([resultX, resultY], currentNode);
    if (
      resultX >= 0 &&
      resultX < 8 &&
      resultY >= 0 &&
      resultY < 8 &&
      !alreadyVisited(childNode, visited) &&
      !alreadyVisited(childNode, queue)
    )
      queue.push(childNode);
  }

  const possibleMoves = [
    [-2, -1],
    [-1, -2],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
  ];

  let finalNode = null;

  while (finalNode === null) {
    let currentNode = queue[0];
    if (currentNode.x === targetX && currentNode.y === targetY) {
      finalNode = currentNode;
      break;
    } else {
      const visitedNode = queue.shift();
      visited.push(visitedNode);
      possibleMoves.forEach((move) => {
        addChildNode(move[0], move[1], currentNode);
      });
    }
  }

  let finalPath = [];

  (function generatePath(node) {
    if (node === null) return;
    finalPath.unshift([node.x, node.y]);
    generatePath(node.path);
  })(finalNode);

  return finalPath;
}

console.log(KnightMoves2([0, 0], [4, 6]));
