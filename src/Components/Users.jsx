// // import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, [])
    
    const handleDelete = id => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert("Delete Successful");
                }
            })
    }

    return (
        <div>
            <div>
                <table className="table border-1">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Roll</th>
                            <th>Session</th>
                            <th>Current Year</th>
                            <th>Semester</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => (
                                <tr key={user._id}>
                                    <th>{user.name}</th>
                                    <th>{user.roll}</th>
                                    <th>{user.session}</th>
                                    <td>{user.current}</td>
                                    <td>{user.semester}</td>
                                    <th>
                                        <button onClick={() => handleDelete(user._id)} className="btn btn-warning">Delete</button>
                                    </th>
                                    <th>
                                        <Link to={`/update/${user._id}`}>
                                            <button className="btn btn-success">Update</button>
                                        </Link>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
            </table>
            </div>
            <div>
                <Link to="/add"><button className="btn btn-primary">Add Student</button></Link>
            </div>
        </div>
    );
};

export default Users;