const express = require('express')
const app = express()
const port = 8080

app.get('/first-chain-1', (req, res) => {
    console.log('running /first-chain-1')
    res.redirect('/first-chain-2');
})

app.get('/first-chain-2', (req, res) => {
    console.log('running /first-chain-2')
    res.redirect('/first-chain-3?=hash1234');
})

app.get('/first-chain-3', (req, res) => {
    console.log('running /first-chain-3')
    res.send('<div>Hello</div>');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})