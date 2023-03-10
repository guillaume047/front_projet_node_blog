import React, {FunctionComponent, useEffect, useState} from "react";
import {IPost} from "@/interfaces/IPost";
import {gatAllTags, updatePost, upload} from "@/api/posts";
import {useRecoilValue} from "recoil";
import {authUser} from "@/recoil/user";
import {useRouter} from "next/router";
import {ISelectOption} from "@/interfaces/ISelectOption";
import Select from "react-select";
import {ITag} from "@/interfaces/ITag";
import {useQuery} from "react-query";

interface IProps {
    post: IPost
}

const ModalEditPost: FunctionComponent<IProps> = ({post}) => {
    const [showModal, setShowModal] = React.useState(false);
    const user = useRecoilValue(authUser)
    const router = useRouter()
    const [selectedTags, setSelectedTags] = useState<ISelectOption[]>([]);
    let {data, isLoading, refetch} = useQuery(
        ['gatAllTags'],
        () => gatAllTags(),
    )

    useEffect(() => {
        setSelectedTags(post.tags.map((tag: any) => {
            return {value: tag._id, label: tag.name}
        }))
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault()

        const data: any = {
            _id: post._id,
            title: e.target.title.value,
            content: e.target.text.value,
            tags: selectedTags.map((tag: ISelectOption) => tag.value)
        }

        updatePost(data).then((res) => {
            upload(
                post._id as string,
                e.target.file.files[0],
            ).then(() => {
                setShowModal(false)
                router.reload()
            })
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
            {(user && user.isAdmin === true || user._id === post.owner_id) && (
                <div className={"absolute top-0 right-12"} onClick={() => setShowModal(true)}>
                    <svg viewBox="0 0 100 100"
                         className={"fill-blue-600 hover:fill-blue-400 hover:cursor-pointer h-5 w-5"}>
                        <path
                            d="M95.3,11.4l-6.5-6.5c-2.4-2.4-6.3-2.4-8.7,0l-3.8,3.8h0L73,12L68.1,17l-3.6,3.6h0L16.6,68.4h0l-6.1,6.1L2.9,96.9l22.7-7.2  l2.7-2.7h0l67-67C97.7,17.6,97.7,13.7,95.3,11.4z M4.7,95.1l2.6-7.6l5.1,5.1L4.7,95.1z M25,88.7l-11.5,3.7l0.1-0.1l-5.9-5.9  l3.8-11.2l0.8-0.8l2.8,0.3l-0.5,3.6l3.4-0.5l-0.6,4.2l4.2-0.6l-0.4,2.9l2.9-0.4l-0.6,4l3.1-0.5L25,88.7z M31.9,81.8l-4.1,4.1  l-3.1,0.5l0.6-4l-2.9,0.4l0.4-2.9l-4.2,0.6l0.6-4.2l-3.4,0.5l0.5-3.3l-3-0.3l4.1-4.1l47.9-47.9l13.5,13.5L31.9,81.8z M79.6,34.1  L66.1,20.6l2.8-2.8l13.5,13.5L79.6,34.1z M83.2,30.5L69.7,17l2.9-2.9l0.4-0.4l13.5,13.5L83.2,30.5z M87.3,26.4L73.8,12.8l2.6-2.6  l13.5,13.5L87.3,26.4z M94.5,19.2L90.7,23L77.2,9.5L81,5.7c1.9-1.9,5.1-1.9,7.1,0l6.5,6.5C96.4,14.1,96.4,17.3,94.5,19.2z">
                        </path>
                        <rect x="18.2" y="54.9" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 125.1507 59.1783)"
                              width="64.3"
                              height="1.1"></rect>
                        <rect x="12.1" y="48.9" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 110.5581 53.1338)"
                              width="64.3"
                              height="1.1"></rect>
                    </svg>
                </div>
            )}
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
                                        Modifier l&apos;article {post.title}
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
                                <form className="relative flex-auto text-sm font-normal" onSubmit={handleSubmit}>
                                    <div className="relative p-6 flex-auto w-full">
                                        <input required type={"text"} placeholder={"Titre de l'article"} id={"title"}
                                               className={"w-full p-2 border bg-white text-black rounded mb-2"}
                                               defaultValue={post?.title}/>

                                        <textarea required placeholder={"Contenu de l'article"} id={"text"}
                                                  defaultValue={post?.content}
                                                  className={"w-full h-40 p-2 border bg-white text-black rounded mb-2"}/>

                                        <label htmlFor={"image"} className={"text-sm font-bold"}>Changer
                                            l&apos;image</label>
                                        <input type={"file"} id={"file"}
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
                                                    defaultValue={selectedTags}
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

export default ModalEditPost;