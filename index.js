const req = require('request')
const validator = require('validator')
const possibleFormats = ['csv', 'gpc', 'html', 'json', 'ofx']

// Transactions for specific date range
exports.periodMovements = function(token, fromDate, toDate, format, cb) {

  if (possibleFormats.indexOf(format) === -1 ) {
    console.log('Invalid transaction format')
    throw new Error('Invalid transaction format')
  }

  if (!validator.isISO8601(fromDate) ||
      !validator.isISO8601(toDate)) {
    console.log('Invalid Date format');
    throw new Error('Invalid Date format')
  }

  let url = 'https://www.fio.cz/ib_api/rest/periods/'+token+'/'+fromDate+'/'+toDate+'/transactions.'+format

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

// Transactions for specific day with fields
// ID, Date, Amount, Currency, Variable Symbol, Information for Beneficiary, Sender
// json only
exports.dailyFilterMovements = function(token, dayDate, cb) {
  let format = 'json'

  if (!validator.isISO8601(dayDate)) {
    console.log('Invalid Date format');
    throw new Error('Invalid Date format')
  }

  let url = 'https://www.fio.cz/ib_api/rest/periods/'+token+'/'+dayDate+'/'+dayDate+'/transactions.'+format
  // url = 'http://localhost:6080/march2017.json'

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
      let dTx = JSON.parse(body)
      let txAll = []
      Object.entries(dTx.accountStatement.transactionList.transaction)
      .forEach(([key, movement]) => {
        let tx = { id: movement.column22.value,
                   date: movement.column0.value,
                   amount: movement.column1.value,
                   currency: movement.column14.value
                 }
        if (movement.column5)
         tx.vs = movement.column5.value

        if (movement.column16)
         tx.note = movement.column16.value

        if (movement.column10)
         tx.sender = movement.column10.value

        if (movement.column2)
         tx.senderAccount = movement.column2.value

        txAll.push(tx)
      })

      let normalizeDTx = {
        info: dTx.accountStatement.info,
        tx: txAll
      }

      cb(normalizeDTx);
    }
  })
}

// Transactions for specific date range with fields
// ID, Date, Amount, Currency, Variable Symbol, Information for Beneficiary, Sender
// json only
exports.periodFilterMovements = function(token, fromDate, toDate, cb) {
  let format = 'json'

  if (!validator.isISO8601(fromDate) ||
      !validator.isISO8601(toDate)) {
    console.log('Invalid Date format');
    throw new Error('Invalid Date format')
  }

  let url = 'https://www.fio.cz/ib_api/rest/periods/'+token+'/'+fromDate+'/'+toDate+'/transactions.'+format
  // url = 'http://localhost:6080/march2017.json'

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
      let dTx = JSON.parse(body)
      let txAll = []
      Object.entries(dTx.accountStatement.transactionList.transaction)
      .forEach(([key, movement]) => {
        let tx = { id: movement.column22.value,
                   date: movement.column0.value,
                   amount: movement.column1.value,
                   currency: movement.column14.value
                 }
        if (movement.column5)
          tx.vs = movement.column5.value

        if (movement.column16)
          tx.note = movement.column16.value

        if (movement.column10)
          tx.sender = movement.column10.value

        if (movement.column2)
          tx.senderAccount = movement.column2.value

        txAll.push(tx)
      })

      let normalizeDTx = {
        info: dTx.accountStatement.info,
        tx: txAll
      }

      cb(normalizeDTx);
    }
  })
}
