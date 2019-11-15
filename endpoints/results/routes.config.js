const ResultsController = require('./controllers/results.controller');

exports.routesConfig = function (app) {
    app.post('/results', [
        ResultsController.get
    ]);
}