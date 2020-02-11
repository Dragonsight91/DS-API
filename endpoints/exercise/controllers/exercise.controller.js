var qs = require('qs');
const fs = require('fs');
const Path = require('path')
var axios = require('axios');
const jsStringEscape = require('js-string-escape');


exports.single = (req, res) => {
    // set up file handling
    const path = Path.resolve(__dirname, "cache", `Ex-${jsStringEscape(req.body.exNum)}.pdf`);

    // url, request object & build params because request is type x-www-form-urlencoded, not application/json
    const obj = {
        id: req.body.id,
        passwd: req.body.passwd,
        sheet: req.body.exNum,
        format: (req.body.format !== null) ? req.body.format : "HTML" // optional format parameter
    };

    // set up parameters and url 
    const params = qs.stringify(obj);
    const url = `https://www2.math.rwth-aachen.de/DS${jsStringEscape(req.body.year)}/QuerySheet`;

    // send request and then send a response to the user based on the data we get
    // response is type application/pdf
    fs.access(path, fs.F_OK, (err) => {
        if (err) {
            axios({
                url: url,
                data: params,
                method: "POST",
                responseType: 'stream'
            })
                .then(
                    (response) => {
                        fs.writeFile(path, { flag: 'a+' }, (err) => {
                            const writer = fs.createWriteStream(path);
                            writer.on('close', () => {
                                sendFile(path, req.body.exNum, res);
                            });
                            response.data.pipe(writer);
                        });
                    }
                );
        }else{
            sendFile(path, req.body.exNum, res);
        }
    })
};

const sendFile = (path, num, res) => {
    const stat = fs.statSync(path);
    reader = fs.createReadStream(path);


    resHeader = {
        "Content-Length": stat.size,
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=" + `Ex-${jsStringEscape(num)}.pdf`
    };
    res.writeHead(200, resHeader);
    console.log(resHeader)
    reader.pipe(res);
}



exports.bulk = (req, res) => {

}