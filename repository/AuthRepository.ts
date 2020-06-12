import IRepository from '../contracts/IRepository';
import { IUser } from '../models/User';
import { IDBContext } from '../contracts/IDBContext';
import { Mongoose, Model } from 'mongoose';
import _ from 'lodash';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types/types';
import { IUserDoc } from '../db/IUserDoc';

@injectable()
export class AuthRepository implements IRepository<IUser> {
	private _dbContext!: IDBContext<Mongoose>;
	private User: Model<IUserDoc>;
	constructor(@inject(TYPES.IDBContext) dbContext: IDBContext<Mongoose>) {
		this._dbContext = dbContext;
		this.User = this._dbContext.getDBContext().model<IUserDoc>('User');
	}
	async getObject(object: IUser): Promise<IUser> {
		let userObject = await this.User.findOne({
			userId:object.userId
		});
		let userModel: IUser = {
			userId: userObject?.userId,
			userName: userObject?.userName,
		};
		return userModel;
	}
	async save(objectValue: IUser): Promise<IUser> {
		let returnUser = await new this.User({
			userId: objectValue.userId,
			userName: objectValue.userName,
		}).save();
		return returnUser;
	}
	async get(id: number): Promise<IUser> {
		let userObject = await this.User.findById(id);
		let userModel: IUser = {
			userId: userObject?.userId,
			userName: userObject?.userName,
		};
		return userModel;
	}
	async getAll(): Promise<IUser[]> {
		let lstUsers: IUser[] = [];
		let userList = await this._dbContext
			.getDBContext()
			.model<IUserDoc>('User')
			.find({});
		_.forEach(userList, function (userObject) {
			let userModel: IUser = {
				userId: userObject.userId,
				userName: userObject.userName,
			};
			lstUsers.push(userModel);
		});
		return lstUsers;
	}
}
