var qs = require('qs');
var axios = require('axios');
const jsStringEscape = require('js-string-escape');


exports.single = (req, res) => {

    // url, request object & build params because request is type x-www-form-urlencoded, not application/json
    const obj = {
        id: req.body.id,
        passwd: req.body.passwd,
        sheet: req.body.exNum,
        format: (req.body.format === null) ? req.body.format : "HTML" // optional format parameter
    }
    const params = qs.stringify(obj);
    const url = `https://www2.math.rwth-aachen.de/DS${jsStringEscape(req.body.year)}/QuerySheet`;

    // send request and then send a response to the user based on the data we get
    axios.post(url, params)
    .then(
        (response) => {
            res.send(
                response.data
            );
        }
    );
};

exports.bulk = (req, res) => {

}