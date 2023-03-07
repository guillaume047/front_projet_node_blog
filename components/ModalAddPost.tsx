import React, {FunctionComponent} from "react";
import {IPost} from "@/interfaces/IPost";
import {addPost} from "@/api/posts";

interface IProps {
}

const ModalAddComment: FunctionComponent<IProps> = ({}) => {
    const [showModal, setShowModal] = React.useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault()

        const data: IPost = {
            title: e.target.title.value,
            content: e.target.text.value,
            image: e.target.image.value,
            likeCount: 0,
        }

        addPost(data).then(() => {
            setShowModal(false)
        })
    }

    return (
        <>
            <a onClick={() => setShowModal(true)}
               className="py-2 px-2 font-medium text-white w-fit mx-auto cursor-pointer bg-primary-600 rounded hover:bg-primary-400 transition duration-300">
                Ajouter
                un article
            </a>
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
                                        Ajouter un article
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
                                        <input required type={"text"} placeholder={"Titre de l'article"} id={"title"}
                                               className={"w-full p-2 border bg-white text-black rounded mb-2"}/>

                                        <textarea required placeholder={"Contenu de l'article"} id={"text"}
                                                  className={"w-full h-40 p-2 border bg-white text-black rounded mb-2"}/>

                                        <input required type={"file"} id={"image"}
                                               className={"w-full p-2 border bg-white text-black rounded mb-2 "}/>
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