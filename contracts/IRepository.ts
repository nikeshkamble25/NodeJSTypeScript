interface IRepository<T> {
	get(id: number): Promise<T>;
	getObject(object: T): Promise<T>;
	getAll(): Promise<T[]>;
	save(objectValue: T): Promise<T>;
}
export default IRepository;
