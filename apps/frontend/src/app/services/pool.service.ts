import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class PoolService {
	baseUrl: string = environment.apiUrl
	headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
	})

	constructor(private http: HttpClient) { }
	getAll(): Observable<any[]> {
		return this.http.get<any[]>(`${this.baseUrl}/pool`, { headers: this.headers }).pipe(
			map((response : any) => {
				return response.result
			}),
		)
	}

	getById(id: any): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/pool/${id}`, { headers: this.headers }).pipe(
			map((response : any) => {
				return response.result
			}),
		)
	}
	getByIdWithPoolmatches(id: any): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/pool/${id}/poolMatch`, { headers: this.headers }).pipe(
			map((response : any) => {
				return response.result
			}),
			map((response : any) => {
				return response[0]
			}),
		)
	}

	create(pool: any): Observable<any> {
		return this.http.post<any>(`${this.baseUrl}/pool`, pool, { headers: this.headers })
	}

	update(pool: any, id: any): Observable<any> {
		return this.http.put<any>(`${this.baseUrl}/pool/${id}`, pool, { headers: this.headers })
	}

	delete(id:any): Observable<any> {
		return this.http.delete<any>(`${this.baseUrl}/pool/${id}`, { headers: this.headers})
	}

	/**
	 * @description Nested API call, even though poolmatch has its own service, we call it from the pool
	 * @param poolMatch - the poolMatch we want to store inside a division
	 * @param id - the id of the pool
	 * @returns {Observable} - an observable with a poolMatch object 
	 */
	createPoolMatch(id: any, poolMatch: any): Observable<any> {
		return this.http.post<any>(`${this.baseUrl}/pool/${id}/poolmatch`, poolMatch, { headers: this.headers })
	}
	/**
	 * @description Nested API call, even though poolmatch has its own service, we call it from the pool
	 * @param id - the id of the pool
	 * @returns {Observable} - an observable with a poolMatch object 
	 */
	getPoolMatch(id: any): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/pool/${id}/poolmatch`, { headers: this.headers })
	}
}
