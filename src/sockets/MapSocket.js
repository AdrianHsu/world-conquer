
const MapSchema = require('../models/map.js');
const mongoose = require('mongoose');

var Map = null;
class MapSocket {

  constructor(con) {
      Map = con.model('Map', MapSchema);
  }

  putMaps(data, res) {
      // console.log(data);
      
      var query = {username: data.username};
      var update = {
            username: data.username,
            id: data.id,
            level: data.level
        };
      var options = { upsert: true, new: true, setDefaultsOnInsert: true };

        // Find the document
        Map.findOneAndUpdate(query, update, options, function(error, result) {
            if (error) {
                console.log(error);
                res.send(error);
                return;
            } else {
                // console.log(result);
                res.send(result);
            }
        });
  };

  // loadMapList(host, res) {

  //   Map.find({author: host}, function(error, maps) {
        
  //       if (error) {
  //           console.log(error);
  //           res.send(error);
  //           return;
  //       } else {
  //           // console.log(maps);
  //           res.send(maps);
  //       }
  //   });
  //   }
}
module.exports = MapSocket;