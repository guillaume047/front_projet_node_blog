import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export async function getStaticProps() {
    const isAuthenticated = localStorage.getItem('ACCESS_TOKEN') !== null
}

const ProtectRoute = ({children}: any) => {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('ACCESS_TOKEN') === null && router.pathname !== '/auth/login') {
            router.push('/auth/login')
        } else {
            setIsAuthenticated(true)
        }

    }, [])

    if (router.pathname === '/auth/login' || isAuthenticated)
        return children
    else
        return <div>Loading</div>
}

export default ProtectRoute