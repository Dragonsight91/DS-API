const ExirciseController = require('./controllers/exircise.controller');

exports.routesConfig = function (app) {
    app.post('/exircise', [
        ExirciseController.get
    ]);
}