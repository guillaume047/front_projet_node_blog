import axios from "axios";
import {IComment} from "@/interfaces/IComment";

export function addComment(data: IComment) {
    return axios.post(
        process.env.NEXT_PUBLIC_API_URL + '/comments',
        data,
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