import { ROLE_ENUM } from "src/enums/role.enum";

export interface IUser{
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    phone_number?: string;
    adress?: string;
    profile_image?: string;
    nickname?: string;
    role_ENUM: ROLE_ENUM;
}

export interface ILogin {
    email: string;
    password: string;
  }
  