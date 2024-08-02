import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('notesUserToken');
        navigate('/login');
    }
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                        </li>

                    </ul>
                    {!sessionStorage.getItem('notesUserToken') ? <form className="form-inline my-2 my-lg-0">
                        <Link className="btn btn-outline-success my-2 my-sm-0" to='/login'>Login</Link>
                        <Link className="btn btn-outline-info my-2 mx-2 my-sm-0" to='/signup' >Sign Up</Link>
                    </form> : <button className='btn btn-outline-warning' onClick={handleLogout}>Logout</button>}
                </div>
            </nav>
        </>
    )
}

export default Navbar
