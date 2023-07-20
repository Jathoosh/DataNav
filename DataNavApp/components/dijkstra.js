const gorkiMap = [
    [0, [4, 121], [1, 207]],
    [1, [5, 121], [2, 167], [0, 207]],
    [2, [6, 121], [1, 167]],
    [3, [4, 20]],
    [4, [0, 121], [3, 20], [5, 207]],
    [5, [1, 121], [6, 167], [4, 207]],
    [6, [2, 121], [5, 167]],
]


// CACUL OF THE SHORTEST PATH (Dijkstra)
function dijkstra(graph, startNode) {
    const dijkstraTable = [];
    let line = [];

    // Initial State (k = 0)
    for (let i of graph) {
        if (i[0] === startNode) {
            line.push([0, null]);
        } else {
            line.push([Infinity, null]);
        }
    }

    dijkstraTable.push(line);

    // Loop for each node until the last one
    for (let k = 0; k < graph.length - 1; k++) {
        line = [];
        for (let i = 0; i < graph.length; i++) {
            let min = dijkstraTable[k][i][0];
            let minIndex = dijkstraTable[k][i][1];
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
}

console.log(dijkstra(gorkiMap, 0));
  

function dijkstra2(graph, startNode) {
    const distances = {};
    const visited = {};
    const previous = {};
  
    graph.forEach(([node]) => {
      distances[node] = node === startNode ? 0 : Infinity;
      visited[node] = false;
      previous[node] = null;
    });
  
    while (true) {
      let currentNode = null;
      let minDistance = Infinity;
  
      for (const [node] of graph) {
        if (!visited[node] && distances[node] < minDistance) {
          minDistance = distances[node];
          currentNode = node;
        }
      }
  
      if (currentNode === null || minDistance === Infinity) {
        break;
      }
  
      visited[currentNode] = true;
  
      for (const [node, ...roads] of graph) {
        if (node === currentNode) {
          for (const [adjNode, weight] of roads) {
            const newDistance = distances[currentNode] + weight;
            if (newDistance < distances[adjNode]) {
              distances[adjNode] = newDistance;
              previous[adjNode] = currentNode;
            }
          }
        }
      }
    }
  
    const shortestPath = [];
    let currentNode = startNode;
  
    while (currentNode !== null) {
      shortestPath.unshift(currentNode);
      currentNode = previous[currentNode];
    }
  
    return shortestPath;
  }
  
console.log(dijkstra2(gorkiMap, 0));
  