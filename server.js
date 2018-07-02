var express = require('express');
const app = express();
const fs = require('fs');
var http = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const con = mongoose.createConnection('mongodb://localhost/worlddb');

const UserSocket = require('./src/sockets/UserSocket.js');
const userSocket = new UserSocket(con);
const MapSocket = require('./src/sockets/MapSocket.js');
const mapSocket = new MapSocket(con);
const port = 8080;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname ,'public')));

var data = []
var ids = []
var obj = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
// console.log(obj.length);
for(var i = 0; i < obj.length; i++) {
  ids.push(obj[i]['cca3'])
  var flag = obj[i]['flag']
  var name = obj[i]['name']['common']
  var capital = obj[i]['capital']
  var region = obj[i]['region']
  var latlng = obj[i]['latlng']
  var id = obj[i]['cca3']
  var img = obj[i]['image']
  var tmp = {'flag': flag, 'name': name, 'capital': capital,
        'region': region, 'latlng': latlng, 'id': id, 'image': img};
  data.push(tmp)
}

app.post('/user/signup', function (req, res) {
    
  var newUser = {username: req.body.username,
      password: req.body.password,
      updateTime: req.body.updateTime};
  
  userSocket.storeUsers(newUser, res);
});
app.post('/user/login', function (req, res) {
  var myUser = {
      username: req.body.username,
      password: req.body.password,
      updateTime: req.body.updateTime
  };

  userSocket.checkUsers(myUser, res);
});

app.post('/getData', (req, res) => {
  console.log(req.body.id);
  var index = ids.indexOf(req.body.id)
  if(index == -1){
    console.log('error...')
    res.send('error')
  } else{
    console.log(data[index])
    res.send(data[index])
  }
});

app.put('/save', (req, res) => {
  // console.log(req.body.username);
  // console.log(req.body.id);
  // console.log(req.body.level);
  var newData = {
    username: req.body.username,
    id: req.body.id,
    level: req.body.level,
    no: req.body.no
  }
  mapSocket.putMaps(newData, res);
})

app.get('/load', function(req, res){
  const username = req.query.username;
  // console.log(username);
  mapSocket.loadMapList(username, res);
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

http.listen(port, function(err) {
  if (err) {
      console.log(err);
  }
  console.log('listen on port ' + port);
});
