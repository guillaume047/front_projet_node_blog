import {useEffect, useState} from "react";
import {IUser} from "@/interfaces/IUser";
import * as process from "process";
import axios from "axios";
import UserCard from "@/components/UserCard";
import BaseLayout from "@/components/BaseLayout";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [newUsers, setNewUsers] = useState([]);
    const [searchBy, setSearchBy] = useState("firstname");
    const [categories, setCategories] = useState(new Set());
    const [categoryAcitve, setCategory] = useState("Toutes les catégories");

    let newFilterUsers = [];

    const setSearchUser = (searchBy: string) => {
        console.log(searchBy)
        setSearchBy(searchBy)

    };

    const setSearchCategoryUsers = async (category: string) => {
        setCategory(category)
        if (category != "Toutes les catégories") {

            if (category != "Toutes les catégories") {

                newFilterUsers = newUsers.filter((user: IUser) => {
                    return user.category === category
                })
                setUsers(newFilterUsers)
            }
        } else {
            await getUsers()
        }
    };

    const getAllCategories = () => {
        const cat = new Set(newUsers.map((user: IUser) => {
            return user.category
        }))

        setCategories(cat)
        console.log(categories)
    }

    const setSearchNameUsers = async (searchTerm: string) => {
        if (categoryAcitve === "Toutes les catégories") {
            const Newusers = newUsers.filter((user) => {
                // @ts-ignore
                return user[`${searchBy}`].toLowerCase().includes(searchTerm.toLowerCase());
            });
            setUsers(Newusers)
        } else {
            const newFilterUsers = newUsers.filter((user: IUser) => {
                return user.category === categoryAcitve
            })
            const Newusers = newFilterUsers.filter((user) => {
                // @ts-ignore
                return user[`${searchBy}`].toLowerCase().includes(searchTerm.toLowerCase());
            });
            setUsers(Newusers)
        }
    };


    const getUsers = async () => {
        const instance = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
            }
        });


        await instance.get(
            process.env.NEXT_PUBLIC_API_URL + '/users',
        )
            .then((res) => {
                setNewUsers(
                    res.data
                )
                setUsers(res.data);
                return res.data
            })
            .catch((err) => {
                console.log(err)
            });
    }

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        getAllCategories()
    }, [users]);

    const [name, setName] = useState("");
    return (
        <BaseLayout title={"Users"}>
            <div className="flex flex-col text-black items-center px-6 py-8 mx-auto md:h-full lg:py-0">
                <h1 className="text-3xl font-medium">Liste des collaborateurs</h1>
                <div className="flex items-center px-4 py-3 bg-white border-b border-gray-200 rounded">
                    <input
                        className="flex-1 px-4 py-2 mr-4 rounded-lg border border-gray-400 bg-white"
                        type="text"
                        placeholder="Rechercher par nom..."
                        onChange={e => setSearchNameUsers(e.target.value)}
                    />
                    <select
                        className="px-4 py-2 mr-4 rounded-lg border border-gray-400 bg-white"
                        onChange={e => setSearchUser(e.target.value)}
                    >

                        <option>firstname</option>
                        <option>city</option>


                    </select>
                    <select
                        className="px-4 py-2 rounded-lg border border-gray-400 bg-white"
                        onChange={e => setSearchCategoryUsers(e.target.value)}
                    >
                        <option selected={true}>Toutes les catégories</option>
                        {Array.from(categories).map((category, index) => {
                            return <option key={index}>{category}</option>
                        })}
                    </select>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex flex-wrap justify-center">
                        {users.map((user: IUser) => (
                            <UserCard key={user._id} user={user}/>
                        ))}
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
};


export default UserList