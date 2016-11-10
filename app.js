var express = require('express')
var app = express()

var bodyParser = require('body-parser')

app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
var port = process.env.PORT || 3000

app.get('/', function(req, res) {
  res.sendfile("index.html")
	}
)

app.get('/genetic', function(req, res) {
  res.sendfile('public/genetic.html' , { root : __dirname})
	}
)

app.listen(port, function() {
	console.log("Listening on port " + port )
})

	