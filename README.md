# DS-API endpoint

This api gives an endpoint to the [RWTH DS Website](https://www2.math.rwth-aachen.de/DS19) because i got sick of logging in every time. It will be hosted on heroku.

## Get Data
**$user:** your matriculation number

**$passwd:** the password you use

**$DS-Year:** year in YY format (19 for me because WS-2019/2020)

## Endpoints
- **/results**

## Request body
```
type: application/json
method: POST
{
    id: $user
    passwd: $password
    year: $DS-Year
}

```
## /results Response 
```
response:
    type: application/json
    body:
    {
        results: []
    }
```

