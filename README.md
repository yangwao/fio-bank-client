# fio-bank-client

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> fio bank client api parser module in javascript

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Background

[Fio](https://www.fio.sk/) is great bank with great API support, but they miss official package at NPM, so let's try to do one!

Here is [FIO API DOC 1.6.2](https://www.fio.cz/docs/cz/API_Bankovnictvi.pdf)

Supported formats are csv, gpc, html, json, ofx.

## Install

```
npm i fio-bank-client
```

## Usage

```
const fioClient = require('fio-bank-client')

let token = 'AaROqGTyy6pZck...' // access Token generate in API section of account settings
let fromDate = '2017-03-01'
let toDate = '2017-03-31'
let dayDate = '2017-04-08'
let format = 'json' // can be CSV, GPC, HTML, JSON, OFX

fioClient.periodMovements(token,fromDate,toDate,format, function(res) {
  console.log(res)
})

fioClient.dailyFilterMovements(token, dayDate, function(res) {
   console.log(res)
})

fioClient.periodFilterMovements(token, fromDate, toDate, function(res) {
  console.log(res)
})

```


##### Structure

Print first movement in range
`t.accountStatement.transactionList.transaction[0]`

Movement ID
`t.accountStatement.transactionList.transaction[0].column22.value` => `13904701394`

Movement Date
`t.accountStatement.transactionList.transaction[0].column0.value` => `2017-03-01+0100`

Movement Amount
`t.accountStatement.transactionList.transaction[0].column1.value` => `20`

Movement Currency
`t.accountStatement.transactionList.transaction[0].column14.value` => `EUR`

Movement Variable Symbol
`t.accountStatement.transactionList.transaction[0].column5.value` => `12035`

Movement Information for Beneficiary
`t.accountStatement.transactionList.transaction[3].column16.value` => `string`

Movement Sender
``t.accountStatement.transactionList.transaction[0].column10.value` => `string`

Movement Sender IBAN
`t.accountStatement.transactionList.transaction[0].column2.value` => `string`

## API

## Maintainers
- [@yangwao](https://github.com/yangwao)

## Contribute

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © Matej Nemcek
