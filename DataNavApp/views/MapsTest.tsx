import React, {useEffect} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import SvgComponent from './Maps_scheme/map_layout';
import jsonData from './Maps_scheme/data2.json';
import {Svg, Path} from 'react-native-svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// CALCULATE THE SHORTEST PATH
// Definition des types de la Map
type Road = {
  id: Number;
  direction: String;
  start_node: Number;
  end_node: Number;
  length: Number;
};

type Intersection = {
  id: Number;
  x: Number;
  y: Number;
  roads: Number[];
};

type JSONMap = {
  roads: Road[];
  intersections: Intersection[];
};

type RootStackParamList = {
  Home: undefined;
  Accelerator: undefined;
  Maps: {serverInfos: string; code: string} | undefined;
  Login: undefined;
  MapsTest: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'MapsTest'>;

const jsonMap: JSONMap = jsonData as unknown as JSONMap;
const startNode: Intersection['id'] = 6;

// Fonction pour récupérer le graphe pour l'algorithme de Dijkstra

// FONCTION DE TEST DE LA MAP
function MapsTest(navigation: Props) {
  
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Login');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  });
  
  const getGraphInfo = function (
    startNode: Intersection['id'],
    jsonMap: JSONMap,
  ) {
    const roads = jsonMap.roads;
    const intersections = jsonMap.intersections;
    const graph = [];

    //Parcours des intersections
    for (const intersection of intersections) {
      const nodeID = intersection.id;
      const roadIDS = intersection.roads;
      var line = []
      line.push(nodeID);
      // Parcours de chaque chemin (tuples)
      
      roadIDS.map(id => {
        line.push([
          id,
          roads.filter(road => {
            return road.id === id;
          })[0].length,
        ]);
      });

      graph.push(line);
    }

    return graph;
  };

  // Jeu de test
  const graph = getGraphInfo(startNode, jsonMap);
  console.log("[");
  for (const line of graph) {
    console.log("\t",line);
  }
  console.log("]");

  return (
    <View style={styles.container}>
      <SvgComponent />
    </View>
  );
}

/*
// CACUL OF THE SHORTEST PATH (Dijkstra)
function dijkstra(graph: Array<Array<any>>, startNode: Intersection['id']) {
  const distances: { [key: number]: number } = {};
  const visited: { [key: number]: boolean } = {};
  const previous: { [key: number]: number | null } = {};

  graph.forEach(([node]) => {
    distances[node] = node === startNode ? 0 : Infinity;
    visited[node] = false;
    previous[node] = null;
  });

  while (true) {
    let currentNode: number | null = null;
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

    for (const [node, ...road] of graph) {
      if (node === currentNode) {
        for (const [adjNode, weight] of road) {
          const newDistance = distances[currentNode] + weight;
          if (newDistance < distances[adjNode]) {
            distances[adjNode] = newDistance;
            previous[adjNode] = currentNode;
          }
        }
      }
    }
  }

  const shortestPath: Array<number> = [];
  let currentNode: any | null = startNode;

  while (currentNode !== null) {
    shortestPath.unshift(currentNode);
    currentNode = previous[currentNode];
  }

  return shortestPath;
}

//Jeu de test Dijkstra
// Graphe de test
const graph = [
  [0, [0, 121], [3, 207]],
  [1, [1, 121], [4, 167]],
  [2, [2, 121], [4, 167]],
  [3, [7, 20]],
  [4, [0, 121], [7, 20]],
  [5, [1, 121], [5, 167]],
  [6, [2, 121], [5, 167]]
];

// Appel de la fonction Dijkstra
const shortestPath = dijkstra(graph, startNode);

console.log("Shortest Path:", shortestPath);
*/

const shortestPath: number[] = [6,2,5,1,4,3,0];


// STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{rotate: '0deg'}],
  },
});

export default MapsTest;
