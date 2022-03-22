import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class PoolMatchService {
	baseUrl: string = environment.apiUrl
	headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
	})

	constructor(private http: HttpClient) { }

	getById(id: any): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/poolmatch/${id}`, { headers: this.headers })
	}
	/**
	 * @description Nested API call, even though Set has its own service, we call it from the PoolMatch
	 * @param sets - the Set we want to store inside a division
	 * @param id - the id of the poolMatch
	 * @returns {Observable} - an observable with a Set object 
	 */
	createSets(sets: any, id: any): Observable<any> {
		return this.http.post<any>(`${this.baseUrl}/poolmatch/${id}/set`, {sets}, { headers: this.headers})
	}
	/**
	 * @description Nested API call, even though Set has its own service, we call it from the PoolMatch
	 * @param id - the id of the poolMatch
	 * @returns {Observable} - an observable with a Set object 
	 */
	getSet(id: any): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/poolmatch/${id}, set`, { headers: this.headers})
	}

}
