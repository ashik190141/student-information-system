// // import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useTitle from '../hooks/useTitle';

const Users = () => {
    useTitle('Home');

    const {data: users = [], refetch} = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users')
        return res.json();
    })

    
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
                refetch();
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
                                    <td className='text-xl text-center'>{user.name}</td>
                                    <td className='text-xl text-center'>{user.roll}</td>
                                    <td className='text-xl text-center'>{user.session}</td>
                                    <td className='text-xl text-center'>{user.current}</td>
                                    <td className='text-xl text-center'>{user.semester}</td>
                                    <td className='flex flex-col items-center justify-center'>
                                        <button onClick={() => handleDelete(user._id)} className="btn btn-warning">Delete</button>
                                    </td>
                                    <td className='text-center'>
                                        <div>
                                            <Link to={`/update/${user._id}`}>
                                                <button className="btn btn-success">Update</button>
                                            </Link>
                                        </div>
                                    </td>
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