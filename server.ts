import cluster from 'cluster';
import { App } from './app';
import { AuthController } from './controllers/AuthController';
import cookieSession from 'cookie-session';
import passport from 'passport';
import { appContainer } from './container/container';
import { TYPES } from './types/types';
import { IDBContext } from './contracts/IDBContext';
import { Mongoose } from 'mongoose';
import _ from 'lodash';
import { PassportService } from './services/passport-service';
import * as os from 'os';
import { LogRequestMiddleWares } from './middlewares/LogRequests';

if (cluster.isMaster) {
	for (let index = 0; index < 2; index++) {
		cluster.fork();
	}
	cluster.on('exit', (worker) => {
		console.log(`worker ${worker.process.pid} stopped working`);
		cluster.fork();
	});
	cluster.on('fork', (worker) => {
		console.log(`Worker ${worker.process.pid} started`);
	});
} else {
	//Declare variables
	//Context and application object
	const context = appContainer.get<IDBContext<Mongoose>>(TYPES.IDBContext);
	context.registerSchemas();
	context.connect();
	const application = new App({
		port: 8000,
		controllers: [new AuthController()],
		middleWares: [
			cookieSession({
				maxAge: 5000 * 1000,
				keys: ['32143243ade4324324'],
			}),
			passport.initialize(),
			passport.session(),
			// new LogRequestMiddleWares().ResolveMiddleWare,
		],
		services: [new PassportService()],
	});
	application.start();
}
