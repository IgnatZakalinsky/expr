import {MongoClient} from 'mongodb'
import {destruct} from '../s1-common/errors'
import {BloggerType} from './f0-types/blogger'
import {PostType} from './f0-types/post'
import {UserType} from '../s4-hw4/f0-types/user'
import {CommentType} from "../s4-hw4/f0-types/comment";

export const MONGO_DB_URIS = 'mongodb+srv://ai73aaa:1qazxcvBG@neko0-iwojt.mongodb.net/nekobd?retryWrites=true&w=majority'

export const client = new MongoClient(MONGO_DB_URIS)

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