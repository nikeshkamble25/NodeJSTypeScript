import 'reflect-metadata';
import { Container } from 'inversify';
import { IDBContext } from '../contracts/IDBContext';
import { TYPES } from '../types/types';
import { MongoDBContext } from '../db/MongoDBContext';
import { Mongoose } from 'mongoose';
import IRepository from '../contracts/IRepository';
import { IUser } from '../models/User';
import { AuthRepository } from '../repository/AuthRepository';
import { PassportService } from '../services/passport-service';
import IService from '../contracts/IService';

const appContainer = new Container();
appContainer.bind<IDBContext<Mongoose>>(TYPES.IDBContext).to(MongoDBContext).inSingletonScope();
appContainer.bind<IRepository<IUser>>(TYPES.IRepository).to(AuthRepository);
appContainer.bind<IService>(TYPES.IService).to(PassportService);
export { appContainer };