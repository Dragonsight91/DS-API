# DS-API endpoint

This api gives an endpoint to the [RWTH DS Website](https://www2.math.rwth-aachen.de/DS19) because i got sick of logging in every time. It will be hosted on heroku.
- API URL: https://api-rwth-ds.herokuapp.com 

# Endpoints
```
======    ROOT  ENDPOINT   ======
GET /   This will later respond with a nice Frontend

======  RESULTS ENDPOINTS  ======
POST /results

====== EXERCISE  ENDPOINTS ======
GET  /exercise/:number
POST /exercise/:number

====== EXERCISES ENDPOINTS ======
GET  /exercises
POST /exercises
```


## Placeholders used
- **$user:** _your matriculation number_
- **$passwd:** _the password you use_
- **$name** _a placeholder for some value_
- **[name: $placeholder]** _optional parameter_


## Authentication request object
Any Endpoint that needs authentication will expect a request with `application/json` in the following.
```json
{
    "id": "$user",
    "passwd": "$password",
    ["year": "$DS-Year"]
}
```

____

## Results Endpoint
The Results endpoint expects a `POST` request with the previously mentioned Authentication Request Object and gives the following response:

```json 
{
    "results":{
        "exNum": "$exNum",
        "points":{
            "online": "$value",
            "written": "$value"
        }
    }[]
}
```

## Exercise Endpoint
The Exercise endpoint has two ways to request Documents. One needs authentication and gets the file directly from the DS website, the other gets files from the server's cache.

- ## POST /exercise/:exNum
    This requires user authentication and gets the file directly from the DS server and also caches the file before sending a response.
    
    This endpoint uses the Authentication Request Object, with another optional `format` property.
    The default Format, if `format` is not in the Request Object is `PDF`.

    ### Supported values for the `format` parameter
    - `HTML` gives the direct HTML file from the DS server as response
    - `MathJax` gives the direct HTML file with the MathJax 
    - `PDF` gives the Exercise as PDF, this doesn't need to be specified, because it's the default format.

    ### KNOWN ISSUE
    `HTML` and `MathJax` have not yet been corrected for their source, CSS and Scripts WILL NOT LOAD

- ## GET /exercise/:exNum
    No authentication needed, this endpoint will load scripts from cache EXCLUSIVELY.

    If the File is not already cached, it will respond with a `404 Status`.
    
## Exercises Endpoint
The Exercises endpoint gives an array of Links and filenames to the `GET /exercise/:exNum` endpoint.
This endpoint has both `POST` and `GET` method.

## Response
```json
{
    "filename": "$filename",
    "url": "$fileURL"
}[]
```

- ## POST /exercises
    This Endpoint Expect the Authentication Request Object, as specified above.

- ## GET /exercises
    no Authentication Needed