const ExerciseController = require('./controllers/exercise.controller');
exports.routesConfig = (app) => {
    app.post('/exercise', [
        ExerciseController.single
    ]);

    app.post('/exercise/all', [
        ExerciseController.bulk
    ]);
}
//*/