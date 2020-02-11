const ExerciseController = require('./controllers/exercise.controller');
const ExercisesController = require('./controllers/exercises.controller');

exports.routesConfig = (app) => {
    // Single Endpoints
    app.post('/exercise/:exNum', [
        ExerciseController.server
    ]);
    app.get('/exercise/:exNum', [
        ExerciseController.cache
    ])

    // bulk endpoints
    app.post('/exercises', [
        ExercisesController.server
    ]);
    app.get('/exercises', [
        ExercisesController.cache
    ])
}
//*/