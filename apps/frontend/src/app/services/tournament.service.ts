import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable} from 'rxjs'
import { environment } from '../../environments/environment'
import { Match, Tournament } from '../../../../../libs/models'
// import * as moment from 'moment'

@Injectable({
	providedIn: 'root'
})
export class TournamentService {
	baseUrl: string = environment.apiUrl
	headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
	})

	constructor(private http: HttpClient) { }
	getAll(): Observable<Tournament[]> {
		return this.http.get<Tournament[]>(`${this.baseUrl}/tournament`, { headers: this.headers }).pipe(
			map((response : any) => {
				return response.result
			}),
			map((result : Tournament[]) => {
				//array.map /= pipe(map())
				result.forEach((value : any) => {
					value.date = new Date(value.date)
					return value
				})
				return result
			}),
		)
	}

	generatePools(id: any): Observable<any> {
		console.log(this.headers)
		console.log(`${this.baseUrl}/tournament/${id}/poolgeneration`)
		return this.http.post<any>(`${this.baseUrl}/tournament/${id}/poolgeneration`, {} , { headers: this.headers }).pipe(
			map((response : any) => {
				console.log(response.result)
				return response.result
			})
		)
	}

	getById(id: any): Observable<Tournament> {
		return this.http.get<Tournament>(`${this.baseUrl}/tournament/${id}`, { headers: this.headers }).pipe(
			map((response : any) => {
				console.log(response.result)
				return response.result
			}),
			map((response : Tournament) => {
				return response
			})
		)
	}

	getPlayerCount(id: any): Observable<number> {
		return this.http.get<number>(`${this.baseUrl}/tournament/${id}/player/count`, { headers: this.headers }).pipe(
			map((response : any) => {
				return response.result
			})
		)
	}
	
	getMatches(id: any): Observable<Match[]> {
		return this.http.get<Match[]>(`${this.baseUrl}/tournament/${id}/match`, { headers: this.headers }).pipe(
			map((response : any) => {
				return response.result
			})
		)
	}

	create(division: any): Observable<any> {
		return this.http.post<any>(`${this.baseUrl}/tournament`, division, { headers: this.headers }).pipe(
			map((response : any) => {
				return response.result
			})
		)
	}

	update(tournament: any, id:any): Observable<any> {
		return this.http.put<any>(`${this.baseUrl}/tournament/${id}`, tournament, { headers: this.headers }).pipe(
			map((response : Tournament) => {
				return response
			})
		)
	}
}