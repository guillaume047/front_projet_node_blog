import BaseLayout from "@/components/BaseLayout";
import {useQuery} from "react-query";
import PostCard from "@/components/PostCard";
import {IPost} from "@/interfaces/IPost";
import * as process from "process";
import ModalAddPost from "@/components/ModalAddPost";
import {getSixPosts} from "@/api/posts";

const Dashboard = () => {
    let {data, isLoading, refetch} = useQuery(
        ['getSixPosts'],
        () => getSixPosts(),
    )

    console.log(data)

    return (!isLoading &&
        <>
            <BaseLayout title={"Dashboard"}>
                <div
                    className="flex flex-col text-black items-center justify-center px-6 mx-auto md:h-full lg:py-0">
                    <div className={"my-5 text-3xl"}>Bienvenue sur le {process.env.NEXT_PUBLIC_APP_NAME} !</div>
                    <div className={"my-5"}>Voici les 6 derniers articles crées :</div>

                    <div className="grid base:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full mt-5 gap-5 lg:px-20">
                        {
                            data && data.map((post: IPost) => <PostCard key={post._id} initialPost={post}/>)
                        }
                    </div>

                    <div className={"flex flex-col align-center mt-6"}>Peut être voulez vous ajouter un
                        article
                        ? <ModalAddPost/>
                    </div>
                </div>
            </BaseLayout>
        </>
    )
}

export default Dashboard