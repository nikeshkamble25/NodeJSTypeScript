import express, { RequestHandler } from 'express';
import { Application } from 'express';
import IController from './contracts/IController';
import IService from './contracts/IService';
export class App {
	private _app!: Application;
	private _port!: number;
	constructor(appInit: {
		port: number;
		middleWares: RequestHandler[];
		controllers: IController[];
		services: IService[];
	}) {
		this._app = express();
		this._port = appInit.port;
		this.RegisterMiddleWares(appInit.middleWares);
		this.RegisterControllers(appInit.controllers);
		this.RegisterServices(appInit.services);
	}
	private RegisterControllers(controllers: IController[]) {
		controllers.forEach((routes) => {
			routes.registerRoutes(this._app);
		});
	}
	private RegisterServices(services: IService[]) {
		services.forEach((service) => {
			service.registerService();
		});
	}
	private RegisterMiddleWares(middleWares: RequestHandler[]) {
		middleWares.forEach((middleware) => {
			this._app.use(middleware);
		});
	}
	public start() {
		this._app.listen(this._port, () => {
			console.log('App listing to port');
		});
	}
}
