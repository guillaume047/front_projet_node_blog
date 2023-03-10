import {useEffect, useState} from "react";
import {IPost} from "@/interfaces/IPost";
import BaseLayout from "@/components/BaseLayout";
import PostCard from "@/components/PostCard";
import {useQuery} from "react-query";
import {gatAllTags, getFavorites} from "@/api/posts";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [nameSearched, setNameSearched] = useState<string>("");
    const [categoryActive, setCategoryActive] = useState<string>("all");
    let {data: tags} = useQuery(
        ['gatAllTags'],
        () => gatAllTags(),
    )
    let {data: favorites} = useQuery(
        ['getFavorites'],
        () => getFavorites(),
    )

    useEffect(() => {
        setPosts(favorites)
    }, [favorites])

    return (
        <BaseLayout title={"Users"}>
            <div className="flex flex-col text-black items-center px-6 py-8 mx-auto w-full md:h-full lg:py-0">
                <h1 className="text-3xl font-medium">Favoris</h1>
                <div className="flex items-center px-4 py-3 bg-white border-b border-gray-200 rounded">
                    <input
                        className="flex-1 px-4 py-2 mr-4 rounded-lg border border-gray-400 bg-white"
                        type="text"
                        placeholder="Rechercher par nom..."
                        onChange={e => setNameSearched(e.target.value)}
                        value={nameSearched}
                    />

                    <select
                        className="px-4 py-2 rounded-lg border border-gray-400 bg-white"
                        onChange={e => setCategoryActive(e.target.value)}
                    >
                        <option selected={true} value={"all"}>Toutes les catégories</option>

                        {tags && Array.from(tags).map((tag: any, index) => {
                            return <option key={index} value={tag._id}>{tag.name}</option>
                        })}
                    </select>
                </div>

                <div className="flex flex-col items-center w-full">
                    <div className="flex flex-wrap justify-center w-full">
                        <div className="grid base:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full mt-5 gap-5 lg:px-20">
                            {
                                posts && posts.map((post: IPost) => {
                                    // @ts-ignore
                                    if (categoryActive === "all" || post.tags?.map((tag) => tag._id).includes(categoryActive))
                                        if (nameSearched === "" || post.title.toLowerCase().includes(nameSearched.toLowerCase()))
                                            return <PostCard key={post._id}
                                                             initialPost={post}/>
                                    return null
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
};


export default Posts