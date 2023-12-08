import { comment } from "../comments/comments.model";

export interface Issue {
    index: number,
    status: string,
    description: string,
    name: string,
    tags?: Array<string>,
    createdON: string,
    upvotes: number,
    selectedTags?: Array<string>,
    searchTag?: string,
    finalTag?: string,
    comments: Array<comment>;
}