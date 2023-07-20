const gorkiMap = [
  [0, [0, 121], [3, 207]],
  [1, [1, 121], [4, 167]],
  [2, [2, 121], [4, 167]],
  [3, [7, 20]],
  [4, [0, 121], [7, 20]],
  [5, [1, 121], [5, 167]],
  [6, [2, 121], [5, 167]],
];

type Intersection = {
  id: Number;
  x: Number;
  y: Number;
  roads: Number[];
};

// CACUL OF THE SHORTEST PATH (Dijkstra)
export function dijkstra(
  graph: Array<Array<any>>,
  startNode: Intersection['id'],
  destinationNode: Intersection['id'],
) {
  const dijkstraTable = [];
  let line = [];

  // Initial State (k = 0)
  for (let i of graph) {
    if (i[0] === startNode) {
      line.push([0, -1]);
    } else {
      line.push([Infinity, -1]);
    }
  }

  dijkstraTable.push(line);

  // Loop for each node until the last one
  for (let k = 0; k < graph.length - 1; k++) {
    line = [];
    for (let i = 0; i < graph.length; i++) {
      let min: Number = dijkstraTable[k][i][0];
      let minIndex: Number = dijkstraTable[k][i][1];
      for (let j = 1; j < graph[i].length; j++) {
        const node = graph[i][j][0];
        const weight = graph[i][j][1];
        if (dijkstraTable[k][node][0] + weight < min) {
          min = dijkstraTable[k][node][0] + weight;
          minIndex = node;
        }
      }
      line.push([min, minIndex]);
    }
    dijkstraTable.push(line);
  }

  const shortestPath: Array<number> = [];
  let currentNode: Number = startNode;

  while (shortestPath[shortestPath.length - 1] !== destinationNode) {
    shortestPath.push(currentNode.valueOf());
    currentNode =
      dijkstraTable[shortestPath.length - 1][currentNode.valueOf()][1];
  }

  return shortestPath;
}

//console.log(dijkstra(gorkiMap, 0, 6));
