import React, { Component } from 'react';
import {
    Platform,
    FlatList,
    StyleSheet,
    Text,
    View,
    AlertIOS,
    Button
} from 'react-native';

import MapboxGL, { MapView } from "@mapbox/react-native-mapbox-gl";
import Polyline from "@mapbox/polyline";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchWashrooms } from "../_actions/washrooms";
import { fetchDirection } from "../_actions/direction";
import Modal from "react-native-modalbox";
import getDirections from "react-native-google-maps-directions";
import ModalCard from "../elements/ModalCard";

const token =
  "pk.eyJ1IjoiYnJpYW53YW5nIiwiYSI6ImNqZ3N3OGp1ejA0OHIyd214Nmt1djZweHEifQ.VNLH_D4ApSCcygeEJ813DQ";

MapboxGL.setAccessToken(
  token
);
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedWashroom: "",
            direction:{},
            coords:[],
            route:
            {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "LineString",
                            // "coordinates": this.props.direction.routes[0].geometry.coordinates
                            "coordinates": [
                                [
                                    -123.111,
                                    49.282
                                ],
                                [
                                    -123.118716,
                                    49.287564 
                                ],
                                [
                                    -123.13,
                                    49.287564
                                ]
                            ]
                        }
                    }
                ]
            },   };

        this.getRoute = this.getRoute.bind(this)
        this.renderWashroomMarkers = this.renderWashroomMarkers.bind(this);
        this.handleGetDirections = this.handleGetDirections.bind(this);
    }

    componentDidMount() {
        this.props.fetchData();
    }
    
    // async getRoute(startLoc, destinationLoc) {
    //     try {
    //         let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`)
    //         let respJson = await resp.json();
    //         let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
    //         let coords = points.map((point, index) => {
    //             return {
    //                 latitude: point[0],
    //                 longitude: point[1]
    //             }
    //         })
    //         this.setState({ coords: coords })
    //         return coords
    //     } catch (error) {
    //         alert(error)
    //         return error
    //     }
    // }

    getRoute = () =>{
        this.props.fetchDirection("-123.111,49.282;-123.118716,49.287564");
        this.setState({ direction: this.props.direction})
        AlertIOS.alert(this.props.direction);
    }

    renderWashroomMarkers = point => {
        return (
            <MapboxGL.PointAnnotation
                key={point._id}
                id={point._id}
                coordinate={[point.long, point.lat]}
                title={point.name}
                onSelected={() => {
                    // AlertIOS.alert(point.name);
                    this.setState({selectedWashroom:point})
                    this.refs.modal4.open()
                    this.getRoute()
                    // AlertIOS.alert(this.props.direction);
                    //this.getRoute("49.282,-123.111 ", "49.287564,-123.118716");
                }}
            />
        )
    }

    handleGetDirections = () => {
        const data = { 
            source: { latitude: 49.282, longitude: -123.111 }, 
            destination: { latitude: this.state.selectedWashroom.lat, longitude: this.state.selectedWashroom.long }, 
            params: [{ key: "travelmode", value: "walking" }, { key: "dir_action", value: "navigate" }] 
        }; 
            // may be "walking", "bicycling" or "transit" as well // this instantly initializes navigation using the given travel mode
        getDirections(data)
    }
    
  render() {
    if (this.props.hasErrored) {
        return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
        return <p>Loading…</p>;
    }
    return <View style={styles.container}>
        <MapboxGL.MapView styleURL={MapboxGL.StyleURL.Street} zoomLevel={13} heading={1 // zoomEnabled={true}
          } rotateEnabled={true} centerCoordinate={[-123.111, 49.282]} style={styles.container} showUserLocation={true} userTrackingMode={1}>
          <>{this.props.washrooms.map(this.renderWashroomMarkers)}</>
            <MapboxGL.ShapeSource id='line1' shape={this.state.route}>
                <MapboxGL.LineLayer id='linelayer1' style={{ lineColor: 'red' }} />
            </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
        {/* <MapboxGL.MapView.Polyline coordinates={this.state.coords} strokeWidth={2} strokeColor="red" /> */}
        <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal4"}>
          <Text style={styles.text}>
            {this.state.selectedWashroom.name}
          </Text>
          <Button onPress={this.handleGetDirections} title="Get Directions" />
        </Modal>
        {/* <ModalCard washroom = {this.state.selectedWashroom} onPress = {this.handleGetDirections}/> */}
      </View>;
  }
}

const mapStateToProps = state => {
  return {
    washrooms: state.washrooms,
    hasErrored: state.washroomsHasErrored,
    isLoading: state.washroomsIsLoading,
    direction: state.direction,
    dhasErrored: state.directionHadErrored,
    disLoading: state.directionIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: () => dispatch(fetchWashrooms()),
      fetchDirection : (coords) => dispatch(fetchDirection(coords))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal4: {
        height: 300
    },
    text: {
        color: "black",
        fontSize: 22
    }
});
