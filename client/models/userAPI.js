import fetch from 'isomorphic-fetch';

const UserAPI = {};

UserAPI.createUser = (user) =>
  fetch('/api/store/create', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user}),
  })
  .then(data => data.json());

UserAPI.findAllUsers = () =>
	fetch('/api/users/all', {
		method: 'get',
		headers: {
			'Content-Type': 'application/json',
		}
	})
	.then(data => data.json)
	.then(users => users.map(user => ({


	})))

export default UserAPI;