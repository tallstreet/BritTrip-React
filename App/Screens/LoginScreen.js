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

var StyleSheet= React.StyleSheet;

var UserActions = require('../Actions/UserActions');
var UserStore = require('../Stores/UserStore');
var UserActions = require('../Actions/UserActions');
var DeviceHeight = require('Dimensions').get('window').height;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  backgroundOverlay: {
    opacity: 0.5,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  headingContainer: {
    backgroundColor: 'transparent',
    top: 50
  },
  loginContainer: {
    backgroundColor: 'transparent',
    top: 200
  },
  headingText: {
    fontSize: 50,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff',
    margin: 10,
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff',
    margin: 10,
    opacity: 0.8,
  },
  aboutButtonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#efefef',
    opacity: 0.8,
  },
  contentContainer: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
  },
  name: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 15,
    alignSelf: 'center',
  },
  image: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'transparent',
    left: 0,
    right: 0,
  },
  aboutTitle: {
    fontSize: 20,
    marginBottom: 10,
  }
});

var LoginScreen = React.createClass({
  getInitialState() {
    return {user: UserStore.getState()}
  },

  updateUserFromStore() {
    this.setState({user: UserStore.getState()});
    if (this.afterUpdateUserFromStore) {
      this.afterUpdateUserFromStore();
    }
  },

  componentDidMount() {
    this.updateUserFromStore();
    UserStore.addChangeListener(this.updateUserFromStore);
  },

  componentWillUnmount() {
    UserStore.removeChangeListener(this.updateUserFromStore);
  },

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
