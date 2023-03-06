import {FunctionComponent, useEffect, useState} from "react";
import {IUser} from "@/interfaces/IUser";
import {getUserById, updateOneUser} from "@/api/users";
import {useRouter} from "next/router";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {authUser} from "@/recoil/user";
import {useFlashMessage} from "@/components/useFlashMessage";

interface IProps {
    user?: IUser;
}

const UserUpdateForm: FunctionComponent<IProps> = ({user}) => {

    const router = useRouter()
    const setAuthUser = useSetRecoilState(authUser)
    const flashMessage = useFlashMessage();
    const [userUpdate, setUserUpdate] = useState()
    const authenticatedUser = useRecoilValue(authUser)

    const updateUser = async (e: any) => {
        console.log('e : ', e)
        e.preventDefault()

        const data = {
            _id: userUpdate?._id,
            email: e.target.email.value,
            password: e.target.password.value,
            firstname: e.target.firstname.value,
            lastname: e.target.lastname.value,
            country: e.target.country.value,
            city: e.target.city.value,
            category: e.target.category.value,
            gender: e.target.gender.value === "Mr" ? "male" : "female",
            birthdate: e.target.birthdate.value,
            phone: e.target.phone.value,
            photo: e.target.photo.value,
            isAdmin: e.target.isAdmin.checked,
        }
        try {
            updateOneUser(data).then((res) => {
                console.log('new auth user : ', res)


                //flash message
                if (res.status === 200) {
                    if (router.query.id && authenticatedUser._id == router.query.id) {
                        setAuthUser(res.data.user)
                    }
                    flashMessage.show('Formulaire soumis avec succès!', "#33FF99");
                } else {
                    flashMessage.show(`${res.response.data.message}`, "#F08080");
                }
            })
        } catch (err) {
            console.log('err : ', err);
            flashMessage.show(`${err.message}`, "red");
        }
    }

    useEffect(() => {
        setUserUpdate(user)
        if (!authenticatedUser?.isAdmin)
            return;

        if (router.query.id && user?._id != router?.query.id) {
            getUserById(router.query.id).then((response) => {
                console.log('response : ', response);
                setUserUpdate(response)
            });
        }
    }, [router]);

    useEffect(() => {
        let timeoutId: number;
        if (flashMessage.isVisible) {
            timeoutId = setTimeout(() => {
                flashMessage.hide();
            }, 5000);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [flashMessage.isVisible, flashMessage.hide]);

    console.log('userUpdate : ', userUpdate)

    return (
        <div className="flex-row w-auto items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
            <div className="block p-6 shadow-lg bg-white">
                <form onSubmit={updateUser} className={"w-96 mx-auto"}>
                    <h1 className="text-xl leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-5"> Modifier
                        un utilisateur </h1>
                    <div className="form-group mb-3">
                        <label htmlFor="lastname" className="form-label inline-block text-gray-700">Nom</label>
                        <input type="text"
                               className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                               id="lastname" placeholder="Nom" defaultValue={userUpdate?.lastname}/>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="firstname" className="form-label inline-block text-gray-700">Prenom</label>
                        <input type="text"
                               className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                               id="firstname" placeholder="Prenom" defaultValue={userUpdate?.firstname}/>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="gender" id={"gender"}
                               className="form-label inline-block text-gray-700 mr-2">Genre</label>
                        <select id={"gender"}
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                            <option selected={userUpdate?.gender === "male" ? true : false}>Mr</option>
                            <option selected={userUpdate?.gender != "male" ? true : false}>Mme</option>
                        </select>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="email" className="form-label inline-block text-gray-700">Email</label>
                        <input type="email"
                               className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                               id="email" placeholder="Email" defaultValue={userUpdate?.email}/>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="password" className="form-label inline-block text-gray-700">Mot de Passe</label>
                        <input type="password"
                               className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                               id="password" placeholder="Mot de Passe"/>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="phone" className="form-label inline-block text-gray-700">Téléphone</label>
                        <input type="phone"
                               className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                               id="phone" placeholder="Téléphone" defaultValue={userUpdate?.phone}/>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="birthdate" className="form-label inline-block text-gray-700">Date
                            d'anniversaire</label>
                        <input type="date"
                               className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                               id="birthdate" placeholder="Date d'anniversaire" defaultValue={userUpdate?.birthdate}/>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="city" className="form-label inline-block text-gray-700">Ville</label>
                        <input type="text"
                               className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                               id="city" placeholder="Ville" defaultValue={userUpdate?.city}/>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="country" className="form-label inline-block text-gray-700">Pays</label>
                        <input type="text"
                               className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                               id="country" placeholder="Pays" defaultValue={userUpdate?.country}/>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="photo" className="form-label inline-block text-gray-700">Lien photo de
                            profile</label>
                        <input type="text"
                               className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                               id="photo" placeholder="Lien photo de profile" defaultValue={userUpdate?.photo}/>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="category" className="form-label inline-block text-gray-700">Category</label>
                        <input type="text"
                               className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                               id="category" placeholder="Category" defaultValue={userUpdate?.category}/>
                    </div>

                    <div className={"flex flex-row justify-center"}>
                        {authenticatedUser?.isAdmin &&
                            <div className="flex-1 form-group form-check mb-3 mx-auto">
                                <label className="form-check-label inline-block text-gray-800" htmlFor="isAdmin">
                                    Admin
                                    <input type="checkbox" defaultChecked={userUpdate?.isAdmin}
                                           className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-500 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                           id="isAdmin"/>
                                </label>
                            </div>
                        }

                        <button type="submit"
                                className="flex-1 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            Envoyer
                        </button>
                    </div>
                    {flashMessage.isVisible && (
                        <div style={flashMessage.isVisible ? {
                            ...styles.flashMessage,
                            backgroundColor: flashMessage.color
                        } : styles.hide}>
                            <p>{flashMessage.message}</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

const styles = {
    flashMessage: {
        position: "fixed",
        top: "80%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "lightgreen",
        padding: "20px",
        borderRadius: "5px",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
        textAlign: "center"
    },
    hide: {
        display: "none"
    }
};

export default UserUpdateForm;
