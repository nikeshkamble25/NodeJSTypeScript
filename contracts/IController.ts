import { Application } from 'express';
interface IController {
	registerRoutes(app: Application): void;
}
export default IController;
