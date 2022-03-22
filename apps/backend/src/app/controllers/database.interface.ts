export interface DatabaseInterface {
	label: string

	getAll(req, res, next): Promise<void>,
	getById(req, res, next): Promise<void>,
	create(req, res, next): Promise<void>,
	getAll1deep(req, res, next): Promise<void>,
	create1deep(req, res, next): Promise<void>,
	delete(req, res, next): Promise<void>,
}