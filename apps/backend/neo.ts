import neo4j = require('neo4j-driver')

async function connect(dbName) {
	this.dbName = dbName
	this.driver = neo4j.driver(
		process.env.NEO4J_URL || 'bolt://localhost:7687',
		neo4j.auth.basic(process.env.NEO4J_USER || 'neo4j', process.env.NEO4J_PASSWORD || 'secret'),
		{ disableLosslessIntegers: true }
	)
	await this.driver.verifyConnectivity()
}

function session() {
	return this.driver.session({
		database: this.dbName,
		defaultAccessMode: neo4j.session.WRITE,
	})
}

const QUERY1 = 'MATCH (:Tournament{_id: "4185774f-19a5-420c-a8a3-b10b946e8ba8"})-[]-(d)-[]-(players:Player)-[]-(pm) RETURN properties(d), properties(players), properties(pm)'
const getAll = 'MATCH (n) WHERE $label IN labels(n) RETURN properties(n)'
const getAll1deep = 'MATCH (n)-[]-(:Division{_id: $id}) WHERE $label IN labels(n) RETURN properties(n)'
const getAllDivision = 'MATCH (n)-[]-(:Tournament{_id: $id}) WHERE $label IN labels(n) RETURN properties(n)'
const getAllPoolMatch = 'MATCH (p1:Player)-[]->(n)-[]->(p2:Player)-[]-(pool:Pool{_id: $id}) WHERE "PoolMatch" IN labels(n) MATCH (player:Player)-[]-(pool:Pool) WITH {_id: n._id, playerOneHasWon: n.playerOneHasWon, player1: properties(p1), player2: properties(p2)} AS PoolMatch,pool,player RETURN {_id: pool._id,players: collect(DISTINCT properties(player)),matches: collect(DISTINCT PoolMatch)}'
const getAllMatchInTournament = 'MATCH (p1:Player)-[]->(n)-[]->(p2:Player)-[*2]-(:Tournament{_id: $id}) WHERE "PoolMatch" IN labels(n) OR "KnockoutMatch" IN labels(n) WITH {_id: n._id, playerOneHasWon: n.playerOneHasWon, player1: properties(p1), player2: properties(p2)} AS Matches RETURN DISTINCT collect(Matches)'
const getAllSetsPoolMatch = 'MATCH (n:Set)-[]-(:PoolMatch{_id: $id}) WHERE $label IN labels(n) RETURN properties(n)'
const getAllSetsKoMatch = 'MATCH (n:Set)-[]-(:KoMatch{_id: $id}) WHERE $label IN labels(n) RETURN properties(n)'
const getAllSetsMatch = 'MATCH (n:Set)-[]-(:{_id: $id}) RETURN properties(n)'
const getOne = 'MATCH (n{_id: $id}) RETURN properties(n)'
const getPlayerCount = 'MATCH (t:Tournament{_id: $tournamentId})-[]-(d:Division)-[]-(p:Player) RETURN COUNT(p)'
const addStart = 'CREATE (e:'
const returnId = ' RETURN e._id'
const deleteById = 'MATCH (e{_id: $id}) DETACH DELETE e' 
//_id: apoc.create.uuid(), 
const matchTournament = 'MATCH (t:Tournament{_id: $id})'
const matchDivision = 'MATCH (d:Division{_id: $id})'
const matchPool = 'MATCH (p:Pool{_id: $id})'
const matchPoolMatch = 'MATCH (m:PoolMatch{_id: $id})'
const matchKoMatch = 'MATCH (m:KoMatch{_id: $id})'
const returnMatch = ' RETURN properties(m)'
const relationPlayerWITHDivision = ')-[:IS_OF_LEVEL]->(d)'
const relationPoolWITHDivision = ')-[:IS_PART_OF]->(d)'
const relationKoMatchWITHDivision = ')-[:IS_PLAYED_IN]->(d)'
const relationPoolMatchWITHPool = ')-[:IS_PLAYED_IN]->(p)'
const relationPlayersWITHMatch = 'MATCH (p1:Player{_id: $player1}) MATCH (p2:Player{_id: $player2}) MERGE (p1)-[:PLAYS]->(e)-[:PLAYS]->(p2)'
const relationSetWITHMatch = ')-[:OF_MATCH]->(m)'
const dropAll = 'MATCH (n) DETACH DELETE n'
// Tournament generation queries
const createPool = 'MATCH (d:Division{_id: $did}) CREATE (pl:Pool{_id: apoc.create.uuid(), poolNr: $poolNr}) MERGE (pl)-[:IS_PART_OF]->(d) RETURN {poolId: pl._id}'
const relationPlayerWITHPool = 'MATCH (p:Player{_id: $pid}) MATCH (pl:Pool{_id: $plid}) MERGE (p)-[:PLAYS_IN]->(pl)'
// MATCH (p:Player{_id: '1103cf60-0601-4735-afce-af504062af98'})
// MATCH (d:Division{_id: '130d96c0-f70b-4b7d-b5b6-43535bdc53c1'})
// MERGE (pl:Pool{poolNr: 1})
// MERGE (p)-[:PLAYS_IN]->(pl)
// MERGE (pl)-[:IS_PART_OF]->(d)
const getMatch = 'MATCH (:Player{_id: $p1id})-[]-(pm:PoolMatch)-[]-(:Player{_id: $p2id}) RETURN {_id: pm._id};'
const relationPlayerWITHMatch = 'MATCH (p1:Player{_id: $p1id}) MATCH (p2:Player{_id: $p2id}) MERGE (p1)-[:PLAYS]->(pm:PoolMatch{_id: apoc.create.uuid()})-[:PLAYS]->(p2) RETURN {_id: pm._id}'
const relationHallWITHMatch = 'MATCH (h:Hall{_id: $hid}) MATCH (m{_id: $mid}) MERGE (h)<-[:TAKES_PLACE_IN]-(m)'
const getDivisionsPoolsMatches = 'MATCH (t:Tournament{_id: $tournamentId})-[]-(d:Division)-[]-(pl:Pool)-[]-(p1:Player)-[]->(pm:PoolMatch)-[]->(p2:Player) WITH {_id: pm._id, player1: properties(p1), player2: properties(p2)} AS PoolMatches, pl,d,t WITH {_id: pl._id, poolNr: pl.poolNr, matches: collect(PoolMatches)} AS Pools, d,t WITH {_id: d._id, name: d.name, pools: collect(Pools)} AS Divisions, t RETURN {_id: t._id, name: t.name, date: t.date, divisions: collect(Divisions)}'
const getPlayersForDivision =  'MATCH (d:Division{_id:$tournamentId})-[]-(p:Player) RETURN collect(properties(p))'
const getPlayersWITHDivisionWITHPlayers = 'MATCH (:Tournament{_id: $tournamentId })-[]-(d:Division)-[]-(p:Player) WITH {_id: p._id, firstName: p.firstName, lastName: p.lastName} AS Players, d WITH {_id: d._id, name: d.name, players: collect(Players)} AS Divisions RETURN {divisions: collect(Divisions)}'
const getPlayersInPool = 'MATCH  (pool:Pool{_id: $id})-[]-(p:Player) RETURN collect(properties(p));'
const getTournament = 'MATCH (t:Tournament{_id: $tournamentId}) RETURN properties(t)'
const getDivisionsInTournament = 'MATCH (d:Division)-[:IS_PART_OF]->(:Tournament{_id: $tournamentId}) RETURN properties(d)'
const getPlayersInDivision = 'MATCH (p:Player)-[:IS_OF_LEVEL]->(:Division{_id: $divisionId}) RETURN properties(p)'
const dequeuePoolMatch0 = 'MATCH (pm:PoolMatch{_id: $id}) MATCH (q:Queue)-[:IS_PART_OF]-(:Tournament{_id:"abc46b39-6f53-4a9d-a69b-295ab5c3f5c7"}) MERGE (q)-[:HEAD]->(pm);'
const dequeuePoolMatch1 = 'MATCH (pm:PoolMatch{_id: $id})-[h:HEAD]-() MATCH (pm)-[prev:PREVIOUS]-() DELETE h,prev;'
const getDivisionsPoolsMatchesWITHPoolPlayers = 'MATCH (t:Tournament{_id: $tournamentId})-[]-(d:Division)-[]-(pl:Pool)-[]-(p1:Player)-[]->(pm:PoolMatch)-[]->(p2:Player) MATCH (pm)-[]-(p:Player) WITH {_id: pm._id, player1: properties(p1), player2: properties(p2)} AS PoolMatches, pl, p, d, t WITH {_id: pl._id, poolNr: pl.poolNr, players: collect(DISTINCT properties(p)), matches: collect(PoolMatches)} AS Pools, d, t WITH {_id: d._id, name: d.name, pools: collect(Pools)} AS Divisions, t RETURN {_id: t._id, name: t.name, date: t.date, divisions: collect(Divisions)}'
const getDivisionsKnockoutMatches = 'MATCH (:Tournament{_id: $tournamentId})-[]-(d:Division)-[]-(pl:Pool)-[]-(p1:Player)-[]->(km:KnockoutMatch)-[]->(p2:Player) WITH {_id: km._id,layer: km.layer,playerOneHasWon: km.playerOneHasWon, player1: properties(p1), player2: properties(p2)} AS KnockoutMatches, pl,d WITH {_id: d._id, name: d.name, knockoutMatches: collect(KnockoutMatches)} AS Divisions RETURN {divisions: collect(Divisions)}'
export {
	neo4j,
	connect,
	session,
	getAll,
	getAll1deep,
	getAllDivision,
	getAllPoolMatch,
	getAllSetsPoolMatch,
	getAllSetsKoMatch,
	getOne,
	getAllSetsMatch,
	getPlayerCount,
	getPlayersForDivision,
	getPlayersWITHDivisionWITHPlayers,
	getPlayersInPool,
	getDivisionsPoolsMatchesWITHPoolPlayers,
	getDivisionsKnockoutMatches,
	getAllMatchInTournament as getAllMatch,
	addStart,
	returnId,
	deleteById,

	matchTournament,
	matchDivision,
	matchPool,
	matchPoolMatch,
	matchKoMatch,
	
	getMatch,
	relationPlayerWITHDivision,
	relationPoolWITHDivision,
	relationKoMatchWITHDivision,
	relationPoolMatchWITHPool,
	relationPlayersWITHMatch,
	relationSetWITHMatch,
	
	dropAll,
	createPool,
	relationPlayerWITHPool,
	relationPlayerWITHMatch,
	relationHallWITHMatch,
	getTournament,
	getDivisionsInTournament,
	getPlayersInDivision,
	dequeuePoolMatch0,
	dequeuePoolMatch1,
	QUERY1,
	getDivisionsPoolsMatches,
	returnMatch
}
