import {Request, Response} from 'express'

export let videos = [
    {id: 1, title: 'x1', author: 'xx1'},
    {id: 2, title: 'x2', author: 'xx2'},
]

export const getVideos = (req: Request, res: Response) => {
    res.status(200).json(videos)
}
export const addVideo = (req: Request, res: Response) => {
    if (typeof req.body.title !== 'string') {
        res.status(400).json({errorsMessages: [{message: 'not string', field: "title"}], resultCode: 1})
        return
    } else if (req.body.title.length > 40) {
        res.status(400).json({errorsMessages: [{message: 'too long title', field: "title"}], resultCode: 1})
        return
    }

    const newVideo = {
        id: Date.now(),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.status(201).json(newVideo)
}
export const getVideo = (req: Request, res: Response) => {
    const x = videos.find(v => v.id === +req.params.id)
    if (x) {
        res.status(200).json(x)
    } else {
        res.status(404).json({})
    }
}
export const delVideo = (req: Request, res: Response) => {
    const x = videos.find(v => v.id === +req.params.id)
    if (x) {
        videos = videos.filter(v => v.id !== +req.params.id)
        res.status(204).json({})
    } else {
        res.status(404).json({})
    }
}
export const changeVideo = (req: Request, res: Response) => {
    if (typeof req.body.title !== 'string') {
        res.status(400).json({errorsMessages: [{message: 'not string', field: "title"}], resultCode: 1})
        return
    } else if (req.body.title.length > 40) {
        res.status(400).json({errorsMessages: [{message: 'too long title', field: "title"}], resultCode: 1})
        return
    } else {
        const x = videos.find(v => v.id === +req.params.id)
        if (x) {
            videos = videos.map(v => v.id === +req.params.id ? {...v, title: req.body.title} : v)
            res.status(204).json({})
        } else {
            res.status(404).json({})
        }
    }
}
