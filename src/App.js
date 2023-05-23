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
        <div className="flex justify-center items-center h-screen">
            <div className="container mx-auto p-4">
                <div className="flex justify-center">
                    <h2 className="text-2xl font-bold">CRUD with Axios and React</h2>
                </div>
                <div className="flex justify-center mt-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newUserName}
                        onChange={e => setNewUserName(e.target.value)}
                        className="border rounded-l px-4 py-2 outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={newUserEmail}
                        onChange={e => setNewUserEmail(e.target.value)}
                        className="border rounded-r px-4 py-2 outline-none"
                    />
                    <button
                        onClick={createUser}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-4 rounded"
                    >
                        Create
                    </button>
                </div>

                <h1 className="text-3xl font-bold mb-4 text-center">User List</h1>
                <div className="flex flex-col items-center">
                    <table className="table-auto">
                        <thead>
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserList;