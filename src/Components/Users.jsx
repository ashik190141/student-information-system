// // import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useTitle from '../hooks/useTitle';
import Swal from 'sweetalert2';

const Users = () => {
    useTitle('Home');

    const {data: users = [], refetch} = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users')
        return res.json();
    })

    
    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/users/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        Swal.fire(
                            'Deleted!',
                            'Information has been deleted.',
                            'success'
                        )
                    }
                    refetch();
                })
            }
        })
        
    }

    return (
        <div className='mt-10'>
            <div>
                <table className="table border-1">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='text-xl font-bold text-center'>Serial No</th>
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
                            users.map((user,index) => (
                                <tr key={user._id}>
                                    <td className='text-xl text-center'>{index+1}</td>
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
            <div className='flex flex-col items-center justify-center mt-10'>
                <Link to="/add"><button className="btn btn-primary">Add Student</button></Link>
            </div>
        </div>
    );
};

export default Users;