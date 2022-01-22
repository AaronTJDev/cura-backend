import { Ingredient } from "./ingredient"

export type Account = {
  id: number;
  email: string;
  username: string;
  password: string;
  firstName: string;
  imageUri: string;
  createdAt: Date;
  updatedAt: Date;
}