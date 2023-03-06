import axios from "axios";
import {IUser} from "@/interfaces/IUser";

export function getRandomUser() {
    return axios.get(process.env.NEXT_PUBLIC_API_URL + "/randomUser", {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
            "Content-Type": "application/json",
        }
    }).then(res => res.data)
        .catch(err => console.log(err));
}

export function addOneUser(user: IUser) {
   return axios.post(
        process.env.NEXT_PUBLIC_API_URL + '/users',
        user,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
                "Content-Type": "application/json",
            }
        }
    ).then((res) => res)
    .catch((err) => 
            err
        )
}

export function updateOneUser(user: IUser) {
    return axios.post(
        process.env.NEXT_PUBLIC_API_URL + '/updateUser',
        user,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
                "Content-Type": "application/json",
            }
        }).then((res) => res)
        .catch((err) => err)
}

export function getUserById(UserId: string) {
    return axios.get(
        process.env.NEXT_PUBLIC_API_URL + '/users/' + UserId,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
                "Content-Type": "application/json",
            }
        }).then((res) => res.data)
        .catch((err) => console.log('err : ', err))
}


export function deleteOneUser(id: string) {
    axios.delete(process.env.NEXT_PUBLIC_API_URL + '/users/' + id,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
                "Content-Type": "application/json",
            }
        }).then((res) => res.data)
        .catch((err) => console.log('err : ', err))


}