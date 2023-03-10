import {FunctionComponent, useState} from "react";
import {IPost} from "@/interfaces/IPost";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {authUser} from "@/recoil/user";
import {addFavorite, deleteFavorite} from "@/api/users";
import {useFlashMessage} from "@/components/useFlashMessage";
import {useRouter} from "next/router";

interface IProps {
    post: IPost
}

const FavoriteIcon: FunctionComponent<IProps> = ({post}) => {
    const user = useRecoilValue(authUser)
    const [isFavorite, setIsFavorite] = useState<boolean>(user.favorites.includes(post._id as string))
    const flashMessage = useFlashMessage();
    const setAuthUser = useSetRecoilState(authUser)
    const router = useRouter()
    const handleClick = () => {
        let tmpFavorite = !isFavorite

        if (tmpFavorite) {
            addFavorite(post._id as string).catch((err) => {
                console.log('err : ', err)
                flashMessage.show(`${err}`, "red");
            })
        } else {
            deleteFavorite(post._id as string)
                .then(() => {
                    if (router.pathname === '/favorites')
                        router.reload()
                })
                .catch((err) => {
                    console.log('err : ', err)
                    flashMessage.show(`${err}`, "red");
                })
        }

        setAuthUser({
            ...user, favorites: tmpFavorite
                ? [...user.favorites, post._id as string]
                : user.favorites.filter((id: string) => id !== post._id)
        })
        setIsFavorite(!isFavorite)
    }

    return (
        <div onClick={handleClick} className={"absolute top-0 right-0 fill-red-500"}>
            {!isFavorite ? (
                    // Empty star
                    <svg className={"fill-yellow-600 hover:fill-yellow-800 hover:cursor-pointer h-5 w-5"} width="800"
                         height="800"
                         viewBox="0 0 256 256">
                        <path
                            d="M187.273 228.011a12.23 12.23 0 0 1-6.567-1.946l-50.435-31.953a4.206 4.206 0 0 0-4.541 0l-46.87 29.694a13.648 13.648 0 0 1-15.591-.49 14.391 14.391 0 0 1-5.472-15.293l13.514-53.16a4.754 4.754 0 0 0-1.52-4.816l-45.228-37.644a12.676 12.676 0 0 1-3.92-13.747 12.226 12.226 0 0 1 10.98-8.623L90.687 86.2a4.447 4.447 0 0 0 3.789-2.835l22.029-55.474a12.318 12.318 0 0 1 22.99 0l22.03 55.474a4.446 4.446 0 0 0 3.787 2.835l59.065 3.833a12.226 12.226 0 0 1 10.98 8.623 12.676 12.676 0 0 1-3.92 13.747l-45.228 37.644a4.755 4.755 0 0 0-1.52 4.816l14.573 57.322a12.657 12.657 0 0 1-4.815 13.448 12.18 12.18 0 0 1-7.174 2.378ZM128 185.433a12.216 12.216 0 0 1 6.552 1.92l50.435 31.955a4.09 4.09 0 0 0 4.763-.151 4.641 4.641 0 0 0 1.758-5l-14.572-57.323a12.796 12.796 0 0 1 4.156-12.936l45.227-37.643a4.674 4.674 0 0 0 1.431-5.123 4.376 4.376 0 0 0-3.89-3.116l-59.065-3.833a12.482 12.482 0 0 1-10.706-7.866l-22.03-55.473a4.32 4.32 0 0 0-8.119 0l-22.029 55.473a12.482 12.482 0 0 1-10.706 7.866l-59.064 3.833a4.376 4.376 0 0 0-3.891 3.116 4.674 4.674 0 0 0 1.43 5.123l45.228 37.643a12.795 12.795 0 0 1 4.156 12.936l-13.513 53.16a6.356 6.356 0 0 0 2.415 6.846 5.717 5.717 0 0 0 6.612.209l46.87-29.695a12.216 12.216 0 0 1 6.552-1.92Z"/>
                    </svg>
                )
                : (
                    // Fulfilled start
                    <svg className={"fill-yellow-600 hover:fill-yellow-800 hover:cursor-pointer h-5 w-5"} width="800"
                         height="800" viewBox="0 0 53.867 53.867">
                        <path
                            d="m26.934 1.318 8.322 16.864 18.611 2.705L40.4 34.013l3.179 18.536-16.645-8.751-16.646 8.751 3.179-18.536L0 20.887l18.611-2.705z"/>
                    </svg>
                )}
        </div>
    )
}

export default FavoriteIcon