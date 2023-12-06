export interface User {
    name: string;
    email: string;
    password: string;
    role: string | null;
    limit: string | number;
}