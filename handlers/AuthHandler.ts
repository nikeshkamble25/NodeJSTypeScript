import { Request, Response } from 'express';
import IRepository from '../contracts/IRepository';
import { IUser } from '../models/User';
import { TYPES } from '../types/types';
import { appContainer } from '../container/container';
export class AuthHandler {
	_repo: IRepository<IUser>;
	constructor() {
		this._repo = appContainer.get<IRepository<IUser>>(TYPES.IRepository);
	}
	handleIndex = (req: Request, res: Response) => {
		this._repo.getAll().then((users)=>{
			res.send(users);
		});		
	};
	handleLogin = async () => {

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
