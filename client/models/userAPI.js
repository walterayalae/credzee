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


export default UserAPI;