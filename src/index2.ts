import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {globalCatch} from './s1-common/errors'
import {runDB} from './s3-hw3/mongo'
import {hw3} from './s3-hw3/hw3'

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({hello: 'nya 1.1'})
})

hw3(app)

globalCatch()

runDB().then(isDB => {
    if (!isDB) {
        return
    }
    app.listen(port, () => {
        console.log('listen port: ' + port)
    })
})