declare namespace Express {
	export interface Request {
		user: {  login: string, type: string, iat: number }
	}
}
