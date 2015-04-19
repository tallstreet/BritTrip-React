'use strict';

var React = require('react-native');
var {
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity,
} = React;

var UserStoreSync = require('../Mixins/UserStoreSync');
var UserStore = require('../Stores/UserStore');
var UserActions = require('../Actions/UserActions');
var PlacesActions = require('../Actions/PlacesActions');
var styles = require('./Styles');

var PlacesScreen = React.createClass({
  mixins: [UserStoreSync],

  afterUpdateUserFromStore() {
    var user = UserStore.getState();

    if (!user.get('email')) {
      this.props.navigator.replace({id: 'authenticate'});
    }
  },

  componentDidMount() {
    this.updateUserFromStore();
    UserStore.addChangeListener(this.updateUserFromStore);
    PlacesActions.loadPlaces();
  },

  render() {
    return (
      <Image style={styles.image} source={{uri: 'https://farm5.staticflickr.com/4037/4436811900_bb971be9c5_b.jpg'}}>

        <View style={styles.background}>
          <View style={styles.backgroundOverlay} />

          <View style={styles.contentContainer}>
            <Image source={{uri: this.state.user.getIn(['picture', 'data', 'url'])}}
                   style={styles.profilePicture} />
            <Text style={styles.name}>
              {this.state.user.get('name')}
            </Text>

            <TouchableOpacity onPress={UserActions.signOut}>
              <Text>Sign out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Image>
    )
  }
});

module.exports = PlacesScreen;
