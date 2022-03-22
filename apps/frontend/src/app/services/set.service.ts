import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class SetService {
	baseUrl: string = environment.apiUrl
	headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
	})

	constructor(private http: HttpClient) { }

	getById(id: any): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/set/${id}`, { headers: this.headers })
	}

	// postPoolMatchSet(id: any, sets: any[]): Observable<any> {
	// 	return this.http.post<any>(`${this.baseUrl}/poolmatch/${id}/set`, sets, { headers: this.headers})
	// }

	// postKoMatchSet(id: any, sets: any[]): Observable<any> {
	// 	return this.http.post<any>(`${this.baseUrl}/komatch/${id}/set`, sets, { headers: this.headers})
	// }
}
