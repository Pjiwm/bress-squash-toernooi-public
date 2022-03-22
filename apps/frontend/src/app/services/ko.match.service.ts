import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class KoMatchService {
	baseUrl: string = environment.apiUrl
	headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
	})

	constructor(private http: HttpClient) { }

	getById(id: any): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/komatch/${id}`, { headers: this.headers })
	}

	/**
	 * @description Nested API call, even though set has its own service, we call it from the pool
	 * @param sets - the set we want to store inside a division
	 * @param id - the id of the pool
	 * @returns {Observable} - an observable with a set object 
	 */
	createSet(id: any, sets: any): Observable<any> {
		return this.http.post<any>(`${this.baseUrl}/komatch/${id}/set`, {sets}, { headers: this.headers })
	}
	/**
	 * @description Nested API call, even though set has its own service, we call it from the pool
	 * @param id - the id of the pool
	 * @returns {Observable} - an observable with a set object 
	 */
	getPoolMatch(id: any): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/komatch/${id}/set`, { headers: this.headers })
	}
}
