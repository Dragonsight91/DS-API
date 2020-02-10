const ResultsController = require('./controllers/results.controller');

exports.routesConfig = (app) => {
    app.post('/results', [
        ResultsController.get
    ]);
}