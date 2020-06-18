import { Request, Response, NextFunction } from 'express';
import { IMiddleWare } from '../contracts/IMiddleWare';
class LogRequestMiddleWares implements IMiddleWare {
	public ResolveMiddleWare(
		request: Request,
		response: Response,
		next: NextFunction
	): void {
		console.log('log middleware ' + process.pid.toString());
		next();
	}
}
export { LogRequestMiddleWares };
