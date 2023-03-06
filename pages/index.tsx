import BaseLayout from "@/components/BaseLayout";
import UserCard from "@/components/UserCard";
import {useQuery} from "react-query";
import {getRandomUser} from "@/api/users";

const Dashboard = () => {
    const {data, isLoading, refetch} = useQuery(
        ['randomUser'],
        () => getRandomUser(),
    )

    return (!isLoading &&
        <>
            <BaseLayout title={"Dashboard"}>
                <div
                    className="flex flex-col text-black items-center justify-center px-6 mx-auto md:h-full lg:py-0">
                    <div className={"my-5 text-3xl"}>Bienvenue sur l'Intranet !</div>
                    <div className={"my-5"}>La plateforme qui vous permet de retrouver tout vo collaborateurs !</div>
                    <div
                        className="flex flex-col text-xl items-center justify-center w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                        Avez-vous dit bonjour à :
                    </div>
                    <UserCard user={data}/>

                    <div className="flex-1 space-x-2 justify-center">
                        <button type="button" onClick={() => refetch()}
                                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            Dire Bonjour au hasard
                        </button>
                    </div>
                </div>
            </BaseLayout>
        </>
    )
}

export default Dashboard