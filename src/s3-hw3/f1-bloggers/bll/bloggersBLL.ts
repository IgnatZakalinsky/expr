import {BloggersDAL} from '../dal/bloggersDAL'
import {BloggerType} from '../../f0-types/blogger'

export const BloggersBLL = {
    read: async (SearchNameTerm: string, PageNumber: number, PageSize: number) => {
        const items = await BloggersDAL.read(SearchNameTerm, PageNumber, PageSize)
        const totalCount = await BloggersDAL.count(SearchNameTerm)
        return {
            items,
            totalCount,
            page: PageNumber,
            pageSize: PageSize,
            pagesCount: Math.ceil(totalCount / PageSize)
        }
    },
    add: async (name: string, youtubeUrl: string) => {
        return await BloggersDAL.add(name, youtubeUrl)
    },
    getById: async (id: number) => {
        return await BloggersDAL.getById(id)
    },
    del: async (id: number) => {
        const b: BloggerType | null = await BloggersBLL.getById(id)
        if (!b) {
            return false
        }
        await BloggersDAL.del(id)
        return true
    },
    update: async (blogger: BloggerType) => {
        const b: BloggerType | null = await BloggersBLL.getById(blogger.id)
        if (!b) {
            return false
        }
        await BloggersDAL.update(blogger)
        return true
    }
}