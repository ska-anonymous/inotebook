import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContextProvider';

const Login = () => {

    const { showAlert } = useContext(AppContext);

    const API_HOST = 'http://localhost:8081/api';

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_HOST + `/auth/login`, {
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

            showAlert('success', 'Login sucsessful');
            sessionStorage.setItem('notesUserToken', data.token);
            navigate('/');

        } catch (err) {
            showAlert('danger', 'Error occurred during Login ' + err.message);
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className='row justify-content-center my-5'>
                <div className='col-6'>
                    <div className='card'>
                        <div className='card-header'>
                            <div className='card-title'>Login</div>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleLogin}>
                                <div className='form-group'>
                                    <label htmlFor='email'>Email</label>
                                    <input type='email' id='email' value={credentials.email} onChange={handleChange} name='email' className='form-control' required />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' id='password' name='password' value={credentials.password} onChange={handleChange} className='form-control' required />
                                </div>
                                <div className='form-group'>
                                    <button className='btn btn-primary' type='submit'>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
