export type BlogPost = {
    id: number,
    rank: number,
    slug: string,
    title: string,
    intro: string,
    text: string,
    imageName: string,
    createdAt:  {
        date: string;
        timezone: string;
        timezone_type: number;
    },
    modifiedAt: {
        date: string;
        timezone: string;
        timezone_type: number;
    },
    isPublished: boolean,
    author: PostAuthor,
    tags: BlogTag[]
}

export type PostAuthor = {
    id: number,
    email: string,
    name: string,
    firstName: string
}

export type BlogTag = {
    id: number,
    slug: string,
    name: string
}