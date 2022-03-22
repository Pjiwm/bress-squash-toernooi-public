//Link players to division
MATCH (p:Player)
MATCH (d:Division{name: "Beginner"})
MERGE (p)-[:IS_OF_LEVEL]->(d)