// import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const loadedData = useLoaderData();

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
                    alert('Updated successfully');
                }
        })
    }

    return (
        <div>
            <h3>User information of {loadedData.name}</h3>
            <form onSubmit={handleUpdate}>
                <input type="text" name="roll" placeholder="Roll" defaultValue={loadedData?.roll}/><br />
                <input type="text" name="name" placeholder="Name" defaultValue={loadedData?.name}/><br />
                <input type="text" name="session" placeholder="Session" defaultValue={loadedData?.session}/><br />
                <input type="text" name="current" placeholder="Current Year" defaultValue={loadedData?.current}/><br />
                <input type="text" name="semester" placeholder="Semester" defaultValue={loadedData?.semester}/><br />
                <input type="submit" value="UPDATE" />
            </form>
        </div>
    );
};

export default Update;