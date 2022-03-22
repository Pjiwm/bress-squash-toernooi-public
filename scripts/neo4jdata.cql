//Unique id constraint
CREATE CONSTRAINT ON (e:Tournament) ASSERT e._id IS UNIQUE;
CREATE CONSTRAINT ON (e:Division) ASSERT e._id IS UNIQUE;
CREATE CONSTRAINT ON (e:Pool) ASSERT e._id IS UNIQUE;
CREATE CONSTRAINT ON (e:Player) ASSERT e._id IS UNIQUE;
CREATE CONSTRAINT ON (e:Hall) ASSERT e._id IS UNIQUE;
CREATE CONSTRAINT ON (e:PoolMatch) ASSERT e._id IS UNIQUE;
CREATE CONSTRAINT ON (e:KnockoutMatch) ASSERT e._id IS UNIQUE;
CREATE CONSTRAINT ON (e:Queue) ASSERT e._id IS UNIQUE;
//Calculate layers where pools is n with (log(n)/log2) + 1
//Tournament creation
MERGE (tournament1:Tournament{name:"Squash Tournament",date: date("2021-12-15"),_id: apoc.create.uuid()})

//This model only has 1 division for ease, there will be 3
MERGE (beginnersDiv:Division{name:"Beginner",_id: apoc.create.uuid()}) -[:IS_PART_OF]->(tournament1)

//Two pools with 4 players each.
//There are 2 modelling options for halls and matches. Pool 1 has them modelled as seperate nodes, pool 2 has them modelled in the relationship.
//We don't know which would be more practical
MERGE (pool1:Pool{name: "Pool 1",_id: apoc.create.uuid()})-[:IS_PART_OF]->(beginnersDiv)
MERGE (pool2:Pool{name: "Pool 2"},_id: apoc.create.uuid())-[:IS_PART_OF]->(beginnersDiv)

MERGE (p1:Player{firstName: "Jan",lastName: "Janssen",_id: apoc.create.uuid()}) -[:PLAYS_IN]->(pool1)
MERGE (p2:Player{firstName: "John",lastName: "Doe",_id: apoc.create.uuid()})-[:PLAYS_IN]->(pool1)
MERGE (p3:Player{firstName: "Barbra",lastName: "Wakefield",_id: apoc.create.uuid()})-[:PLAYS_IN]->(pool1)
MERGE (p4:Player{firstName: "Rhett",lastName: "Winter"})-[:PLAYS_IN]->(pool1)

MERGE (p1) -[:IS_OF_LEVEL]->(beginnersDiv)
MERGE (p2) -[:IS_OF_LEVEL]->(beginnersDiv)
MERGE (p3) -[:IS_OF_LEVEL]->(beginnersDiv)
MERGE (p4) -[:IS_OF_LEVEL]->(beginnersDiv)

MERGE (hall1:Hall{name: "z1"})
MERGE (hall2:Hall{name: "z2"})
MERGE (hall3:Hall{name: "z3"})

MERGE (p1)-[:PLAYS]-(pm1:PoolMatch{})-[:PLAYS]-(p2)
MERGE (p1)-[:PLAYS]-(pm2:PoolMatch{})-[:PLAYS]-(p3)
MERGE (p1)-[:PLAYS]-(pm3:PoolMatch{})-[:PLAYS]-(p4)

MERGE (p2)-[:PLAYS]-(pm4:PoolMatch{})-[:PLAYS]-(p3)
MERGE (p2)-[:PLAYS]-(pm5:PoolMatch{})-[:PLAYS]-(p4)

MERGE (p3)-[:PLAYS]-(pm6:PoolMatch{})-[:PLAYS]-(p4)

MERGE (pm1)-[:HAS]-(s:Set{playerOneScore: 11,playerTwoScore: 13})
MERGE (pm1)-[:HAS]-(s:Set{playerOneScore: 12,playerTwoScore: 10})
MERGE (pm1)-[:HAS]-(s:Set{playerOneScore: 10,playerTwoScore: 12})

MERGE (pm1)-[:TAKES_PLACE_IN]-(hall1)
MERGE (pm2)-[:TAKES_PLACE_IN]-(hall2)
MERGE (pm3)-[:TAKES_PLACE_IN]-(hall3)
MERGE (pm4)-[:TAKES_PLACE_IN]-(hall1)
MERGE (pm5)-[:TAKES_PLACE_IN]-(hall2)
MERGE (pm6)-[:TAKES_PLACE_IN]-(hall3)

MERGE (p5:Player{firstName: "Jasper",lastName: "Abbey"})-[:PLAYS_IN]->(pool2)
MERGE (p6:Player{firstName: "Blaine",lastName: "Rennel"})-[:PLAYS_IN]->(pool2)
MERGE (p7:Player{firstName: "Norton",lastName: "Swallow"})-[:PLAYS_IN]->(pool2)
MERGE (p8:Player{firstName: "Lucie",lastName: "Erikson"})-[:PLAYS_IN]->(pool2)

MERGE (p5) -[:IS_OF_LEVEL]->(beginnersDiv)
MERGE (p6) -[:IS_OF_LEVEL]->(beginnersDiv)
MERGE (p7) -[:IS_OF_LEVEL]->(beginnersDiv)
MERGE (p8) -[:IS_OF_LEVEL]->(beginnersDiv)

MERGE (p5)-[:PLAYS]-(pm7:PoolMatch{})-[:PLAYS]-(p6)
MERGE (p5)-[:PLAYS]-(pm8:PoolMatch{})-[:PLAYS]-(p7)
MERGE (p5)-[:PLAYS]-(pm9:PoolMatch{})-[:PLAYS]-(p8)

MERGE (p6)-[:PLAYS]-(pm10:PoolMatch{})-[:PLAYS]-(p7)
MERGE (p6)-[:PLAYS]-(pm11:PoolMatch{})-[:PLAYS]-(p8)

MERGE (p7)-[:PLAYS]-(pm12:PoolMatch{})-[:PLAYS]-(p8)

MERGE (pm1)-[:HAS]-(s:Set{playerOneScore: 11,playerTwoScore: 13})
MERGE (pm1)-[:HAS]-(s:Set{playerOneScore: 12,playerTwoScore: 10})
MERGE (pm1)-[:HAS]-(s:Set{playerOneScore: 10,playerTwoScore: 12})

MERGE (pm7)-[:TAKES_PLACE_IN]-(hall1)
MERGE (pm8)-[:TAKES_PLACE_IN]-(hall2)
MERGE (pm9)-[:TAKES_PLACE_IN]-(hall3)
MERGE (pm10)-[:TAKES_PLACE_IN]-(hall1)
MERGE (pm11)-[:TAKES_PLACE_IN]-(hall2)
MERGE (pm12)-[:TAKES_PLACE_IN]-(hall3)

//p1 and p5, and p2 and p6 compete in match
MERGE (p1)-[:PLAYS]-(ko1:KnockoutMatch{layer:1})-[:PLAYS]-(p5)
MERGE (p2)-[:PLAYS]-(ko2:KnockoutMatch{layer:1})-[:PLAYS]-(p6)

MERGE (ko1)-[:TAKES_PLACE_IN]-(hall1)
MERGE (ko1)-[:TAKES_PLACE_IN]-(hall2)

//Player 2 and 5 have won, play a final
MERGE (p2)-[:PLAYS]-(final:KnockoutMatch{layer:0})-[:PLAYS]-(p5)
MERGE (final)-[:TAKES_PLACE_IN]-(hall1)
