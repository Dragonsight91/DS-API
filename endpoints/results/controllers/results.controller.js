var qs = require('qs');
var axios = require('axios');
const jsdom = require("jsdom");


exports.get = (req, res) => {


    obj = {
        id: req.body.id,
        passwd: req.body.passwd
    }
    console.log(obj);
    params = qs.stringify(obj);
    console.log(params);

    axios.post('https://www2.math.rwth-aachen.de/DS19/QueryResults', params).then(
        (response) => {
            res.send(
                getResults(response.data)
            );
        }
    );
};
getResults = (htmlData) => {
    const arr = [];
    const dom = new jsdom.JSDOM(htmlData);

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