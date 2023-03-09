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
}

export function like(post_id: string) {
    return axios.post(
        process.env.NEXT_PUBLIC_API_URL + '/like-post/' + post_id,
        [],
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
                "Content-Type": "application/json",
            }
        }
    ).then((res) => res.data)
}

export function upload(post_id: string, file: any) {
    return axios.post(
        process.env.NEXT_PUBLIC_API_URL + '/upload',
        {
            postId: post_id,
            file: file
        },
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
                "Content-Type": "multipart/form-data",
            }
        }
    ).then((res) => res.data)
}

export function updatePost(data: IPost) {
    return axios.post(
        process.env.NEXT_PUBLIC_API_URL + '/updatePost/' + data._id,
        data,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
                "Content-Type": "application/json",
            }
        }
    ).then((res) => res.data)
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
    ).then((res) => res.data.posts)
}

export function deleteOnePost(postID: string) {
    return axios.delete(
        process.env.NEXT_PUBLIC_API_URL + '/posts/' + postID,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
                "Content-Type": "application/json",
            }
        }
    ).then((res) => res.data)
}