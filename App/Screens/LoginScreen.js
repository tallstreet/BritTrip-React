'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Navigator,
} = React;

var UserActions = require('../Actions/UserActions');
var UserStore = require('../Stores/UserStore');
var UserActions = require('../Actions/UserActions');
var styles = require('./Styles');
var UserStoreSync = require('../Mixins/UserStoreSync');
var DeviceHeight = require('Dimensions').get('window').height;

var LoginScreen = React.createClass({
  mixins: [UserStoreSync],

  login() {
    UserActions.newFacebookSession();
  },

  afterUpdateUserFromStore() {
    var user = UserStore.getState();

    if (user.get('email')) {
      this.props.navigator.replace({id: 'places'});
    }
  },

  showModalTransition(transition) {
    transition('opacity', {duration: 200, begin: 0, end: 1});
    transition('height', {duration: 200, begin: DeviceHeight * 2, end: DeviceHeight});
  },

  hideModalTransition(transition) {
    transition('height', {duration: 200, begin: DeviceHeight, end: DeviceHeight * 2, reset: true});
    transition('opacity', {duration: 200, begin: 1, end: 0});
  },

  render() {
    return (
      <Image style={styles.image} source={{uri: 'https://farm5.staticflickr.com/4037/4436811900_bb971be9c5_b.jpg'}}>

        <View style={styles.background}>

          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>
              BritTrip
            </Text>
          </View>

          <View style={styles.loginContainer}>
            <TouchableOpacity onPress={this.login}>
                <Text style={styles.buttonText}>
                  Sign in with Facebook
                </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity onPress={this.openModal} style={styles.aboutButton}>
              <Text style={styles.aboutButtonText}>
                About this project
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </Image>
    );
  },
});

module.exports = LoginScreen;
