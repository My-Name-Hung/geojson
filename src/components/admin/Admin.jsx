import React, { useState, useEffect } from 'react';
import { ClerkProvider, useUser } from '@clerk/clerk-react';
import axios from 'axios';

function Admin() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', firstName: '', lastName: '' });

  useEffect(() => {
    axios.get('/api/users').then(response => setUsers(response.data));
  }, []);

  const addUser = () => {
    axios.post('/api/users', newUser).then(response => {
      setUsers([...users, response.data]);
      setNewUser({ email: '', firstName: '', lastName: '' });
    });
  };

  const deleteUser = (userId) => {
    axios.delete(`/api/users/${userId}`).then(() => {
      setUsers(users.filter(user => user.id !== userId));
    });
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">User Management</h1>
      <div>
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="First Name"
          value={newUser.firstName}
          onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newUser.lastName}
          onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={addUser} className="bg-blue-500 text-white p-2">Add User</button>
      </div>
      <ul className="mt-4">
        {users.map(user => (
          <li key={user.id} className="flex justify-between items-center">
            {user.email} - {user.firstName} {user.lastName}
            <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white p-2">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin