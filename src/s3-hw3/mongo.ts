import {MongoClient} from 'mongodb'
import {destruct} from '../s1-common/errors'
import {BloggerType} from './f0-types/blogger'
import {PostType} from './f0-types/post'
import {UserType} from '../s4-hw4/f0-types/user'
import {CommentType} from '../s4-hw4/f0-types/comment'
import {SETTINGS} from './f2-posts/config'

export const client = new MongoClient(SETTINGS.MONGO_DB_URIS)

export const runDB = async () => {
    try {
        await client.connect()
        console.log('success connect db!')
        return true
    } catch (e) {
        console.log('db error: ', destruct(e))
        return false
    }
}

export const Blogger = client.db('expr').collection<BloggerType>('blogger')
export const Post = client.db('expr').collection<PostType>('post')
export const User = client.db('expr').collection<UserType>('user')
export const Comment = client.db('expr').collection<CommentType>('comment')