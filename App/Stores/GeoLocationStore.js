var createStore = require('flux-util').createStore;
var Immutable = require('immutable');
var dispatcher = require('../AppDispatcher');
var ApiConstants = require('../Constants/ApiConstants');
var PlacesConstants = require('../Constants/PlacesConstants');
var PlacesActions = require('../Actions/PlacesActions');
var UserStore = require('../Stores/UserStore');
var merge = require('merge');

var _geoLocation = Immutable.Map();

var store = createStore({
  getState() {
    return _geoLocation;
  },

  dispatcherIndex: dispatcher.register(function(payload) {
    action = payload.action;

    switch(action.actionType) {
      case PlacesConstants.GET_GEOLOCATION:
        navigator.geolocation.getCurrentPosition(
          (initialPosition) => {
            _geoLocation = Immutable.fromJS(initialPosition);
            store.emitChange(action);
            dispatcher.handleViewAction({
              actionType: PlacesConstants.LOAD_PLACES,
            });
          },
          (error) => console.error(error)
        );
        break;
    }

    return true;
  })
})

module.exports = store;
