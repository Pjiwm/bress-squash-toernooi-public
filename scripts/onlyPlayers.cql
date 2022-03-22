MERGE (tournament1:Tournament{name:"Squash Tournament",date: date("2021-12-15")})

//This model only has 1 division for ease, there will be 3
MERGE (beginnersDiv:Division{name:"Beginner"}) -[:IS_PART_OF]->(tournament1)

MERGE (p1:Player{firstName: "Jan",lastName: "Janssen",matchPoints: 0,setPoints: 0,totalScoredPoints: 0})
MERGE (p2:Player{firstName: "John",lastName: "Doe",matchPoints: 0,setPoints: 0,totalScoredPoints: 0})
MERGE (p3:Player{firstName: "Barbra",lastName: "Wakefield",matchPoints: 0,setPoints: 0,totalScoredPoints: 0})
MERGE (p4:Player{firstName: "Rhett",lastName: "Winter",matchPoints: 0,setPoints: 0,totalScoredPoints: 0})

MERGE (p1) -[:IS_OF_LEVEL]->(beginnersDiv)
MERGE (p2) -[:IS_OF_LEVEL]->(beginnersDiv)
MERGE (p3) -[:IS_OF_LEVEL]->(beginnersDiv)
MERGE (p4) -[:IS_OF_LEVEL]->(beginnersDiv)

MERGE (p5:Player{firstName: "Jasper",lastName: "Abbey",matchPoints: 0,setPoints: 0,totalScoredPoints: 0})
MERGE (p6:Player{firstName: "Blaine",lastName: "Rennel",matchPoints: 0,setPoints: 0,totalScoredPoints: 0})
MERGE (p7:Player{firstName: "Norton",lastName: "Swallow",matchPoints: 0,setPoints: 0,totalScoredPoints: 0})
MERGE (p8:Player{firstName: "Lucie",lastName: "Erikson",matchPoints: 0,setPoints: 0,totalScoredPoints: 0})

MERGE (p5) -[:IS_OF_LEVEL]->(beginnersDiv)
MERGE (p6) -[:IS_OF_LEVEL]->(beginnersDiv)
MERGE (p7) -[:IS_OF_LEVEL]->(beginnersDiv)
MERGE (p8) -[:IS_OF_LEVEL]->(beginnersDiv)
