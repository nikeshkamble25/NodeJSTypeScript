import { Request, Response, NextFunction } from 'express';
import { IMiddleWare } from '../contracts/IMiddleWare';

class AuthMiddleWares implements IMiddleWare {
	ResolveMiddleWare(
		request: Request,
		response: Response,
		next: NextFunction
	): void {
		if (request.user) next();
		response.statusCode = 401;
		response.send('Invalid User');
	}
}
export { AuthMiddleWares };
