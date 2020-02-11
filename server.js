const express = require('express');
const bodyParser = require('body-parser');
const config = require('./common/config/env.config');

// import routes
const ResultsRouter = require('./endpoints/results/routes.config');
const ExerciseRouter = require('./endpoints/exercise/routes.config');

// configure the server
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');

    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

// set up the routes
app.use(bodyParser.json());
ResultsRouter.routesConfig(app);
ExerciseRouter.routesConfig(app);

// create the server on default port (or the one specified in the config)
app.listen(process.env.PORT || config.port , function () {
    console.log('app listening at port %s', config.port);
});