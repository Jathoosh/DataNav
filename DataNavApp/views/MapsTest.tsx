import React, {useEffect} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import SvgComponent from './Maps_scheme/map_layout';
import jsonData from './Maps_scheme/data2.json';
import {dijkstra} from '../components/dijkstra';
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
  Maps: {serverInfos: string; serverN: string};
  Login: undefined;
  MapsTest: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'MapsTest'>;

const jsonMap: JSONMap = jsonData as unknown as JSONMap;

// FONCTION DE TEST DE LA MAP
function MapsTest({navigation}: Props) {
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

  // Fonction pour récupérer le graphe pour l'algorithme de Dijkstra
  const getGraphInfo = function (jsonMapToParse: JSONMap) {
    const roads = jsonMapToParse.roads;
    const intersections = jsonMapToParse.intersections;
    const graph = [];

    //Parcours des intersections
    for (const intersection of intersections) {
      const nodeID = intersection.id;
      const roadIDS = intersection.roads;
      var line = []
      line.push(nodeID);
      // Parcours de chaque chemin (tuples)

      roadIDS.map(id => {
        const correctRoad = roads.filter(road => {
          return road.id === id;
        })[0];
        const node =
          nodeID === correctRoad.start_node
            ? correctRoad.end_node
            : correctRoad.start_node;
        line.push([node, correctRoad.length]);
      });

      graph.push(line);
    }

    return graph;
  };

  // Affiche le graphe parsé
  const graph = getGraphInfo(jsonMap);
  console.log('[');
  for (const line of graph) {
    console.log('\t', line);
  }
  console.log(']');

  // Affiche le chemin le plus court
  const shortestPath = dijkstra(graph, 0, 6);
  console.log(shortestPath);

  return (
    <View style={styles.container}>
      <SvgComponent />
    </View>
  );
}

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
