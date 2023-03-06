import {useEffect, useState} from "react";

import {useRouter} from "next/router";
import * as process from "process";
import axios from "axios";
import {useSetRecoilState} from "recoil";
import {authUser} from "@/recoil/user";
import {useFlashMessage} from "@/components/useFlashMessage";


const LoginForm = () => {
    const [error, setError] = useState<string | undefined>(undefined)
    const flashMessage = useFlashMessage();

    const router = useRouter()
    const setAuthUser = useSetRecoilState(authUser)
    const login = async (email: string, password: string) => {
        setError(undefined)

        return axios.post(
            process.env.NEXT_PUBLIC_API_URL + '/login',
            {email, password}
        )
            .then((res) => res.data)
            .then((res) => {
                // Set the access token in the local storage
                setAuthUser(res.user)
                localStorage.setItem('ACCESS_TOKEN', res.token)
            })
            .then(() => router.push('/'))
            .catch((err) => {
                console.log('err : ', err)
                flashMessage.show(`${err.response.data.message}`, "red");

            })
    }

    const handleLogin = (e: any) => {
        e.preventDefault()
        login(e.target.email.value, e.target.password.value)
    }
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
    return (
        <>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Connexion
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="Email" required
                                />
                            </div>

                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot
                                    de passe</label>
                                <input type="password" name="password" id="password" placeholder="Mot de passe"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required/>
                            </div>

                            <button type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Connexion
                            </button>
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
            </div>
        </>
    )
}

const styles = {
    flashMessage: {
        position: "fixed",
        top: "0%",
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

export default LoginForm