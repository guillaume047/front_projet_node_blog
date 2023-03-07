import BaseLayout from "@/components/BaseLayout";
import {useQuery} from "react-query";
import {getRandomUser} from "@/api/users";
import PostCard from "@/components/PostCard";
import {IPost} from "@/interfaces/IPost";
import * as process from "process";

const Dashboard = () => {
    let {data, isLoading, refetch} = useQuery(
        ['randomUser'],
        () => getRandomUser(),
    )

    data = [
        {
            _id: "1",
            title: "Hello",
            image: "https://cms-cdn.placeholder.co/Home_page1_76f0b1d7ab.png?width=1920",
            content: "Loreum ipsum dolor sit amet consectetur adipisicing elit. Accusamus, quod.",
            likeCount: 24,
            created_at: "2021-01-18T15:00:00.000Z",
        },
        {
            _id: "2",
            title: "Hello",
            image: "https://cms-cdn.placeholder.co/Home_page1_76f0b1d7ab.png?width=1920",
            content: "Loreum ipsum dolor sit amet consectetur adipisicing elit. Accusamus, quod.",
            likeCount: 24,
            created_at: "2021-01-18T15:00:00.000Z",
        },
        {
            _id: "3",
            title: "Hello",
            image: "https://cms-cdn.placeholder.co/Home_page1_76f0b1d7ab.png?width=1920",
            content: "Loreum ipsum dolor sit amet consectetur adipisicing elit. Accusamus, quod.",
            likeCount: 24,
            created_at: "2021-01-18T15:00:00.000Z",
        },
        {
            _id: "4",
            title: "Hello",
            image: "https://cms-cdn.placeholder.co/Home_page1_76f0b1d7ab.png?width=1920",
            content: "Loreum ipsum dolor sit amet consectetur adipisicing elit. Accusamus, quod.",
            likeCount: 24,
            created_at: "2021-01-18T15:00:00.000Z",
        },
    ]

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
                </div>
            </BaseLayout>
        </>
    )
}

export default Dashboard