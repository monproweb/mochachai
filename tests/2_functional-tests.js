const chai = require("chai");
const assert = chai.assert;

const server = require("../server");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("Integration tests with chai-http", function () {
test('Test GET /hello with no name', function(done) {
  // Don't forget the callback...
  chai
    .request(server) // 'server' is the Express App
    .get('/hello') // http_method(url). NO NAME in the query !
    .end(function(err, res) {
      // res is the response object

      // Test the status and the text response (see the example above).
      // Please follow the order -status, -text. We rely on that in our tests.
      // It should respond 'Hello Guest'
      assert.equal(res.status, 200);
      assert.equal(res.text, 'hello Guest');
      done(); // Always call the 'done()' callback when finished.
    });
});

test('Test GET /hello with your name', function(done) {
  // Don't forget the callback...
  chai
    .request(server) // 'server' is the Express App
    .get('/hello?name=Thomas') /** <=== Put your name in the query **/
    .end(function(err, res) {
      // res is the response object

      // Your tests here.
      // Replace assert.fail(). Make the test pass.
      // Test the status and the text response. Follow the test order like above.
      assert.equal(res.status, 200);
      assert.equal(res.text, 'hello Thomas' /** <==  Put your name here **/);
      done(); // Always call the 'done()' callback when finished.
    });
});
    // #3
test('send {surname: "Colombo"}', function(done) {
  // we setup the request for you...
  chai
    .request(server)
    .put('/travellers')
    /** send {surname: 'Colombo'} here **/
    .send({ surname: 'Colombo' })
    // .send({...})
    .end(function(err, res) {
      /** your tests here **/
      assert.equal(res.status, 200, 'response status should be 200');
      assert.equal(res.type, 'application/json', 'Response should be json');
      assert.equal(
        res.body.name,
        'Cristoforo',
        'res.body.name should be "Christoforo"'
      );
      assert.equal(
        res.body.surname,
        'Colombo',
        'res.body.surname should be "Colombo"'
      );

      done(); // Never forget the 'done()' callback...
    });
});
    // #4
test('send {surname: "da Verrazzano"}', function(done) {
  /** place the chai-http request code here... **/
  chai
    .request(server)
    .put('/travellers')
    .send({ surname: 'da Verrazzano' })
    /** place your tests inside the callback **/
    .end(function(err, res) {
      assert.equal(res.status, 200, 'response status should be 200');
      assert.equal(res.type, 'application/json', 'Response should be json');
      assert.equal(res.body.name, 'Giovanni');
      assert.equal(res.body.surname, 'da Verrazzano');

      done();
    });
});
  });
});

const Browser = require("zombie");

Browser.site = 'https://boilerplate-mochachai.thomaserhel.repl.co'; 

suite("Functional Tests with Zombie.js", function () {
  const browser = new Browser();

suiteSetup(function(done) {
  return browser.visit('/', done);
});

  suite('"Famous Italian Explorers" form', function () {
test('submit "surname" : "Colombo" - write your e2e test...', function(done) {
  // fill the form...
  // then submit it pressing 'submit' button.
  //
  // in the callback...
  // assert that status is OK 200
  // assert that the text inside the element 'span#name' is 'Cristoforo'
  // assert that the text inside the element 'span#surname' is 'Colombo'
  // assert that the element(s) 'span#dates' exist and their count is 1
  browser.fill('surname', 'Colombo').pressButton('submit', function() {
    /** YOUR TESTS HERE, Don't forget to remove assert.fail() **/

    // pressButton is Async.  Waits for the ajax call to complete...

    // assert that status is OK 200
    browser.assert.success();
    // assert that the text inside the element 'span#name' is 'Cristoforo'
    browser.assert.text('span#name', 'Cristoforo');
    // assert that the text inside the element 'span#surname' is 'Colombo'
    browser.assert.text('span#surname', 'Colombo');
    // assert that the element(s) 'span#dates' exist and their count is 1
    browser.assert.element('span#dates', 1);

    done(); // It's an async test, so we have to call 'done()''
  });
});

test('submit "surname" : "Vespucci" - write your e2e test...', function(done) {
  // fill the form, and submit.
  browser.fill('surname', 'Vespucci').pressButton('submit', function() {
    // assert that status is OK 200
    browser.assert.success();
    // assert that the text inside the element 'span#name' is 'Amerigo'
    browser.assert.text('span#name', 'Amerigo');
    // assert that the text inside the element 'span#surname' is 'Vespucci'
    browser.assert.text('span#surname', 'Vespucci');
    // assert that the element(s) 'span#dates' exist and their count is 1
    browser.assert.element('span#dates', 1);

    done();
  });
});
  });
});
