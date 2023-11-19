export type TPostForm =  {
	title: string
	content: string
	tags: string[]
	image: string
}

export type TPost = TPostForm & {
    _id: string
    createdAt: string
    updatedAt: string
    likes: number
}