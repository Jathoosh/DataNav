import React from 'react';
import {StyleSheet, View} from 'react-native';
import SvgComponent from './Maps_scheme/map_layout';
import jsonData from './Maps_scheme/data2.json';

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

const jsonMap: JSONMap = jsonData as unknown as JSONMap;
const startNode: Intersection['id'] = 6;

// Fonction pour récupérer le graphe pour l'algorithme de Dijkstra

// FONCTION DE TEST DE LA MAP
function MapsTest(navigation: any) {
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

      graph.push(nodeID);

      // Parcours de chaque chemin (tuples)
      graph.push(
        roadIDS.map(id => {
          return [
            id,
            roads.filter(road => {
              return road.id === id;
            })[0].length,
          ];
        }),
      );
    }

    return graph;
  };

  // Jeu de test
  const graph = getGraphInfo(startNode, jsonMap);
  console.log(graph);

  return (
    <View style={styles.container}>
      <SvgComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{rotate: '0deg'}],
  },
});

export default MapsTest;
