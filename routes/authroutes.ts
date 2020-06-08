import { Express } from 'express';
export class AuthRoutes {
	_app!: Express;
	constructor(app: Express) {
		this._app = app;
	}
	private HelloWorldRoute(): void {
        this._app.get()
		this._app.get('/', (req, res) => {
			res.send('Hi there');
		});
	}
	public RegisterRoutes(): void {
        this.HelloWorldRoute();
    }
}
