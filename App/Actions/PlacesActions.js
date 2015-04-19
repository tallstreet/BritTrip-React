var FacebookLoginManager = require('NativeModules').FacebookLoginManager;
var dispatcher = require('../AppDispatcher');
var UserStore = require('../Stores/UserStore');
var PlacesConstants = require('../Constants/PlacesConstants');
var FacebookApi = require('../Apis/FacebookApi');
var AlertIOS = require('react-native').AlertIOS;

module.exports = {
  loadPlaces() {
    dispatcher.handleViewAction({
      actionType: PlacesConstants.GET_GEOLOCATION,
    });
  }

};
