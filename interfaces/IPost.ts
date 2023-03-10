import {IComment} from "@/interfaces/IComment";
import {ITag} from "@/interfaces/ITag";

export interface IPost {
    _id?: string;
    title: string;
    content: string;
    image?: string;
    like: string[];
    owner_id?: string;
    created_at?: string;
    comments?: IComment[];
    tags?: ITag[] | string[];
}