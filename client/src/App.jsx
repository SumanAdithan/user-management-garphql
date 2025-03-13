import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import AddUser from './components/AddUser';

const GET_USERS = gql`
    query GetUsers {
        users {
            id
            name
            email
        }
    }
`;

const App = () => {
    const [users, setUsers] = useState([]);
    const { loading, data, err } = useQuery(GET_USERS);

    useEffect(() => {
        if (data) setUsers(data?.users);
        console.log(users);
    }, [data]);

    return (
        <div className='app'>
            <h1>Add Users</h1>
            <AddUser setUsers={setUsers} />
            <h1>Users</h1>
            {users.length === 0 ? (
                <h1>No Users added yet</h1>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr key={i}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default App;
