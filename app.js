/** Add variables to require the necessary dependencies. **/
const express = require('express');
const data = require('./data.json');
/** const app to call throughout the app file **/
const app = express();
/** express.static method to serve the static files located in the public folder **/
app.use('/static', express.static('public'));
/** express.static method to serve the static files located in the images folder **/
app.use('/images', express.static('images'));
/** set your “view engine” to “pug” **/
app.set('view engine', 'pug');
/** Route to index page **/
app.get('/', (req, res) => {
  res.render('index', { data });
});
/** Route to about page **/
app.get('/about', (req, res) => {
  res.render('about', { data });
});
/** Routes to project with data and id **/
app.get('/projects:id', (req, res) => {
  res.render('project', {
    data : data,
    id : req.params.id
  });
});
/** Handling 404 Errors Middleware Functions**/
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status)
  res.render('error');
})
 /** listen on port 3000,log a string to the console that says which port the app is listening to.**/
app.listen(3000, () => {
  console.log("app is listening to localhost:3000")
});
