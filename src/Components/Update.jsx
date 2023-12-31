// import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTitle from '../hooks/useTitle';
import { useNavigate } from 'react-router-dom';

const Update = () => {
    useTitle("Update");
    const loadedData = useLoaderData();
    const navigate = useNavigate();

    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const roll = form.roll.value;
        const session = form.session.value;
        const current = form.current.value;
        const semester = form.semester.value;

        const updatedUser = { name, roll, session, current, semester };
        console.log(updatedUser);
        fetch(`http://localhost:5000/users/${loadedData._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: `Successfully Updated Information of ${name}`,
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'OK'
                    }).then(result => {
                        if (result.isConfirmed) {
                            navigate('/');
                        }
                    })
                }
        })
    }

    return (
        <div className='max-w-7xl mx-auto mt-20'>
            <h3 className='text-center font-bold text-3xl mb-20'>Update information of {loadedData.name}</h3>
            <form onSubmit={handleUpdate}>
                <div className="form-control w-full mb-3">
                    <label>
                        <input type="text" name="name" placeholder="Name" defaultValue={loadedData?.name}
                    className="input border-olive-lightgreen w-full bg-slate-100"/>
                    </label>
                </div>

                <div className="form-control w-full mb-3">
                    <label>
                        <input type="number" name="roll" placeholder="Roll" defaultValue={loadedData?.roll}
                    className="input border-olive-lightgreen w-full bg-slate-100" /><br />
                    </label>
                </div>

                <div className="form-control w-full mb-3">
                    <label>
                        <input type="text" name="session" placeholder="Session" defaultValue={loadedData?.session}
                        className="input border-olive-lightgreen w-full bg-slate-100"/>
                    </label>
                </div>
                
                <div className="form-control w-full mb-3">
                    <label>
                        <input type="number" name="current" placeholder="Current Year" defaultValue={loadedData?.current}
                    className="input border-olive-lightgreen w-full bg-slate-100"/>
                    </label>
                </div>

                <div className="form-control w-full mb-3">
                    <label>
                        <input type="number" name="semester" placeholder="Semester" defaultValue={loadedData?.semester}
                    className="input border-olive-lightgreen w-full bg-slate-100"/>
                    </label>
                </div>

                <div className="form-control w-full mb-3 flex flex-col items-center justify-center">
                    <input type="submit" value="Update"
                    className="mt-20 btn bg-lightorange border-none  text-white btn-primary w-1/3"/>
                </div>
            </form>
        </div>
    );
};

export default Update;