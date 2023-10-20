const express = require('express')
const bodyParser = require('body-parser')
const books = require('./db')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/books', (req, res) => {
  res.json(books)
})

app.get('/books/:id', (req, res) => {
  res.json(books.find(book => book.id === req.params.id))
})

app.post('/books', (req, res) => {
  books.push(req.body)
  res.status(201).json(req.body)
})

app.put('/books/:id', (req, res) => {
  const updateIndex = books.findIndex(book => book.id === req.params.id)
  res.json(Object.assign(books[updateIndex], req.body))
})

app.delete('/books/:id', (req, res) => {
  const deleteIndex = books.findIndex(book => book.id === req.params.id)
  books.splice(deleteIndex, 1)
  res.status(204).send()
})

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})

pm.test("environment to be Book", function () {
  pm.expect(pm.environment.get("baseUrl")).to.equal("http://localhost:3000");
});

pm.test("Status test", function () {
  pm.response.to.have.status(200);
});

app.get('/books/:id', (req, res) => {
  res.json(books.find(book => book.id === req.params.id))
})

pm.test("Status test is 200 (OK)", function () {
  pm.response.to.have.status(200);
});
pm.test("Status code is 404 (Not found)", function () {
 pm.response.to.have.status(404);
});
pm.test("The book name", function () {
 var jsonData = pm.response.json();
 pm.expect(jsonData.name).to.eql("Game of thrones");
});

app.post('/books', (req, res) => {
  books.push(req.body)
  res.status(201).json(req.body)
});


pm.test("Status code is 200 (OK)", function () {
  pm.response.to.have.status(200);
});
pm.test("Status code is 201 (Create)", function () {
  pm.response.to.have.status(201);
});
pm.test("New pet response check", function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.id).to.eql("3");
  pm.expect(jsonData.name).to.eql("crazy horse");
});

app.put('/books/:id', (req, res) => {
  const updateIndex = books.findIndex(book => book.id === req.params.id)
  res.json(Object.assign(books[updateIndex], req.body))
});

pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});
pm.test("Book update check", function () {
  var jsonData = pm.response.json();
  pm.expect(jsonData.id).to.eql("2");
  pm.expect(jsonData.name).to.eql("LISA");
});

app.delete('/books/:id', (req, res) => {
  const deletedIndex = books.findIndex(book => book.id === req.params.id)
 //  books.splice(deletedIndex, 1)
  delete books[deleteIndex];
  res.status(200).json(req.body)
});

pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});
pm.sendRequest(pm.variables.get("baseUrl")+"/pet/" + pm.variables.get("petId"), function (err, response) {
  pm.test('Get pet data after deletion', function() {
      pm.expect(response.code).to.eql(404)
  });
});
