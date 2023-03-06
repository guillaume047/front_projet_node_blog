import {useSetRecoilState} from "recoil";
import {authUser} from "@/recoil/user";
import {useRouter} from "next/router";

const Logout = () => {
    const router = useRouter()
    const setUser = useSetRecoilState(authUser)

    localStorage.removeItem('ACCESS_TOKEN')
    setUser(undefined)
    router.push('/auth/login')
}

export default Logout