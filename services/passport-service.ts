import IService from '../contracts/IService';
import passport from 'passport';
import mongoose from 'mongoose';
import oauth from 'passport-google-oauth';
import IRepository from '../contracts/IRepository';
import { appContainer } from '../container/container';
import { IUser } from '../models/User';
import { TYPES } from '../types/types';

export class PassportService implements IService {
	_repo: IRepository<IUser>;
	constructor() {
		this._repo = appContainer.get<IRepository<IUser>>(TYPES.IRepository);
	}
	private serializeUser = () => {
		passport.serializeUser(({ id }, done) => {
			done(null, id);
		});
	};
	private deserializeUser = () => {
		passport.deserializeUser(async (id: number, done) => {
			var user = await this._repo.get(id);
			if (user) {
				done(null, user);
			}
		});
	};
	private useStrategy = () => {
		passport.use(
			new oauth.OAuth2Strategy(
				{
					clientID:
						'353490325350-23usoqj788j4m6npnsqjun2pgk44s716.apps.googleusercontent.com',
					clientSecret: 'tFvEiMrDGGl1bOGmMT4vlX7w',
					callbackURL: 'http://localhost:8000/auth/response',
				},
				async (token, tokenSecret, profile, done) => {
					if (
						this._repo.getObject({
							userId: parseInt(profile.id),
						})
					) {
						let savedUser = await this._repo.save({
							userName: profile.displayName,
							userId: parseInt(profile.id),
						});
						done(null, savedUser);
					}
				}
			)
		);
	};
	registerService(): void {
		this.serializeUser();
		this.deserializeUser();
		this.useStrategy();
	}
}
