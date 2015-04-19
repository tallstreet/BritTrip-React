var dispatcher = require('../AppDispatcher');
var { dispatch, handleResponse } = require('flux-util').apiHelpersFor(dispatcher);
var ApiConstants = require('../Constants/ApiConstants');
var PlacesConstants = require('../Constants/PlacesConstants');
var _ = require('lodash');

module.exports = {
  getTimes(position, places) {
    var locs = {};
    places.data.forEach(function(val, i) {
        if (val.location !== null) {
            locs[i] = [val.location.lat, val.location.lng];
        }
    });
    var url = 'http://api.traveltimeapp.com/v3/time_filter';

    var data  ={
        "app_id": "893138db",
        "app_key": "1f666db85092e28ea3ac921ea0c95fa6",
        "points": locs,
        "sources": {
            "source1": {
                "travel_time": 43200,
                "coords": [position.coords.latitude, position.coords.longitude],
                "mode": "walking_bus",
                "properties": ["time", "distance"],
                "start_time": new Date()
            }
        },
        "destinations": {},
        "remove_wait_time": false


    };

    var key = PlacesConstants.LOAD_TIMES;
    var params = {position: position, places: places};

    var a = fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    a.then(handleResponse(key, params));
    //a.then(function() {console.log(arguments)});
  }
};
