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
MapboxGL.setAccessToken(
    "pk.eyJ1IjoiYnJpYW53YW5nIiwiYSI6ImNqZ3N3OGp1ejA0OHIyd214Nmt1djZweHEifQ.VNLH_D4ApSCcygeEJ813DQ"
);
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchWashrooms } from "../_actions/washrooms";
import Modal from "react-native-modalbox";
import getDirections from "react-native-google-maps-directions";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedWashroom:"" };
    }

    componentDidMount() {
        this.props.fetchData();
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
                }}
            />
        )
    }

    handleGetDirections = () => {
        const data = { source: { latitude: 49.282, longitude: -123.111 }, destination: { latitude: 49.287564, longitude: -123.118716 }, params: [{ key: "travelmode", value: "driving" }, { key: "dir_action", value: "navigate" }] }; // may be "walking", "bicycling" or "transit" as well // this instantly initializes navigation using the given travel mode

        getDirections(data)
    }
    
  render() {
    if (this.props.hasErrored) {
        return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
        return <p>Loading…</p>;
    }
    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          styleURL={MapboxGL.StyleURL.Street}
          zoomLevel={13}
          heading={
            1 // zoomEnabled={true}
          }
          rotateEnabled={true}
          centerCoordinate={[-123.111, 49.282]}
          style={styles.container}
          showUserLocation={true}
          userTrackingMode={1}
        >
        <>{this.props.washrooms.map(this.renderWashroomMarkers)}</>
        </MapboxGL.MapView>
            <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal4"}>
                <Text style={styles.text}>{this.state.selectedWashroom.name}</Text>
                <Button onPress={this.handleGetDirections} title="Get Directions" />
            </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    washrooms: state.washrooms,
    hasErrored: state.washroomsHasErrored,
    isLoading: state.washroomsIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
      fetchData: bindActionCreators(fetchWashrooms,dispatch)
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
