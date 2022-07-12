import {Comment} from '../../../s3-hw3/mongo'
import {ObjectId} from 'mongodb'
import {CommentType} from '../../f0-types/comment'

export const CommentsDAL = {
    create: async (comment: CommentType) => {
        const answer = await Comment.insertOne(comment)
        return await CommentsDAL.getById(answer.insertedId + '')
    },
    read: async (PageNumber: number = 1, PageSize: number = 10, postId?: string) => {
        return await Comment.find(postId ? {postId} : {})
            .skip((PageNumber - 1) * PageSize)
            .limit(PageSize)
            .toArray()
    },
    count: async (postId?: string) => {
        return await Comment.countDocuments(postId ? {postId} : {})
    },
    getById: async (_id: string) => {
        return await Comment.findOne({_id: new ObjectId(_id)})
    },
    del: async (_id: string) => {
        return await Comment.deleteOne({_id: new ObjectId(_id)})
    },
}