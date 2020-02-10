const ExerciseController = require('./controllers/exercise.controller');
exports.routesConfig = function (app) {
    app.post('/exercise', [
        ExerciseController.single
    ]);
    app.post('/exercise/all', [
        ExerciseController.bulk
    ]);
}
//*/