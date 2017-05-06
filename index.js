const req = require('request')
const validator = require('validator')
const possibleFormats = ['csv', 'gpc', 'html', 'json', 'ofx']

// Transactions for specific date range
exports.periodMovements = function(token, fromDate, toDate, format, cb) {

  let url = 'https://www.fio.cz/ib_api/rest/periods/'+token+'/'+fromDate+'/'+toDate+'/transactions.'+format
  if (possibleFormats.indexOf(format) === -1 ) {
    console.log('Invalid transaction format')
    throw new Error('Invalid transaction format')
  }

  if (!validator.isISO8601(fromDate) ||
      !validator.isISO8601(toDate)) {
    console.log('Invalid Date format');
    throw new Error('Invalid Date format')
  }

  req(url, function (err, res, body) {
    if (err)
      throw new Error('Broken')

    if (res.statusCode !== 200) {
      if (res.statusCode === 404)
        console.log('404 - something is missing')

      if (res.statusCode === 409)
        console.log('409 - delay requests, 1req per 30 secs')

      if (res.statusCode === 500)
        console.log('500 - Token problem')

      console.log('Error', res.statusCode)
      throw new Error(res.statusCode)
    }

    if (!err && res.statusCode === 200) {
      cb(JSON.parse(body));
    }
  })
}
