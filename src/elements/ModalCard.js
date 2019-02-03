import React, { Component } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import Modal from "react-native-modalbox";

class ModalCard extends Component {
    render() {
        return (
            <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal4"}>
                <Text style={styles.text}>{this.props.washroom.name}</Text>
                <Button onPress={this.props.onPress} title="Get Directions" />
            </Modal>

              )
    }
}

export default ModalCard;

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center"
  },
  modal4: {
    height: 300
  },
  text: {
    color: "black",
    fontSize: 22
  }
});