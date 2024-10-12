export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Item {
    id: number;
    title: string;
    price: number;
    created_at:Date,
    image_link: string;
    seller:number;
}

interface cartBoolItem extends Item {
    checked: boolean;
    quantity:number;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
