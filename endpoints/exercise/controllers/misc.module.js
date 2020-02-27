const fs = require('fs');
const jsdom = require("jsdom");
const axios = require('axios');
const jsStringEscape = require('js-string-escape');

exports.getCurrEx = async (year) => {
    const url = `https://www2.math.rwth-aachen.de/DS${jsStringEscape(year)}/exquery.html`;
    const response = await axios.get(url);

    const doc = new jsdom.JSDOM(response.data);
    const element = doc.window.document.getElementsByTagName("form")[0].lastElementChild.lastElementChild;
    return Number(element.value);
}

exports.sendFile = (path, num, res) => {
    // read the file
    const stat = fs.statSync(path);
    reader = fs.createReadStream(path);

    // set header
    resHeader = {
        "Content-Length": stat.size,
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=" + `Ex-${jsStringEscape(num)}.pdf`
    };
    res.writeHead(200, resHeader);

    // send file
    reader.pipe(res);
};