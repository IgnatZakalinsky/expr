import express, {Response, Request} from 'express'
import cors from 'cors'
import {addVideo, changeVideo, delVideo, getVideo, getVideos} from './video/video'
import bodyParser from 'body-parser'
import {addBlogger, changeBlogger, delBlogger, getBlogger, getBloggers} from './blogger/blogger'
import {addPost, changePost, delPost, getPost, getPosts} from './blogger/post'
import {globalCatch} from './common/errors'

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({hello: 'nya 1.1'})
})

app.get('/videos', getVideos)
app.post('/videos', addVideo)
app.get('/videos/:id', getVideo)
app.delete('/videos/:id', delVideo)
app.put('/videos/:id', changeVideo)

app.get('/bloggers', getBloggers)
app.post('/bloggers', addBlogger)
app.get('/bloggers/:id', getBlogger)
app.delete('/bloggers/:id', delBlogger)
app.put('/bloggers/:id', changeBlogger)

app.get('/posts', getPosts)
app.post('/posts', addPost)
app.get('/posts/:id', getPost)
app.delete('/posts/:id', delPost)
app.put('/posts/:id', changePost)

globalCatch()

app.listen(port, () => {
    console.log('listen port: ' + port)
})