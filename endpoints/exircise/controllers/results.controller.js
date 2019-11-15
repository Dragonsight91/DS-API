var qs = require('qs');
var axios = require('axios');
const jsdom = require("jsdom");
const jsStringEscape = require('js-string-escape');


exports.get = (req, res) => {

    // url, request object & build params because request is type x-www-form-urlencoded, not application/json
    const obj = {
        id: req.body.id,
        passwd: req.body.passwd,
        sheet: req.body.exNum,
        format: (req.body.format === null) ? req.body.format : "HTML"
    }
    const params = qs.stringify(obj);
    const url = `https://www2.math.rwth-aachen.de/DS${jsStringEscape(req.body.year)}/QuerySheet`;

    axios.post(url, params).then(
        (response) => {
            res.send(
                getResults(response.data)
            );
        }
    );
};

// so you got html data, now you need a nice object you can send
getResults = (htmlData) => {
    const arr = [];
    const dom = new jsdom.JSDOM(htmlData);

    // get results table
    const table = dom.window.document.getElementsByTagName("table")[0].getElementsByTagName("tr");

    const pointPatt = /^(?<pts>\d{1,2})/;
    Array.from(table).forEach(
        (row) => {
            // get columns fro row
            const columns = row.getElementsByTagName("td");

            // ignore header rows and empty rows
            if (columns.length > 0) {

                // save values
                const onlineVal = columns[1].innerHTML.match(pointPatt);
                const offlineVal = columns[2].innerHTML.match(pointPatt);

                // create object
                const obj = {

                    // exircise number
                    exNum: columns[0].innerHTML,

                    // points object
                    points: {
                        // did regex get points? if "?" or "---", set points to 0
                        online: (onlineVal !== null) ? onlineVal.groups.pts : 0,
                        written: (offlineVal !== null) ? offlineVal.groups.pts : 0
                    }
                }
                arr.push(obj);
            }
        }
    );
    return arr;
}