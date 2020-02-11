var qs = require('qs');
const fs = require('fs');
const Path = require('path')
var axios = require('axios');
const jsStringEscape = require('js-string-escape');

// POST 
exports.server = (req, res) => {
    const currDate = new Date();
    const currYear = (currDate.getMonth()+1 >= 6) ? currDate.getFullYear().toString().substring(-2) : (currDate.getFullYear()-1).toString().substring(2,5)
    const { exNum } = req.params;
    const { id, passwd, format="PDF", year=currYear} = req.body;
    // set up file handling
    const path = Path.resolve(__dirname, "cache", `Ex-${jsStringEscape(exNum)}.pdf`);

    // url, request object & build params because request is type x-www-form-urlencoded, not application/json
    const obj = {
        id: id,
        passwd: passwd,
        sheet: exNum,
        format: format // optional format parameter
    };

    // set up parameters and url 
    const params = qs.stringify(obj);
    const url = `https://www2.math.rwth-aachen.de/DS${jsStringEscape(year)}/QuerySheet`;

    // send request and then send a response to the user based on the data we get
    // response is type application/pdf
    if (req.body.format === "PDF") {
        fs.access(path, fs.F_OK, (err) => {
            if (err) {

                // the file isn't cached, request it from DS website
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
                            writer.on('close', () => {
                                sendFile(path, req.body.exNum, res);
                            });
                            response.data.pipe(writer);
                        });
                    }
                );
            } else {
                sendFile(path, req.body.exNum, res);
            }
        })
    } else {
        axios
            .post(url, params)
            .then(
                (response) => {
                    res.send(response.data);
                })
    }

};

exports.cache = (req, res) => {
    const { exNum } = req.params;
    const { format } = req.query;
    // set up file handling
    const path = Path.resolve(__dirname, "cache", `Ex-${jsStringEscape(exNum)}.pdf`);

    fs.access(path, fs.F_OK, (err) => {
        if(err){
            res.sendStatus(404);
        }else{
            sendFile(path, exNum, res);
        }
    });

}


const sendFile = (path, num, res) => {
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



