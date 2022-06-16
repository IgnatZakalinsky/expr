import {Router} from 'express'
import {addVideo, changeVideo, delVideo, getVideo, getVideos} from './video'

export const videoRouter = Router()

videoRouter.get('/', getVideos)
videoRouter.post('/', addVideo)
videoRouter.get('/:id', getVideo)
videoRouter.delete('/:id', delVideo)
videoRouter.put('/:id', changeVideo)