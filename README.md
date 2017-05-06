# fio-bank-client
fio bank client api parser module

Formats ['csv', 'gpc', 'html', 'json', 'ofx']

```
const fioClient = require('./index.js')

let token = 'ROqGTyy6pZckADck' // access Token generate in API section of account settings
let fromDate = '2017-03-01'
let toDate = '2017-03-31'
let format = 'json' // can be CSV, GPC, HTML, JSON, OFX

fioClient.periodMovements(token,fromDate,toDate,format, function(res) {
  console.log(res);
})
```

### todo
- [x] validate date && formats
- [ ] handle error codes

PR is welcome

[API DOC 1.6.2](https://www.fio.cz/docs/cz/API_Bankovnictvi.pdf)
