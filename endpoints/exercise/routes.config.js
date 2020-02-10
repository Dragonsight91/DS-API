const ExerciseController = require('./controllers/exercise.controller');
exports.routesConfig = function (app) {
    app.post('/exercise', [
        ExerciseController.get
    ]);
    app.post('/exercise/all', [
        ExerciseController.bulk
    ]);
}