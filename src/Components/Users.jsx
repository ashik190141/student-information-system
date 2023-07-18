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
                            <th className='text-xl font-bold text-center'>Name</th>
                            <th className='text-xl font-bold text-center'>Roll</th>
                            <th className='text-xl font-bold text-center'>Session</th>
                            <th className='text-xl font-bold text-center'>Current Year</th>
                            <th className='text-xl font-bold text-center'>Semester</th>
                            <th className='text-xl font-bold text-center'>Delete</th>
                            <th className='text-xl font-bold text-center'>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => (
                                <tr key={user._id}>
                                    <th className='text-xl text-center'>{user.name}</th>
                                    <th className='text-xl text-center'>{user.roll}</th>
                                    <th className='text-xl text-center'>{user.session}</th>
                                    <td className='text-xl text-center'>{user.current}</td>
                                    <td className='text-xl text-center'>{user.semester}</td>
                                    <th className='flex flex-col items-center justify-center'>
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
            <div className='flex flex-col items-center justify-center'>
                <Link to="/add"><button className="btn btn-primary">Add Student</button></Link>
            </div>
        </div>
    );
};

export default Users;