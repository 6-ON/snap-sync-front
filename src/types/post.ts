export type TPostForm =  {
	title: string
	content: string
	tags: string[]
	image: string
}

export type TPost = TPostForm & {
    _id: string
    creator: TUser
    createdAt: string
    updatedAt: string
    likes: string[]
}
export type TUser = {
    _id: string
    name: string
    email: string
    createdAt: string
    updatedAt: string
    posts?: TPost[]
}