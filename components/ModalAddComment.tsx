import React, {FunctionComponent} from "react";
import {addComment} from "@/api/comment";
import {IComment} from "@/interfaces/IComment";
import {IPost} from "@/interfaces/IPost";

interface IProps {
    post: IPost
}

const ModalAddComment: FunctionComponent<IProps> = ({post}) => {
    const [showModal, setShowModal] = React.useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault()

        const data: IComment = {
            text: e.target.text.value,
            post_id: post._id as string,
        }

        addComment(data)
    }

    return (
        <>
            <div className="flex flex-col gap-1 cursor-pointer hover:text-blue-600" onClick={() => setShowModal(true)}>
                <div className={"text-sm"}>laissez un commentaire</div>
            </div>
            {showModal ? (
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
                                    <h3 className="text-3xl font-semibold">
                                        Ajouter un commentaire
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
                                    <div className="relative p-6 flex-auto w-96">
                                        <textarea required placeholder={"Ecrivez votre commentaire, c'est un ordre."}
                                                  id={"text"}
                                                  className={"w-full p-2 border bg-white text-black rounded mb-2 h-40"}/>
                                    </div>
                                    {/*footer*/}
                                    <div
                                        className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
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
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={() => setShowModal(false)}></div>
                </>
            ) : null}
        </>
    );
}

export default ModalAddComment;