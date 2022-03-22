import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable} from 'rxjs'
import { environment } from '../../environments/environment'
import { Division } from '../../../../../libs/models'

@Injectable({
	providedIn: 'root'
})
export class PlayerService {
	baseUrl: string = environment.apiUrl
	headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
	})

	constructor(private http: HttpClient) { }
	getAll(id: any): Observable<Division[]> {
		return this.http.get<Division[]>(`${this.baseUrl}/tournament/${id}/player`, { headers: this.headers }).pipe(
			map((response : any) => {
				console.log(response.result.divisions)
				return response.result.divisions
			})
		)
	}

	createPlayer(id : string, player: any): Observable<any> {
		console.log(player)
		console.log(`${this.baseUrl}/division/${id}/player`)
		return this.http.post<any>(`${this.baseUrl}/division/${id}/player`, player,{ headers: this.headers }).pipe(
			map((response : any) => {
				return response.result
			})
		)
	}

	deletePlayer(id: any): Observable<any> {
		return this.http.delete<any>(`${this.baseUrl}/player/${id}`, { headers: this.headers })
	}

	getById(id: any): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/player/${id}`, { headers: this.headers })
	}

}
