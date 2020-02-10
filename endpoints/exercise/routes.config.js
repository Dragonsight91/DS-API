const ExirciseController = require('./controllers/exercise.controller');

exports.routesConfig = function (app) {
    app.post('/exercise', [
        ExirciseController.get
    ]);
}