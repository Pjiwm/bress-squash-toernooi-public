import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class EmployeeService {
	baseUrl: string = environment.apiUrl
	headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
	})

	constructor(private http: HttpClient) { }
	getAll(): Observable<any[]> {
		return this.http.get<any[]>(`${this.baseUrl}/employee`, { headers: this.headers })
	}

	getById(id: any): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/employee/${id}`, { headers: this.headers })
	}

	create(employee: any): Observable<any> {
		return this.http.post<any>(`${this.baseUrl}/employee`, employee, { headers: this.headers })
	}

	update(employee: any, id: any): Observable<any> {
		return this.http.put<any>(`${this.baseUrl}/employee/${id}`, employee, { headers: this.headers })
	}

	delete(id:any): Observable<any> {
		return this.http.delete<any>(`${this.baseUrl}/employee/${id}`, { headers: this.headers})
	}
}
