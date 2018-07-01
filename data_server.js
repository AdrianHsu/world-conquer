var express = require('express');
const app = express();
const fs = require('fs');
var http = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname ,'public')));

var data = []
var ids = []
var obj = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
for(var i = 0; i < obj.length; i++) {
  ids.push(obj[i]['cca3'])
  var flag = obj[i]['flag']
  var name = obj[i]['name']['common']
  var capital = obj[i]['capital']
  var region = obj[i]['region']
  var latlng = obj[i]['latlng']
  var id = obj[i]['cca3']
  var tmp = {'flag': flag, 'name': name, 'capital': capital, 
        'region': region, 'latlng': latlng, 'id': id};
  data.push(tmp)
}

// app.get('/id', (req, res) => {
//   console.log(req.body.id);
//   var index = ids.indexOf(req.body.id)
//   if(index == -1){
//     console.log('error...')
//     res.send('error')
//   } else{
//     console.log(data[index])
//     res.send(data[index])
//   }
// });

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

app.get(['/', '/blog'], function(req, res) {
    res.sendFile(path.join(__dirname, './public/blog.html'));
})


http.listen(port, function(err) {
  if (err) {
      console.log(err);
  }
  console.log('listen on port ' + port);
});