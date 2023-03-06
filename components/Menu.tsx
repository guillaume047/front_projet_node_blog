import {useRecoilValue} from "recoil";
import {authUser} from "@/recoil/user";
import * as process from "process";

const Menu = () => {
    const user = useRecoilValue(authUser)

    return (
        <>
            <nav className="flex-row bg-white shadow-lg">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between">
                        <div className="flex space-x-7">
                            <div>
                                <a href="/"
                                   className="flex items-center py-4 px-2">
                                    <span
                                        className={'font-semibold text-gray-500 text-lg'}>{process.env.NEXT_PUBLIC_APP_NAME}</span>
                                </a>
                            </div>
                            <div className="flex flex-end items-center space-x-1">
                                <a href="/users"
                                   className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Liste
                                </a>
                                {user && user.isAdmin && <a href="/users/add"
                                                            className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Ajouter</a>}
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 ">
                            <a href={"/users/" + user?._id}
                               className="py-2 px-2 font-medium text-gray-500">
                                <img src={user && user.photo} width={"35px"} height={"35px"} className={'rounded-2xl'}/>
                            </a>

                            <a href="/auth/logout"
                               className="py-2 px-2 font-medium text-white bg-primary-600 rounded hover:bg-primary-400 transition duration-300">Déconnexion
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Menu