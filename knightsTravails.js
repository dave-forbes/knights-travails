function Node([x, y], path = null) {
  return { x, y, path };
}

function alreadyVisited(node, set) {
  return set.has(`${node.x},${node.y}`);
}

function addChildNode(offsetx, offsety, currentNode, visited, queue) {
  const resultX = currentNode.x + offsetx;
  const resultY = currentNode.y + offsety;
  const childNode = Node([resultX, resultY], currentNode);
  if (
    resultX >= 0 &&
    resultX < 8 &&
    resultY >= 0 &&
    resultY < 8 &&
    !alreadyVisited(childNode, visited)
  )
    queue.push(childNode);
}

function generatePath(node, path = []) {
  if (node === null) return path;
  path.unshift([node.x, node.y]);
  return generatePath(node.path, path);
}

function KnightMoves(start, end) {
  const startNode = Node(start);
  const queue = [startNode];
  const visited = new Set();
  const targetX = end[0];
  const targetY = end[1];

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
    let currentNode = queue.shift();
    visited.add(`${currentNode.x},${currentNode.y}`);
    if (currentNode.x === targetX && currentNode.y === targetY) {
      finalNode = currentNode;
      break;
    } else {
      possibleMoves.forEach((move) => {
        addChildNode(move[0], move[1], currentNode, visited, queue);
      });
    }
  }

  return generatePath(finalNode);
}

console.log(KnightMoves([7, 7], [3, 3]));
