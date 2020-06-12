import { injectable } from 'inversify';
import { IDBContext } from '../contracts/IDBContext';
import { Mongoose, Model } from 'mongoose';
import { UserModel } from '../schema/user';
import _ from 'lodash';
import { IUserDoc } from './IUserDoc';

@injectable()
class MongoDBContext implements IDBContext<Mongoose> {
	constructor() {
		this.mongoose = new Mongoose();
	}
	getDBContext(): typeof import('mongoose') {
		return this.mongoose;
	}
	registerSchemas(): void {
		this.mongoose.model<IUserDoc>('User', UserModel);
	}
	mongoose!: Mongoose;
	connect(): void {
		this.mongoose.model<IUserDoc>('User', UserModel);
		this.mongoose.connect(
			'mongodb+srv://nikesh:nikesh@cluster0-icocy.azure.mongodb.net/node-tutorial?retryWrites=true&w=majority',
			{ useNewUrlParser: true, useUnifiedTopology: true }
		).then(()=>{
			console.log('Connection to database success');
		});
		
	}
	disconnect(): void {
		this.mongoose.disconnect();
	}
	dispose(): void {
		throw new Error('Method not implemented.');
	}
}
export { MongoDBContext };
