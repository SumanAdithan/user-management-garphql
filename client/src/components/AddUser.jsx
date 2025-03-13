import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_USER = gql`
    mutation AddUser($id: Int!, $name: String!, $email: String!) {
        addUser(input: { id: $id, name: $name, email: $email }) {
            id
            name
            email
        }
    }
`;

const AddUser = ({ setUsers }) => {
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
    });

    const [addUser, { loading, data, error }] = useMutation(ADD_USER);

    useEffect(() => {
        if (data) setUsers(data?.addUser);
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((curr) => ({
            ...curr,
            [name]: value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        addUser({
            variables: {
                ...user,
                id: parseInt(user.id),
            },
        });
        setUser({
            id: '',
            name: '',
            email: '',
        });
        console.log(loading, data, error);
    };
    return (
        <div>
            <form>
                <input type='text' name='id' placeholder='Id' value={user.id} onChange={handleChange} />
                <br />
                <input type='text' name='name' placeholder='Name' value={user.name} onChange={handleChange} />
                <br />
                <input type='email' name='email' placeholder='Email' value={user.email} onChange={handleChange} />
                <br />
                <button onClick={submit}>Add User</button>
            </form>
        </div>
    );
};

export default AddUser;
