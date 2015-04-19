'use strict';

var React = require('react-native');
var {
  Text,
  View,
  Image,
  Navigator,
  ScrollView,
  TouchableOpacity,
} = React;

var StyleSheet= React.StyleSheet;

var UserStore = require('../Stores/UserStore');
var PlacesStore = require('../Stores/PlacesStore');
var UserActions = require('../Actions/UserActions');
var PlacesActions = require('../Actions/PlacesActions');
var Place = require('./Place');

var styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
  },
  horizontalScrollView: {
    height: 120,
  },
  containerPage: {
    height: 50,
    width: 50,
    backgroundColor: '#527FE4',
    padding: 5,
  },
  text: {
    fontSize: 20,
    color: '#888888',
    left: 80,
    top: 20,
    height: 40,
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  buttonContents: {
    flexDirection: 'row',
    width: 64,
    height: 64,
  },
  img: {
    width: 64,
    height: 64,
  }
});

var createPlaceRow = (place, i) => <Place key={i} place={place.toJS()} />;


var PlacesScreen = React.createClass({
  getInitialState() {
    return {user: UserStore.getState(), places: PlacesStore.getState()}
  },

  updateUserFromStore() {
    this.setState({user: UserStore.getState()});
    if (this.afterUpdateUserFromStore) {
      this.afterUpdateUserFromStore();
    }
  },

  updatePlacesFromStore() {
    this.setState({places: PlacesStore.getState()});
  },


  componentDidMount() {
    this.updateUserFromStore();
    UserStore.addChangeListener(this.updateUserFromStore);
    PlacesStore.addChangeListener(this.updatePlacesFromStore);
    PlacesActions.loadPlaces();
  },

  componentWillUnmount() {
    UserStore.removeChangeListener(this.updateUserFromStore);
    PlacesStore.removeChangeListener(this.updatePlacesFromStore);
  },


  afterUpdateUserFromStore() {
    var user = UserStore.getState();

    if (!user.get('email')) {
      this.props.navigator.replace({id: 'authenticate'});
    }
  },

  render() {
    return (
      <ScrollView
        horizontal={true}
        contentInset={{top: 20}}
        style={[styles.scrollView, styles.horizontalScrollView]}>
        {this.state.places.map(createPlaceRow)}
      </ScrollView>
    )
  }
});

module.exports = PlacesScreen;
