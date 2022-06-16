export type BloggerType = {
    id: number
    name: string
    youtubeUrl: string
}

export let bloggers: BloggerType[] = [
    {id: 1, name: 'string', youtubeUrl: 'string'},
    {id: 2, name: 'string2', youtubeUrl: 'string2'},
]

export const bloggersRepository = {
    getBloggers: () => bloggers,

    addBlogger: (name: string, youtubeUrl: string) => {
        const newBlogger = {
            id: Date.now(),
            name: name,
            youtubeUrl: youtubeUrl,
        }
        bloggers.push(newBlogger)
        return newBlogger
    },

    findBlogger: (id: number) => bloggers.find(v => v.id === id),

    deleteBlogger: (id: number) => {
        bloggers = bloggers.filter(v => v.id !== id)
    },

    changeBloggers: (x: { id: number, name: string, youtubeUrl: string }) => {
        bloggers = bloggers.map(v => v.id === x.id ? {...v, name: x.name, youtubeUrl: x.youtubeUrl} : v)
    },
}