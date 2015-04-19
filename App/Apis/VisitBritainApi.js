var dispatcher = require('../AppDispatcher');
var { dispatch, handleResponse } = require('flux-util').apiHelpersFor(dispatcher);
var ApiConstants = require('../Constants/ApiConstants');
var PlacesConstants = require('../Constants/PlacesConstants');

module.exports = {
  getPlaces(position, interests) {
    var lmt = 100;
    var lt = parseFloat(position.coords.latitude);
    var ln = parseFloat(position.coords.longitude);
    var limit = 'limit=' + lmt;
    var token = 't=A9NsGgd9UmxR';
    var url = `http://api.visitbritain.com/items?type=location&near=${ln},${lt}&${limit}&${token}`;

    var key = PlacesConstants.LOAD_CLOSEST_PLACES;
    var params = {position: position, interests: interests};

    fetch(url).then(handleResponse(key, params));
  }
};
