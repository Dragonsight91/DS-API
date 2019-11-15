# DS-API endpoint

This api gives an endpoint to the [RWTH DS Website](https://www2.math.rwth-aachen.de/DS19) because i got sick of logging in every time. It will be hosted on heroku.

**ALL requests must be made using method POST**

# Endpoints
> **Request Type:** application/json<br>**Request method:** POST 
- **/results**
- **/exircise**

## Placeholders used

- **$user:** _your matriculation number_
- **$passwd:** _the password you use_
- **$DS-Year:** _year in YY format (19 for me because WS-2019)_
- **$exNum:**  _the number of the exircise you want to request_
- **$exDoc:** _the requested document_
- **$exFormat** _the file format to get (html, pdf, MathJax) defaults to html_
- **[name: $placeholder]** _optional parameter_

## results request object
The results request object just holds user credentials, as they are needed to authenticate against the website to fetch the data. $DS-Year is me hoping that the url itself will only change during winter semesters and keeps the "/DS[YY]/" scheme. 
```json
{
    "id": "$user",
    "passwd": "$password",
    "year": "$DS-Year"
}
```
## results response object
The results object is a JSON object with property "results", which is an array of exircise result objects like this: 
```json
    {
        "results": [
            {
                "exNum": "$exNum",
                "points":{
                    "online": "$value",
                    "written": "$value"
                }
            },
        ],
    }
```

## exircise request object
The exircise request object is essentially the same as the results request object, with the only difference being the "exNum" parameter, specifying the exircise you wish to request and the optional "format" parameter, which can be mathjax or html and defaults to html.
```
{
    id: $user,
    passwd: $password,
    year: $DS-Year,
    exNum: $exNum,
    [format: $exFormat] 

}

```

## /exircise Response
The exircise endpoint gives an HTML document back, which can be read and parsed by the browser.
Tip: The exircise itself is inside a form in the document

```javascript
    {
        "results": "$ExDoc"
    }
```

