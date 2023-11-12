const express = require('express');
const path = require('path')
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('pug', require('pug').__express)
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug');
app.use(express.static('public'))
app.use(cookieParser());


app.get('/', (req, res) => {
  res.cookie('role', 'user')
  //console.log(req.cookies)

  res.render('index');
});

app.post('/xss', (req, res) => {
  if(req.body) {
    var input = req.body.scriptingText
    var check = req.body.enableScripting
    //console.log("input: " + input + ", check: " + check)
  }
  res.render('index', {input, check});
});

app.get('/admin', (req, res) => {
  //console.log(req.cookies)
  if (req.cookies.role === "user") {
    res.render('error');
  } else if (req.cookies.role === "admin") {
    res.render('admin');
  }
})

if (externalUrl) {
  const hostname = '0.0.0.0'; //ne 127.0.0.1
  app.listen(port, hostname, () => {
    console.log(`Server locally running at http://${hostname}:${port}/ and from outside on ${externalUrl}`);
  });
} else {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}