var qs = require('qs');
const fs = require('fs');
const Path = require('path')
var axios = require('axios');
const jsdom = require("jsdom");
const jsStringEscape = require('js-string-escape');

exports.cache = async (req, res) => {
    // get current Semester in YY format, assuming that DS is WS only
    const currDate = new Date();
    const currYear = (currDate.getMonth() >= 8) ? currDate.getFullYear().toString().substring(-2) : (currDate.getFullYear() - 1).toString().substring(2, 5);

    // decontruct the request body
    const max = await getCurrEx(currYear); 
    
    // array for document links
    let linkArr = [];

    for (let i = 1; i <= max; i++) {
        // set up file handling & response stuff
        const filename = `Ex-${jsStringEscape(i)}.pdf`;
        const path = Path.resolve("cache", filename);
        const fileURL = `https://api-rwth-ds.herokuapp.com/exercise/${i}`

        // does it exist? if not, download it to cache
        if (fs.existsSync(path)) {
            // push the link to our response array
            linkArr.push({
                filename: filename,
                url: fileURL
            });
        }
    }
    
    res.send(linkArr);
}



exports.server = async (req, res) => {
    // get current Semester in YY format, assuming that DS is WS only
    const currDate = new Date();
    const currYear = (currDate.getMonth() >= 8) ? currDate.getFullYear().toString().substring(-2) : (currDate.getFullYear() - 1).toString().substring(2, 5);

    // decontruct the request body
    const { id, passwd, format = "PDF", year = currYear } = req.body;
    const max = await getCurrEx(currYear);
    // url, request object & build params because request is type x-www-form-urlencoded, not application/json
    const obj = {
        id: id,
        passwd: passwd,
        sheet: 1,
        format: format // optional format parameter
    };

    // array for document links
    let linkArr = [];

    // set up parameters and url 
    const params = qs.stringify(obj);
    const url = `https://www2.math.rwth-aachen.de/DS${jsStringEscape(year)}/QuerySheet`;
    for (let i = 1; i <= max; i++) {
        // set up file handling & response stuff
        const filename = `Ex-${jsStringEscape(i)}.pdf`;
        const path = Path.resolve("cache", filename);
        const fileURL = `https://api-rwth-ds.herokuapp.com/exercise/${i}`

        // does it exist? if not, download it to cache
        fs.access(path, fs.F_OK, (err) => {

            // doesn't exist
            if (err) {
                obj.sheet = i;
                axios({
                    url: url,
                    data: params,
                    method: "POST",
                    responseType: 'stream'
                }).then(
                    (response) => {
                        // create a file and send it on close
                        fs.writeFile(path, { flag: 'a+' }, (err) => {
                            const writer = fs.createWriteStream(path);
                            response.data.pipe(writer);
                        });
                    }
                );
            }


        });
        // push the link to our response array
        linkArr.push({
            filename: filename,
            url: fileURL
        });
    }

    // send the link array
    res.send(linkArr);
}

const getCurrEx = async (year) => {
    const url = `https://www2.math.rwth-aachen.de/DS${jsStringEscape(year)}/exquery.html`;
    const response = await axios.get(url);

    const doc = new jsdom.JSDOM(response.data);
    const element = doc.window.document.getElementsByTagName("form")[0].lastElementChild.lastElementChild;
    value = element.value;

    return Number(value);
}