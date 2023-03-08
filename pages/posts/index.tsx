import {useEffect, useState} from "react";
import {IPost} from "@/interfaces/IPost";
import * as process from "process";
import axios from "axios";
import BaseLayout from "@/components/BaseLayout";
import PostCard from "@/components/PostCard";
import ModalAddPost from "@/components/ModalAddPost";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [newPosts, setNewPosts] = useState([]);
    const [searchBy, setSearchBy] = useState("title");
    const [categories, setCategories] = useState(new Set());
    const [categoryActive, setCategoryActive] = useState<string>("Toutes les catégories");

    let newFilterPosts = [];

    const setSearchPost = (searchBy: string) => {
        setSearchBy(searchBy)
    };

    const setSearchCategory = async (category: string) => {
        setCategoryActive(category)
        if (category.includes("Toutes les catégories")) {
            newFilterPosts = newPosts.filter((post: IPost) => {
                return post.categories.includes(category)
            })
            setPosts(newFilterPosts)
        } else {
            await getPosts()
        }
    };

    const getAllCategories = () => {
        const cat = new Set(newPosts.map((post: IPost) => {
            return post.categories
        }))

        setCategories(cat)
        console.log(categories)
    }

    const setSearchByName = async (searchTerm: string) => {
        console.log("searchTerm", searchTerm, "categoryActive", categoryActive)
        if (categoryActive === "Toutes les catégories") {
            const filteredPosts = newPosts.filter((post) => {
                // @ts-ignore
                return post[searchBy].toLowerCase().includes(searchTerm.toLowerCase());
            });
            setPosts(filteredPosts)
        } else {
            const newFilterPosts = newPosts.filter((post: IPost) => {
                return post.categories.includes(categoryActive)
            })
            const filteredPosts = newFilterPosts.filter((post) => {
                // @ts-ignore
                return post[`${searchBy}`].toLowerCase().includes(searchTerm.toLowerCase());
            });
            setPosts(filteredPosts)
        }
    };

    const getPosts = async () => {
        const instance = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
            }
        });

        await instance.get(
            process.env.NEXT_PUBLIC_API_URL + '/posts',
        )
            .then((res) => {
                console.log("all posts", res.data)

                setNewPosts(
                    res.data
                )
                setPosts(res.data);
                return res.data
            })
            .catch((err) => {
                console.log(err)
            });
    }

    useEffect(() => {
        getPosts();
    }, []);

    useEffect(() => {
        getAllCategories()
    }, [posts]);

    const [name, setName] = useState("");
    return (
        <BaseLayout title={"Users"}>
            <div className="flex flex-col text-black items-center px-6 py-8 mx-auto w-full md:h-full lg:py-0">
                <h1 className="text-3xl font-medium">Articles</h1>
                <div className="flex items-center px-4 py-3 bg-white border-b border-gray-200 rounded">
                    <input
                        className="flex-1 px-4 py-2 mr-4 rounded-lg border border-gray-400 bg-white"
                        type="text"
                        placeholder="Rechercher par nom..."
                        onChange={e => setSearchByName(e.target.value)}
                    />

                    <select
                        className="px-4 py-2 mr-4 rounded-lg border border-gray-400 bg-white"
                        onChange={e => setSearchPost(e.target.value)}
                    >
                        <option value={"title"}>Titre</option>
                        <option value={"tag"}>Tag</option>
                    </select>

                    <select
                        className="px-4 py-2 rounded-lg border border-gray-400 bg-white"
                        onChange={e => setSearchCategory(e.target.value)}
                    >
                        <option selected={true}>Toutes les catégories</option>

                        {Array.from(categories).map((category: any, index) => {
                            return <option key={index}>{category}</option>
                        })}
                    </select>
                </div>

                <ModalAddPost/>

                <div className="flex flex-col items-center w-full">
                    <div className="flex flex-wrap justify-center w-full">
                        <div className="grid base:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full mt-5 gap-5 lg:px-20">
                            {
                                posts && posts.map((post: IPost) => <PostCard key={post._id}
                                                                              initialPost={post}/>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
};


export default Posts