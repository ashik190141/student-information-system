
import Swal from 'sweetalert2'
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
        

        const student_info = {
            name,
            roll,
            session,
            current,
            semester
        };


        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(student_info)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: `Successfully Added Information of ${name}`,
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
                else if (data.message) {
                    Swal.fire({
                        title: `Roll Number ${roll} Already Exist`,
                        icon: 'warning',
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
            <h1 className='text-center font-bold text-3xl mb-20'>Add Student Information</h1>
            <form onSubmit={handleAdd}>
                <div className="form-control w-full mb-3">
                    <label>
                        <input required type="text" name="name" placeholder="Name"
                    className="input border-olive-lightgreen w-full bg-slate-100"/>
                    </label>
                </div>

                <div className="form-control w-full mb-3">
                    <label>
                        <input required type="number" name="roll" placeholder="Roll"
                    className="input border-olive-lightgreen w-full bg-slate-100" /><br />
                    </label>
                </div>

                <div className="form-control w-full mb-3">
                    <label>
                        <input required type="text" name="session" placeholder="Session"
                        className="input border-olive-lightgreen w-full bg-slate-100"/>
                    </label>
                </div>
                
                <div className="form-control w-full mb-3">
                    <label>
                        <input required type="number" name="current" placeholder="Current Year"
                    className="input border-olive-lightgreen w-full bg-slate-100"/>
                    </label>
                </div>

                <div className="form-control w-full mb-3">
                    <label>
                        <input required type="number" name="semester" placeholder="Semester"
                    className="input border-olive-lightgreen w-full bg-slate-100"/>
                    </label>
                </div>

                <div className="form-control w-full mb-3 flex flex-col items-center justify-center">
                    <input type="submit" value="Add Student"
                    className="mt-20 btn bg-lightorange border-none  text-white btn-primary w-1/3"/>
                </div>
            </form>
        </div>
    );
};

export default Add;