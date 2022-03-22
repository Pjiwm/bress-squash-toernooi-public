import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, map } from 'rxjs'
import { environment } from '../../environments/environment'
import { Division } from '../../../../../libs/models'

@Injectable({
	providedIn: 'root'
})
export class DivisionService {
	baseUrl: string = environment.apiUrl
	headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
	})

	constructor(private http: HttpClient) { }
	getAll(): Observable<any[]> {
		return this.http.get<any[]>(`${this.baseUrl}/division`, { headers: this.headers })
	}

	getById(id: any): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/division/${id}`, { headers: this.headers })
	}

	getDivisionsByTournamentId(id: any): Observable<Division[]> {
		return this.http.get<Division[]>(`${this.baseUrl}/tournament/${id}/division`, { headers: this.headers }).pipe(
			map((response : any) => {
				return response.result
			})
		)
	}

	create(division: any): Observable<any> {
		return this.http.post<any>(`${this.baseUrl}/division`, division, { headers: this.headers })
	}

	update(division: any, id: any): Observable<any> {
		return this.http.put<any>(`${this.baseUrl}/division/${id}`, division, { headers: this.headers })
	}

	delete(id:any): Observable<any> {
		return this.http.delete<any>(`${this.baseUrl}/division/${id}`, { headers: this.headers})
	}
	/**
	 * @description Nested API call, even though KoMatch has its own service, we call it from the division
	 * @param koMatch - the koMatch we want to store inside a division
	 * @param id - the id of the division
	 * @returns {Observable} - an observable with a KoMatch object 
	 */
	createKoMatch(koMatch: any, id:any): Observable<any> {
		return this.http.post<any>(`${this.baseUrl}/division/${id}/komatch`, koMatch, { headers: this.headers})
	}
	/**
	 * @description Nested API call, even though KoMatch has its own service, we call it from the division
	 * @param id - the id of the division
	 * @returns {Observable} - an observable with a KoMatch object 
	 */
	getKomatch(id: any): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/division/${id}/komatch`, {headers: this.headers })
	}

	/**
	 * @description Nested API call, even though Player has its own service, we call it from the division
	 * @param player - the player we want to store inside a division
	 * @param id - the id of the division
	 * @returns {Observable} - an observable with a player object 
	 */
	createPlayer(player: any, id: any): Observable<any> {
		return this.http.post<any>(`${this.baseUrl}/division/${id}/player`, player, {headers: this.headers })
	}
	/**
	 * @description Nested API call, even though Player has its own service, we call it from the division
	 * @param id - the id of the division
	 * @returns {Observable} - an observable with a player object 
	 */
	getPlayers(id: any): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/division/${id}/pool`, { headers: this.headers })
	}
	/**
	 * @description Nested API call, even though Pool has its own service, we call it from the division
	 * @param pool - the pool we want to store inside a division
	 * @param id - the id of the division
	 * @returns {Observable} - an observable with a pool object 
	 */
	createPool(id: any, pool: any): Observable<any> {
		return this.http.post<any>(`${this.baseUrl}/division/${id}/pool`, pool, { headers: this.headers })
	}
	/**
	 * @description Nested API call, even though Pool has its own service, we call it from the division
	 * @param id - the id of the division
	 * @returns {Observable} - an observable with a pool object 
	 */
	getPool(id: any): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/division/${id}/pool`, { headers: this.headers })
	}
}
