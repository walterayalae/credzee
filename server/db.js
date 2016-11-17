const Promise = require('bluebird');

const neo4j = Promise.promisifyAll(require('neo4j'));

const Node = new neo4j.GraphDatabase({ url: process.env.GRAPHENEDB_URL || 'http://neo4j:start@localhost:7474', auth: 'neo4j:password' });
//
const db = module.exports;



db.findAllUsers = () => Node.cypherAsync({
  query: 'MATCH (user:User) RETURN user',
})
.then(response => response.map(e => e.user));


db.createUser = (user) => Node.cypherAsync({
	query: `
    MERGE (user:User {
      name: {name},
      email: {email},
      score: {score},
      description: {description},
      age: {age},
      gender: {gender},
      phone: {phone},
      photo:{photo},
      auth_key: {auth_key}
    })
    RETURN user`,
  params: {
  	name: user.name,
    email: user.email,
    score: user.score,
    description: user.description,
    age: user.age,
    gender:user.gender,
    phone: user.phone,
    photo: user.photo,
    auth_key: user.auth_key,
  },
})
.then(response => response[0].user);
