export interface Mail {
    _id: string;
    body: string;
    createdAt: string;
    from: User;
    read: boolean;
    showReceiver: boolean;
    showSender: boolean;
    subject: string;
    to: User;
}

export interface User {
    _id: string
    name: string;
    email: string;
    gender?: string;
    role: string;
}