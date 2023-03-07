import axios from "axios";
import {IPost} from "@/interfaces/IPost";

export function addPost(data: IPost) {
    return axios.post(
        process.env.NEXT_PUBLIC_API_URL + '/posts/add',
        data,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
                "Content-Type": "application/json",
            }
        }
    ).then((res) => res.data)
        .catch((err) =>
            err
        )
}

export function getSixPosts() {
    return axios.get(
        process.env.NEXT_PUBLIC_API_URL + '/posts-6',
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
                "Content-Type": "application/json",
            }
        }
    ).then((res) => res.data)
        .catch((err) =>
            err
        )
}