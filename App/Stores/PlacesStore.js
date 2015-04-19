var createStore = require('flux-util').createStore;
var Immutable = require('immutable');
var dispatcher = require('../AppDispatcher');
var ApiConstants = require('../Constants/ApiConstants');
var PlacesConstants = require('../Constants/PlacesConstants');
var PlacesActions = require('../Actions/PlacesActions');
var GeoLocationStore = require('./GeoLocationStore');
var UserStore = require('./UserStore');
var FacebookApi = require('../Apis/FacebookApi');
var VisitBritainApi = require('../Apis/VisitBritainApi');
var TravelTimeApi = require('../Apis/TravelTimeApi');
var merge = require('merge');
var _ = require('lodash');

var _places = Immutable.List();

var store = createStore({
  getState() {
    return _places;
  },

  dispatcherIndex: dispatcher.register(function(payload) {
    action = payload.action;


    if (action.response === ApiConstants.PENDING) {
      return true;
    }

    switch(action.actionType) {
      case PlacesConstants.LOAD_PLACES:
        var user = UserStore.getState();
        FacebookApi.getLikes(user.get('id'), user.get('token'));
        break;
      case PlacesConstants.LOAD_INTERESTS:
        dispatcher.waitFor([GeoLocationStore.dispatcherIndex]);
        var location = GeoLocationStore.getState();
        VisitBritainApi.getPlaces(location, action.response);
        break;
      case PlacesConstants.LOAD_CLOSEST_PLACES:
        _places = Immutable.fromJS(action.response.data);
        store.emitChange(action);
        var location = GeoLocationStore.getState();
        TravelTimeApi.getTimes(location, action.response);
        break;
      case PlacesConstants.LOAD_TIMES:
        _.forEach(action.response.sources.source1.points, function(time, i) {
          val = _places.get(i);
          _places = _places.set(i, val.set('time', time));
        });
        store.emitChange(action);
        break;
    }

    return true;
  })
});

module.exports = store;
