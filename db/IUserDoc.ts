import mongoose from "mongoose";
import { IUser } from "../models/User";
export interface IUserDoc extends mongoose.Document,IUser {
}