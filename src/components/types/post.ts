export type TPostForm =  {
	title: string
	content: string
	tags: string[]
	image: string
}

export type TPost = TPostForm & {
    _id: string
    created_at: string
    updated_at: string
    likes: number
}