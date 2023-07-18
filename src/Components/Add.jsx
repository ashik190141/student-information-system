
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const navigate = useNavigate();
    const handleAdd = event => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const roll = form.roll.value;
        const session = form.session.value;
        const current = form.current.value;
        const semester = form.semester.value;
        

        const blogInfo = {
            name,
            roll,
            session,
            current,
            semester
        };

        console.log(blogInfo);

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(blogInfo)
        })
            .then(res => res.json)
            .then(data => {
                console.log(data);
                if (data.insertedId > 0) {
                    alert("Data added Successfully");
                }
                navigate('/');
        })
    }
    return (
        <div>
            <h1>Add Student Information</h1>
            <form onSubmit={handleAdd}>
                <input type="text" name="roll" placeholder="Roll" /><br />
                <input type="text" name="name" placeholder="Name" /><br />
                <input type="text" name="session" placeholder="Session" /><br />
                <input type="text" name="current" placeholder="Current Year" /><br />
                <input type="text" name="semester" placeholder="Semester" /><br />
                <input type="submit" value="Add Student"/><br />
            </form>
        </div>
    );
};

export default Add;