/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AlertIOS
} from 'react-native';

import Mapbox, { MapView } from "@mapbox/react-native-mapbox-gl";
Mapbox.setAccessToken(
  "pk.eyJ1IjoiYnJpYW53YW5nIiwiYSI6ImNqZ3N3OGp1ejA0OHIyd214Nmt1djZweHEifQ.VNLH_D4ApSCcygeEJ813DQ"
);
import CustomButton from "./elements/CustomButton";


export default class App extends Component{
  data = [
    { id: "xasdw", long: -123.118716, lat: 49.287564, title: "sdas" },
    { id: "sqd", long: -123.111, lat: 49.282, title: "qwq" },
    { id: "xase12dw", long: -123.118716, lat: 49.47564, title: "sdwqwddas" }
  ];

  loopPoints = this.data.map(point => {
    console.log(point)
    return <Mapbox.PointAnnotation
      key={point.id}
      id={point.id}
      coordinate={[point.long, point.lat]}
      title={point.title}
      onSelected = {()=>{AlertIOS.alert("Nice!")}}
    />
    //<Image>
    //<Mapbox.CallOut>
  })
  // <Mapbox.PointAnnotation id="sqwe" coordinate={[-123.111, 49.282]} onSelected ={()=> {AlertIOS.alert("Nice");}}/>
  render() {
    return <View style={styles.container}>
        <Mapbox.MapView styleURL={Mapbox.StyleURL.Street} zoomLevel={14} heading={1 // zoomEnabled={true}
          } rotateEnabled={true} centerCoordinate={[-123.111, 49.282]} style={styles.container} showUserLocation={true} userTrackingMode={1}>
          {this.loopPoints}
        </Mapbox.MapView>
      </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
