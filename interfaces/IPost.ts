import {IComment} from "@/interfaces/IComment";

export interface IPost {
    _id?: string;
    title: string;
    content: string;
    image: string;
    likeCount: number;
    owner_id?: string;
    created_at?: string;
    categories: string[];
    comments?: IComment[];
}