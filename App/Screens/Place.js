'use strict';

var React = require('react-native');
var {
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity,
} = React;

var StyleSheet= React.StyleSheet;

var styles = StyleSheet.create({
  button: {
    margin: 7,
    padding: 5,
    width: 360,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  img: {
    width: 360,
    height: 360,
  },
  placeTitle: {
    fontSize: 20,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#000',
    margin: 10,
    opacity: 0.8,
  },
  placeDescription: {
    fontSize: 12,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#000',
    margin: 10,
    opacity: 0.8,
  },
});


var Place = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  },
  render: function() {
    var img = 'http://media.api.visitbritain.com/' + this.props.place.images[0] + '_cell_2x2_640.jpg';
    return (
      <View style={styles.button}>
          <Image style={styles.img} source={{uri:img}} />
          <Text style={styles.placeTitle}>
            {this.props.place.title}
          </Text>
          <Text style={styles.placeDescription}>
            {this.props.place.description}
          </Text>
      </View>
    );
  }
});

module.exports = Place;
