export interface IPost {
    _id?: string;
    title: string;
    content: string;
    image: string;
    likeCount: number;
    created_at?: string;
    categories: string[];
}