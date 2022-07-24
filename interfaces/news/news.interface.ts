export interface getResponseNewsData {
    id: number;
    title: string;
    slug: string;
    body: string;
    user_id: number;
    newsgroup_id: number;
    active: number;
    created_at: string;
    updated_at: string;
    view_count: number;
    Like_count: number;
    Share_count: number;
    image_id: number;
    tags: string;
    description: string;
    priority?: null;
    expire_date?: null;
}
