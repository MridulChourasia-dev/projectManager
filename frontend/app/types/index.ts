import type { Key } from "react";

export interface User {
    _id: string;
    email: string;
    name: string;
    createdAt: Date
    isEmailVerified: boolean;
    updatedAt: Date
    profilePicture?: string;
}


export interface Workspace {
    _id: string;
    name: string;
    description?: string;
    owner: User | string;
    color: string;
    members: {
        user: User | string;
        role: "admin" | "member" | "viewer" | "owner";
        joinedAt: string;
    }[]
    createdAt: Date;
    updatedAt: Date;
}