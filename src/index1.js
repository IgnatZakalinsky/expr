const express = require('express')

const app = express()
const port = 3010

app.get('/', (req, res) => {
    res.status(200).json({hello: 'nya'})
})

app.listen(port, () => {
    console.log('listen port: ' + port)
})