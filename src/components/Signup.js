import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContextProvider';

const Signup = () => {

    const API_HOST = 'http://localhost:8081/api';

    const { showAlert } = useContext(AppContext);

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_HOST + `/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            })

            const data = await response.json();
            if (data.error) {
                return showAlert('danger', data.errorMessage || data.errorsBody[0].msg);
            }

            showAlert('success', 'Registration Successfull');
            sessionStorage.setItem('notesUserToken', data.token);
            navigate('/');

        } catch (err) {
            showAlert('danger', 'Error occurred during Signup ' + err.message);
        }
    }
    return (
        <>
            <div className='row justify-content-center my-5'>
                <div className='col-6'>
                    <div className='card'>
                        <div className='card-header'>
                            <div className='card-title'>Sign Up</div>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSignup}>
                                <div className='form-group'>
                                    <label htmlFor='name'>Name</label>
                                    <input type='text' id='name' value={credentials.name} onChange={handleChange} name='name' minLength={3} maxLength={15} className='form-control' required />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='email'>Email</label>
                                    <input type='email' id='email' value={credentials.email} onChange={handleChange} name='email' className='form-control' required />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' id='password' name='password' value={credentials.password} onChange={handleChange} className='form-control' minLength={5} required />
                                </div>
                                <div className='form-group'>
                                    <button className='btn btn-primary' type='submit'>Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
