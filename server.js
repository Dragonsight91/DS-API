const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./common/config/env.config');

// import routes
const ResultsRouter = require('./endpoints/results/routes.config');
const ExirciseRouter = require('./endpoints/exircise/routes.config');

// configure the server
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST'); // ONLY ALLOW POST
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
ExirciseRouter.routesConfig(app);

// create the server on default port (or the one specified in the config)
app.listen(process.env.PORT || config.port , function () {
    console.log('app listening at port %s', config.port);
});