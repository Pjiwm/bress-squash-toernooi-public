export class Tournament{
	_id: string
	name : string
	rooms : number
	startDate : Date
	startTime : string

	constructor(_id = '', name = '', rooms = 0, startDate = new Date, startTime = ''){
		this._id = _id
		this.name = name
		this.rooms = rooms
		this.startDate = startDate
		this.startTime = startTime
	}
}