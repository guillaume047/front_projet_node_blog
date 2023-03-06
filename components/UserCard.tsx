import {IUser} from "@/interfaces/IUser";
import DateDiff from "date-diff";
import {FunctionComponent} from 'react'
import Image from "next/image";
import {useRouter} from "next/router";
import {deleteOneUser} from "@/api/users";
import {useRecoilValue} from "recoil";
import {authUser} from "@/recoil/user";
import Link from "next/link";

interface IProps {
    user: IUser
}

const UserCard: FunctionComponent<IProps> = ({user}) => {
    const router = useRouter()
    const authenticatedUser = useRecoilValue(authUser)

    const handleDelete = () => {
        deleteOneUser(user._id as string)
        router.reload()
    }

    return (
        <div className="max-w-md py-4 px-8 m-4 bg-white shadow-lg rounded-lg my-16 w-auto">
            <div className="flex justify-start md:justify-start text-red-700 text-xl">{user?.category}</div>

            <div className="flex justify-center md:justify-end -mt-16">
                <img className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
                     src={user?.photo}/>
            </div>

            <div>
                <h2 className="text-gray-800 text-3xl font-semibold">{user?.firstname + " " + user?.lastname +
                    " (" + new DateDiff(new Date(), new Date(user?.birthdate)).years().toFixed() + " ans)"}</h2>
            </div>
            <div
                className="flex justify-start text-sm md:justify-start text-black">{user?.city + ", " + user?.country}</div>

            <div className="flex justify-start md:justify-start mt-4 text-black">
                <Image
                    src={"/email.svg"}
                    height={20}
                    width={20}
                    alt={""}
                    className={"mr-1"}
                />
                <Link href={"mailto:" + user?.email} className={"link"}>
                    {user?.email}
                </Link>
            </div>
            <div className="flex justify-start md:justify-start text-black">
                <Image
                    src={"/phone.svg"}
                    height={20}
                    width={20}
                    alt={""}
                    className={"mr-1"}
                />
                {user?.phone}
            </div>
            <div className="flex justify-start md:justify-start text-black">
                <Image
                    src={"/cake.svg"}
                    height={20}
                    width={20}
                    alt={""}
                    className={"mr-1"}
                />
                {"Anniversaire : " + new Date(user?.birthdate).toDateString()}
            </div>

            {authenticatedUser?.isAdmin &&
                <div className="flex justify-start md:justify-start text-black mt-2">
                    <button onClick={handleDelete}
                            className={"flex-col w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"}>
                        Supprimer
                    </button>

                    <button onClick={() => router.push(`/users/${user._id}`)}
                            className={"flex-col mx-3 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"}>
                        Editer
                    </button>
                </div>
            }
        </div>
    )
};

export default UserCard;