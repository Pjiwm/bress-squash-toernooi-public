import { Tournament, Player, Division } from '../../../../../../libs/models'
const testPlayersExpert: Player[] = [
	{ firstName: 'John', lastName: 'Smith', _id: '0', totalScoredPoints: 0, matchPoints: 0, setPoints: 0},
	{ firstName: 'Joe', lastName: 'Ma', _id: '1', totalScoredPoints: 0, matchPoints: 0, setPoints: 0},
	{ firstName: 'Gordon', lastName: 'Ramsey', _id: '2', totalScoredPoints: 0, matchPoints: 0, setPoints: 0},
	{ firstName: 'Nigel', lastName: 'Farage', _id: '3', totalScoredPoints: 0, matchPoints: 0, setPoints: 0}
]
const testPlayersBeginner: Player[] = [
	{ firstName: 'Johny', lastName: 'Depp', _id: '4', totalScoredPoints: 0, matchPoints: 0, setPoints: 0},
	{ firstName: 'Hugh', lastName: 'Laurie', _id: '5', totalScoredPoints: 0, matchPoints: 0, setPoints: 0},
	{ firstName: 'Toby', lastName: 'Maguire', _id: '6', totalScoredPoints: 0, matchPoints: 0, setPoints: 0},
	{ firstName: 'Tom', lastName: 'Holland', _id: '7', totalScoredPoints: 0, matchPoints: 0, setPoints: 0}
]
const testDivisions: Division[] = [
	{_id: '0', name: 'expert', players: testPlayersExpert},
	{_id: '0', name: 'beginner', players: testPlayersBeginner}

]
const testTournaments: Tournament[] = [
	{_id: '0', name: 'winter-tournament', date: new Date(), divisions: testDivisions},
	{_id: '1', name: 'summer-tournament', date: new Date(), divisions: testDivisions}
]

export {testTournaments, testDivisions, testPlayersBeginner, testPlayersExpert} 