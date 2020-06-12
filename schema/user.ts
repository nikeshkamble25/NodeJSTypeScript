import { Schema } from 'mongoose';
export const UserModel = new Schema({
	userId: String,
	userName: String,
});