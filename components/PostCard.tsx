import {FunctionComponent, useState} from "react";
import {IPost} from "@/interfaces/IPost";
import dayjs from "dayjs";
import ModalComment from "@/components/ModalComment";
import {deleteOnePost, like} from "@/api/posts";
import {useRecoilValue} from "recoil";
import {authUser} from "@/recoil/user";
import {useRouter} from "next/router";
import {useFlashMessage} from "@/components/useFlashMessage";
import ModalEditPost from "@/components/ModalEditPost";
import * as process from "process";
import FavoriteIcon from "@/components/FavoriteIcon";

interface IProps {
    initialPost: IPost
}

const PostCard: FunctionComponent<IProps> = ({initialPost}) => {
    const user = useRecoilValue(authUser);
    const [post, setPost] = useState<IPost>(initialPost)
    const [isLiked, setIsLiked] = useState<boolean>(initialPost?.like?.includes(user._id))
    const router = useRouter()
    const flashMessage = useFlashMessage();

    const handleClick = () => {
        like(post._id as string).catch((err) => {
            flashMessage.show(`${err}`, "red");
            setIsLiked(!isLiked)
        })

        setIsLiked(!isLiked)

        if (isLiked) setPost({...post, like: post.like.filter((id) => id !== user._id)})
        else setPost({...post, like: [...post.like, user._id]})
    }

    const deletePost = (postID: string) => {
        deleteOnePost(postID).then((res) => {
            router.reload()
        }).catch((err) => {
            console.log('err : ', err)
            flashMessage.show(`${err}`, "red");
        })
    }

    if (!post) return null

    return (
        <div
            className="flex flex-col justify-start bg-amber-200 p-5 gap-3 w-full h-70 rounded-2xl border-2 border-blue-200 hover:border-blue-400">
            <div className="flex flex-row text-2xl font-bold relative">
                {post.title}

                <FavoriteIcon post={post}/>
                {user && user.isAdmin === true && (
                    <div className={"absolute top-0 right-6"} onClick={() => deletePost(post._id as string)}>
                        <svg viewBox="0 0 612 612"
                             className={"fill-red-500 hover:fill-red-700 hover:cursor-pointer h-5 w-5"}>
                            <g>
                                <g>
                                    <g>
                                        <path
                                            d="M510.812,85.933c-29.254-14.929-58.367-16.325-59.592-16.375c-0.246-0.012-0.492-0.017-0.737-0.017H404.18 				c0.003-0.139,0.022-0.273,0.022-0.415c0-26.812-12.761-48.09-35.931-59.913c-16.138-8.234-31.876-9.122-33.618-9.194 				C334.409,0.006,334.163,0,333.917,0h-55.832c-0.246,0-0.492,0.006-0.737,0.017c-1.741,0.074-17.48,0.96-33.616,9.194 				C220.56,21.035,207.8,42.313,207.8,69.124c0,0.142,0.017,0.276,0.022,0.415h-46.303c-0.246,0-0.492,0.006-0.737,0.017 				c-1.226,0.051-30.337,1.446-59.593,16.375c-28.241,14.41-61.905,44.075-61.905,103.548c0,9.581,7.767,17.35,17.35,17.35h15.245 				l67.087,390.755c1.43,8.328,8.65,14.416,17.099,14.416h299.873c8.449,0,15.67-6.088,17.099-14.416l67.087-390.755h15.245 				c9.581,0,17.35-7.768,17.35-17.35C572.718,130.006,539.053,100.341,510.812,85.933z M75.398,172.13 				c4.22-24.493,17.846-42.891,40.665-54.828c21.272-11.123,43.329-12.888,45.936-13.063h288.005 				c2.585,0.172,24.08,1.906,45.034,12.6c23.361,11.922,37.29,30.475,41.562,55.29L75.398,172.13L75.398,172.13z M242.5,69.125 				c0-13.566,5.156-22.656,16.226-28.599c8.889-4.773,18.372-5.701,19.886-5.825h54.742c1.736,0.142,11.12,1.102,19.92,5.825 				c11.07,5.944,16.228,15.033,16.228,28.599c0,0.142,0.017,0.276,0.022,0.415H242.48C242.482,69.401,242.5,69.265,242.5,69.125z 				 M441.312,577.301H170.688l-63.605-370.472h397.834L441.312,577.301z"/>
                                        <path
                                            d="M306,519.57c9.581,0,17.35-7.768,17.35-17.35V257.909c0-9.581-7.768-17.35-17.35-17.35c-9.583,0-17.35,7.768-17.35,17.35 				V502.22C288.65,511.802,296.419,519.57,306,519.57z"/>
                                        <path
                                            d="M203.782,503.754c0.801,9.022,8.373,15.816,17.261,15.816c0.513,0,1.032-0.023,1.553-0.068 				c9.545-0.847,16.596-9.273,15.749-18.816l-21.687-244.311c-0.847-9.545-9.265-16.609-18.817-15.749 				c-9.545,0.847-16.595,9.27-15.748,18.816L203.782,503.754z"/>
                                        <path
                                            d="M389.404,519.502c0.52,0.045,1.04,0.068,1.553,0.068c8.889,0,16.462-6.794,17.263-15.816l21.687-244.313 				c0.847-9.545-6.202-17.968-15.748-18.816c-9.544-0.856-17.968,6.204-18.817,15.749l-21.687,244.311 				C372.808,510.229,379.859,518.655,389.404,519.502z"/>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                )}

                <ModalEditPost post={post}/>
            </div>

            <div className="flex flex-row gap-1">
                {post.tags && post.tags.map((tag, index) => (
                    // @ts-ignore
                    <div key={index} className={"text-xs px-2 py-1 bg-cyan-500 rounded"}>{tag.name}</div>
                ))}
            </div>

            {post.image && (
                <div className="flex flex-col gap-1">
                    <div className={"text-sm"}>{dayjs(post.created_at).format("ddd DD MMM").toString()}</div>
                    <img src={process.env.NEXT_PUBLIC_API_URL + "/" + post.image} className={"w-full h-36"}/>
                </div>
            )}

            <div className="flex flex-row gap-5">
                <div onClick={handleClick}
                     className={isLiked ? "flex flex-row justify-start items-center text-blue-800 gap-1 hover:text-blue-600 w-fit cursor-pointer select-none"
                         : "flex flex-row justify-start items-center gap-1 hover:text-blue-600 w-fit cursor-pointer select-none"}>
                    <span>{post.like.length}</span>

                    <svg viewBox="0 0 47 47" className={"fill-current h-5 w-5"}>
                        <path
                            d="m44.732 23.195-4.528-.001a2.269 2.269 0 0 0-2.267 2.264v19.164a2.267 2.267 0 0 0 2.267 2.266h4.528A2.267 2.267 0 0 0 47 44.622v-19.16a2.268 2.268 0 0 0-2.268-2.267zm-1.805 21.326a1.858 1.858 0 1 1-2.629-2.628 1.86 1.86 0 0 1 2.629 2.628zM29.078 9.795c.197-2.889.969-4.351 1.238-7.204C30.47.965 28.767.112 25.669.112c-3.098 0-4.298 2.773-4.648 3.718-.774 2.092 0 8.985 0 12.394 0 2.686-4.805 4.16-10.303 4.169C3.155 20.408 0 18.6 0 23.345c0 1.642 1.013 2.973 2.265 2.972-1.252 0-2.266 1.334-2.265 2.974 0 1.64 1.013 2.974 2.265 2.971C1.013 32.264.001 33.595 0 35.233c0 1.645 1.015 2.973 2.265 2.975-1.25-.002-2.265 1.33-2.264 2.975 0 1.643 1.013 2.972 2.264 2.972 0 0 3.219.003 15.429.003h16.671c.625 0 1.131-.507 1.132-1.134V25.82a1.125 1.125 0 0 0-.129-.524c-.001 0-6.833-7.523-6.29-15.501z"/>
                    </svg>
                </div>

                <ModalComment post={post}/>
            </div>


        </div>
    )
}

export default PostCard