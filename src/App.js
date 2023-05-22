import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
    const [users, setUsers] = useState([]);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');

    // Fetch the list of users from the API
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    // Create a new user
    const createUser = () => {
        const newUser = {
            name: newUserName,
            email: newUserEmail
        };

        axios.post('https://jsonplaceholder.typicode.com/users', newUser)
            .then(response => {
                setUsers([...users, response.data]);
                setNewUserName('');
                setNewUserEmail('');
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    };

    return (
        <div className="crud">
            <h1 className="h1">User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>

            <h2>Add New User</h2>
            <input
                type="text"
                placeholder="Name"
                value={newUserName}
                onChange={e => setNewUserName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Email"
                value={newUserEmail}
                onChange={e => setNewUserEmail(e.target.value)}
            />
            <button onClick={createUser}>Add User</button>
        </div>
    );
}

export default UserList;
