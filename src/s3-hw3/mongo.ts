import {MongoClient} from 'mongodb'
import {destruct} from '../s1-common/errors'
import {BloggerType} from './f0-types/blogger'

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