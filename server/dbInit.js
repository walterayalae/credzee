const Promise = require('bluebird');

const neo4j = Promise.promisifyAll(require('neo4j'));

const Node = new neo4j.GraphDatabase({ url: process.env.GRAPHENEDB_URL || 'http://neo4j:start@localhost:7474', auth:'neo4j:password' });

const dbInit = module.exports;


dbInit.init = () => Node.cypherAsync({
  query: ` 
  	CREATE (WalterAyala:User {
      name: 'Walter Ayala',
      email: 'walterayalae43@gmail.com',
      score: '700',
      description: 'Like to travel',
      age: '31',
      gender: 'male',
      phone: '512-123-4356',
      photo: 'none',
      auth_key: true
    })
    CREATE (AnaEsnayra:User {
      name: 'Ana Esnayra',
      email: 'anaesnayra@gmail.com',
      score: '600',
      description: 'Like fashion',
      age: '30',
      gender: 'female',
      phone: '512-123-4390',
      photo: 'none',
      auth_key: true
    })
     CREATE (DanielMartinez:User {
      name: 'Daniel Martinez',
      email: 'dmartinez@gmail.com',
      score: '650',
      description: 'Like churros',
      age: '34',
      gender: 'male',
      phone: '512-123-5609',
      photo: 'none',
      auth_key: true
    })

   `
  });

dbInit.clearRelationships = () => Node.cypherAsync({
  query: `
    MATCH ()-[r]-()
    DELETE r`,
});

dbInit.clearNodes = () => Node.cypherAsync({
  query: `
    MATCH (n)
    DELETE n`,
});

dbInit.reset = () => dbInit.clearRelationships()
  .then(() => dbInit.clearNodes())
  .then(() => dbInit.init());