import React, {FunctionComponent, useState} from "react";
import {addPost, gatAllTags, upload} from "@/api/posts";
import {useRouter} from "next/router";
import {useFlashMessage} from "@/components/useFlashMessage";
import {useQuery} from "react-query";
import Select from "react-select";
import {ISelectOption} from "@/interfaces/ISelectOption";
import {ITag} from "@/interfaces/ITag";

interface IProps {
}

const ModalAddComment: FunctionComponent<IProps> = ({}) => {
    const [showModal, setShowModal] = React.useState(false);
    const router = useRouter();
    const flashMessage = useFlashMessage();
    const [selectedTags, setSelectedTags] = useState([]);
    let {data, isLoading, refetch} = useQuery(
        ['gatAllTags'],
        () => gatAllTags(),
    )
    const handleSubmit = (e: any) => {
        e.preventDefault()

        const data: any = {
            title: e.target.title.value,
            content: e.target.text.value,
            tags: selectedTags.map((tag: ISelectOption) => tag.value)
        }

        addPost(data).then((res: any) => {
            upload(
                res.data.post_id as string,
                e.target.file.files[0],
            ).then(() => {
                setShowModal(false)
                router.reload()
            })
        }).catch((err) => {
            flashMessage.show(`${err}`, "red");
        })
    }

    const handleTagChange = async (selected: any, selectaction: any) => {
        const {action} = selectaction;
        if (action === "clear") {
        } else if (action === "select-option") {
        } else if (action === "remove-value") {
            console.log("remove");
        }
        setSelectedTags(selected);
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
                                    <div className="relative p-6 flex-auto w-full">
                                        <input required type={"text"} placeholder={"Titre de l'article"} id={"title"}
                                               className={"w-full p-2 border bg-white text-black rounded mb-2"}/>

                                        <textarea required placeholder={"Contenu de l'article"} id={"text"}
                                                  className={"w-full h-40 p-2 border bg-white text-black rounded mb-2"}/>

                                        <input required type={"file"} id={"file"}
                                               className={"w-full p-2 border bg-white text-black rounded mb-2 "}/>

                                        <div className="flex justify-center">
                                            <div className="mb-3 xl:w-96 mx-10 w-full">
                                                <Select
                                                    id="tags"
                                                    instanceId="tags"
                                                    isMulti
                                                    name="tags"
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    options={data.map((tag: ITag) => ({
                                                        value: tag._id,
                                                        label: tag.name,
                                                    }))}
                                                    onChange={handleTagChange}
                                                    placeholder="Choissisez un ou plusieurs tags"
                                                />
                                            </div>
                                        </div>
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