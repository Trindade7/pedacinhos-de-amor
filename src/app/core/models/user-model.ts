export interface UserModel {
    id: string;
    name: string;
    email: string;
    isVerified?: boolean;
    phoneNumber?: string;
    photoUrl?: string;
}

// export interface UserContentModel {
//     basket: Observable<any>;
//     orders: Observable<any>;
//     preferences?: Observable<any>;
// }