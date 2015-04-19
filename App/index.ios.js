'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Navigator,
  View,
  Stylesheet,
} = React;

var LocalStorage = require('./Stores/LocalStorage');
var PlacesStore = require('./Stores/PlacesStore');
var UserStore = require('./Stores/UserStore');
var PlacesScreen = require('./Screens/PlacesScreen');
var LoginScreen = require('./Screens/LoginScreen');

var FacebookLogin = React.createClass({
  getInitialState() {
    return {bootstrapped: false}
  },

  componentWillMount() {
    LocalStorage.bootstrap(() => this.setState({bootstrapped: true}));
  },

  renderScene(route, nav) {
    switch (route.id) {
      case 'authenticate':
        return <LoginScreen navigator={nav} />;
      case 'places':
        return <PlacesScreen navigator={nav} />;
      default:
        return <View />;
    }
  },

  render() {
    if (this.state.bootstrapped === false) {
      return <View />
    }

    return (
      <Navigator
        initialRoute={{ id: 'authenticate', }}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }

          return Navigator.SceneConfigs.FloatFromRight;
        }} />
    );
  }
})

AppRegistry.registerComponent('BritTrip_React', () => FacebookLogin);
