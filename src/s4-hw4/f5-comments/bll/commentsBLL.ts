import {UserType} from '../../f0-types/user'
import {WithId} from 'mongodb'
import {CommentType} from '../../f0-types/comment'
import {CommentsDAL} from '../dal/commentsDAL'

export const CommentsBLL = {
    add: async (content: string, user: WithId<UserType>, postId: string) => {
        const newComment: CommentType = {
            content,
            addedAt: new Date().toUTCString(),
            postId,
            userId: user._id + '',
            userLogin: user.login,
        }
        return await CommentsDAL.create(newComment)
    },
    read: async (PageNumber: number, PageSize: number, postId?: string) => {
        const items = await CommentsDAL.read(PageNumber, PageSize, postId)
        const totalCount = await CommentsDAL.count(postId)
        return {
            items: items.map(c => {
                const {_id, postId, ...rest} = c
                return {...rest, id: _id}
            }),
            totalCount,
            page: PageNumber,
            pageSize: PageSize,
            pagesCount: Math.ceil(totalCount / PageSize)
        }
    },
}