import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class HallService {
	baseUrl: string = environment.apiUrl
	headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
	})

	constructor(private http: HttpClient) { }
	getAll(): Observable<any[]> {
		return this.http.get<any[]>(`${this.baseUrl}/hall`, { headers: this.headers })
	}

	getById(id: any): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/hall/${id}`, { headers: this.headers })
	}
}
