import { useAppSelector } from "../redux/hooks"

export const useUser  = () => {
    const user = useAppSelector((state) => state.user.user)
    return user
}