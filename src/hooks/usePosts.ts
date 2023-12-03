import { useAppSelector } from "../redux/hooks"

export const usePosts = () => {
	const posts = useAppSelector((state) => state.post.posts)
    return posts
}