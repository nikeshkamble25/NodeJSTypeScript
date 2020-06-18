import { Request, Response, NextFunction } from 'express';

interface IMiddleWare {
	ResolveMiddleWare(request: Request, response: Response, next: NextFunction): void;
}
export { IMiddleWare };
