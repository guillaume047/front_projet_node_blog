import React, {FunctionComponent} from "react";
import {addComment} from "@/api/comment";
import {IComment} from "@/interfaces/IComment";
import {IPost} from "@/interfaces/IPost";
import {useFlashMessage} from "@/components/useFlashMessage";
import {useRouter} from "next/router";
import dayjs from "dayjs";

interface IProps {
    post: IPost
}

const ModalComment: FunctionComponent<IProps> = ({post}) => {
    const [showModal, setShowModal] = React.useState(false);
    const flashMessage = useFlashMessage();
    const router = useRouter();
    const handleSubmit = (e: any) => {
        e.preventDefault()

        const data: IComment = {
            text: e.target.text.value,
            post_id: post._id as string,
        }
        addComment(data).then(() => {
            setShowModal(false)
            flashMessage.show("Votre commentaire a bien été ajouté", "green");
            router.reload()
        })
            .catch((err) => {
                console.log('err : ', err)
                flashMessage.show(`${err}`, "red");
            })
    }

    return (
        <>
            <div onClick={() => setShowModal(true)}
                 className="flex flex-row justify-start items-center gap-1 hover:text-blue-600 w-fit cursor-pointer select-none">
                {post.comments?.length}
                <svg viewBox="0 0 121.58 122.88" className={"fill-current h-5 w-5"}>
                    <path
                        d="M25.8,111.27,44.08,94.69a3.46,3.46,0,0,1,2.41-1h66.18a2,2,0,0,0,2-1.95V8.9a2,2,0,0,0-2-1.95H8.9A1.95,1.95,0,0,0,7,8.9V91.76a1.95,1.95,0,0,0,2,1.95H22.33a3.48,3.48,0,0,1,3.47,3.48v14.08Zm1.17-45a3.48,3.48,0,0,0,0,7H68a3.48,3.48,0,0,0,0-7Zm0-39.86a3.48,3.48,0,0,0,0,7H94.69a3.48,3.48,0,1,0,0-6.95Zm0,19.93a3.48,3.48,0,0,0,0,6.95H87.66a3.48,3.48,0,0,0,0-6.95Zm20.9,54.32-23,21.07a3.48,3.48,0,0,1-6.06-2.32V100.66H8.9A8.91,8.91,0,0,1,0,91.76V8.9A8.91,8.91,0,0,1,8.9,0H112.67a8.93,8.93,0,0,1,8.91,8.9V91.76a8.93,8.93,0,0,1-8.91,8.9Z"/>
                </svg>
            </div>

            {showModal && post.comments ? (
                <>
                    <div
                        className="justify-center items-center m-auto flex overflow-x-hidden overflow-y-auto w-fit h-fit fixed inset-0 z-50"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div
                                className="border-0 rounded-lg relative flex flex-col w-full bg-white">
                                {/*header*/}
                                <div
                                    className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-center w-full">
                                        Commentaires
                                    </h3>

                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span
                                            className="text-black h-6 w-6 text-2xl block">
                                          X
                                        </span>
                                    </button>
                                </div>

                                {/*body*/}
                                <form className="relative flex-auto" onSubmit={handleSubmit}>
                                    <div className="relative px-6 py-2 flex-auto w-full">
                                        <textarea required placeholder={"Ecrivez votre commentaire, c'est un ordre."}
                                                  id={"text"}
                                                  className={"w-full p-2 border bg-white text-black rounded mb-2 h-40"}/>
                                    </div>
                                    {/*footer*/}
                                    <div
                                        className="flex items-center justify-end px-6 pb-2 border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Annuler
                                        </button>

                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Enregistrer
                                        </button>
                                    </div>
                                </form>

                                <div className={"flex flex-col gap-5 border-t p-5"}>
                                    {post.comments.length === 0 ? (<div>Aucun commentaires pour le moment</div>
                                    ) : (
                                        post.comments.map((comment: IComment) => (
                                                <div key={comment._id} className={"border-t"}>
                                                    <div className={"font-bold pr-1"}>
                                                        {dayjs(comment.createdAt).format('DD/MM/YYYY HH:mm')}
                                                    </div>
                                                    {comment.text}
                                                </div>
                                            )
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={() => setShowModal(false)}></div>
                </>
            ) : null}
        </>
    );
}

export default ModalComment;