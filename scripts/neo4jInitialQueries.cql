//Merge initial data 3
MERGE (tournament1:Tournament{_id: apoc.create.uuid(), name:"Squash Tournament", date: date("2021-12-15")})

//This model only has 1 division for ease, there will be 3
MERGE (beginnersDiv:Division{_id: apoc.create.uuid(), name:"Beginner"}) -[:IS_PART_OF]->(tournament1)

//Two pools with 4 players each.
//There are 2 modelling options for halls and matches. Pool 1 has them modelled as seperate nodes, pool 2 has them modelled in the relationship.
//We don't know which would be more practical
MERGE (pool1:Pool{_id: apoc.create.uuid(), name: "Pool 1"})-[:IS_PART_OF]->(beginnersDiv)
MERGE (pool2:Pool{_id: apoc.create.uuid(), name: "Pool 2"})-[:IS_PART_OF]->(beginnersDiv)

MERGE (p1:Player{_id: apoc.create.uuid(), firstName: "Jan",lastName: "Janssen"}) -[:PLAYS_IN]->(pool1)
MERGE (p2:Player{_id: apoc.create.uuid(), firstName: "John",lastName: "Doe"})-[:PLAYS_IN]->(pool1)
MERGE (p3:Player{_id: apoc.create.uuid(), firstName: "Barbra",lastName: "Wakefield"})-[:PLAYS_IN]->(pool1)
MERGE (p4:Player{_id: apoc.create.uuid(), firstName: "Rhett",lastName: "Winter"})-[:PLAYS_IN]->(pool1)

MERGE (hall1:Hall{_id: apoc.create.uuid(), name: "z1"})
MERGE (hall2:Hall{_id: apoc.create.uuid(), name: "z2"})
MERGE (hall3:Hall{_id: apoc.create.uuid(), name: "z3"})

MERGE (p1)-[:PLAYS]-(pm1:PoolMatch{_id: apoc.create.uuid()})-[:PLAYS]-(p2)
MERGE (p1)-[:PLAYS]-(pm2:PoolMatch{_id: apoc.create.uuid()})-[:PLAYS]-(p3)
MERGE (p1)-[:PLAYS]-(pm3:PoolMatch{_id: apoc.create.uuid()})-[:PLAYS]-(p4)

MERGE (p2)-[:PLAYS]-(pm4:PoolMatch{_id: apoc.create.uuid()})-[:PLAYS]-(p3)
MERGE (p2)-[:PLAYS]-(pm5:PoolMatch{_id: apoc.create.uuid()})-[:PLAYS]-(p4)

MERGE (p3)-[:PLAYS]-(pm6:PoolMatch{_id: apoc.create.uuid()})-[:PLAYS]-(p4)

MERGE (pm1)-[:TAKES_PLACE_IN{time: localtime('12:50:00.000')}]-(hall1)
MERGE (pm2)-[:TAKES_PLACE_IN{time: localtime('12:50:00.000')}]-(hall2)
MERGE (pm3)-[:TAKES_PLACE_IN{time: localtime('12:50:00.000')}]-(hall3)
MERGE (pm4)-[:TAKES_PLACE_IN{time: localtime('13:00:00.000')}]-(hall1)
MERGE (pm5)-[:TAKES_PLACE_IN{time: localtime('13:00:00.000')}]-(hall2)
MERGE (pm6)-[:TAKES_PLACE_IN{time: localtime('13:00:00.000')}]-(hall3)

MERGE (p5:Player{_id: apoc.create.uuid(), firstName: "Jasper",lastName: "Abbey"})-[:PLAYS_IN]->(pool2)
MERGE (p6:Player{_id: apoc.create.uuid(), firstName: "Blaine",lastName: "Rennel"})-[:PLAYS_IN]->(pool2)
MERGE (p7:Player{_id: apoc.create.uuid(), firstName: "Norton",lastName: "Swallow"})-[:PLAYS_IN]->(pool2)
MERGE (p8:Player{_id: apoc.create.uuid(), firstName: "Lucie",lastName: "Erikson"})-[:PLAYS_IN]->(pool2)

MERGE (p5)-[:PLAYS]-(pm7:PoolMatch{_id: apoc.create.uuid()})-[:PLAYS]-(p6)
MERGE (p5)-[:PLAYS]-(pm8:PoolMatch{_id: apoc.create.uuid()})-[:PLAYS]-(p7)
MERGE (p5)-[:PLAYS]-(pm9:PoolMatch{_id: apoc.create.uuid()})-[:PLAYS]-(p8)

MERGE (p6)-[:PLAYS]-(pm10:PoolMatch{_id: apoc.create.uuid()})-[:PLAYS]-(p7)
MERGE (p6)-[:PLAYS]-(pm11:PoolMatch{_id: apoc.create.uuid()})-[:PLAYS]-(p8)

MERGE (p7)-[:PLAYS]-(pm12:PoolMatch{_id: apoc.create.uuid()})-[:PLAYS]-(p8)

MERGE (pm7)-[:TAKES_PLACE_IN{time: localtime('14:50:00.000')}]-(hall1)
MERGE (pm8)-[:TAKES_PLACE_IN{time: localtime('14:50:00.000')}]-(hall2)
MERGE (pm9)-[:TAKES_PLACE_IN{time: localtime('14:50:00.000')}]-(hall3)
MERGE (pm10)-[:TAKES_PLACE_IN{time: localtime('15:00:00.000')}]-(hall1)
MERGE (pm11)-[:TAKES_PLACE_IN{time: localtime('15:00:00.000')}]-(hall2)
MERGE (pm12)-[:TAKES_PLACE_IN{time: localtime('15:00:00.000')}]-(hall3)