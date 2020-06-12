import { Request, Response } from 'express';
import { AuthRepository } from '../repository/AuthRepository';
import IRepository from '../contracts/IRepository';
import { IUser } from '../models/User';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types/types';
import { appContainer } from '../container/container';

@injectable()
export class AuthHandler {
	_repo: IRepository<IUser>;
	constructor() {
		this._repo = appContainer.get<IRepository<IUser>>(TYPES.IRepository);
	}
	handleIndex = async (req: Request, res: Response) => {
		let users = await this._repo.getAll();
		res.send(users);
	};
	handleLogin = async (req: Request, res: Response) => {
	};
	handleResponse = async (req: Request, res: Response) => {
		res.redirect('/currentuser');
	};
	handleCurrentUser = async (req: Request, res: Response) => {
		res.send(req.user);
	};
	handleLogout = async (req: Request, res: Response) => {
		req.logout();
		res.send(req.user);
	};
}
