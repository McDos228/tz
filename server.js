var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = 3000;
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var contents = fs.readFileSync('store/db.json');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

var data = JSON.parse(contents);

app.get('/users', function(req, res){
  res.json({data: data});
});

app.get('/users/:id', function(req, res){
  var id = req.params.id;
  data.users.forEach(function(user){
    if(user.id==id){
      res.json({data:user});
    }
  })
});

app.get('/users/dalete/:id', function(req, res){
  var id = req.params.id;
  var result = data.users.filter(function(x){return x.id!=id; });
  data.users = result;
  res.json({data:result});
});

app.post('/users/add', function(req, res){
  var list = data;
  var id = list.users[list.users.length-1].id + 1;
  list.users.push({
    id: id,
    username: req.body.username,
    age: req.body.age,
    number: req.body.number
  });

  fs.writeFile('store/db.json', JSON.stringify(list), function(err){
    console.log(err);
    if(!err){
      res.json({data:list.users[list.users.length-1]});
    }
  });

});

app.post('/users/update', function(req, res){
  data.users.forEach(function(user){
    if(user.id==req.body.id){
      user.username = req.body.username;
      user.age = req.body.age;
      user.number = req.body.number;
      res.json({data:user});
    }
  })


});

http.listen(port, function(){
	console.log('server start ' + port);
})
