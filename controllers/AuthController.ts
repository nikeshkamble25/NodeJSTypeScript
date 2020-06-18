import { Application, Request, Response } from 'express';
import IController from '../contracts/IController';
import { AuthHandler } from '../handlers/AuthHandler';
import passport from 'passport';
import { AuthMiddleWares } from '../middlewares/Authenticate';

class AuthController implements IController {
	_authHandler: AuthHandler;
	constructor() {
		this._authHandler = new AuthHandler();
	}
	registerRoutes(app: Application): void {
		app.get('/', this._authHandler.handleIndex);
		app.get(
			'/login',
			passport.authenticate('google', {
				scope: ['profile', 'email'],
			}),
			this._authHandler.handleLogin
		);
		app.get(
			'/auth/response',
			passport.authenticate('google'),
			this._authHandler.handleResponse
		);
		app.get(
			'/currentuser',
			new AuthMiddleWares().ResolveMiddleWare,
			this._authHandler.handleCurrentUser
		);
		app.get('/logout', this._authHandler.handleLogout);
	}
}
export { AuthController };
