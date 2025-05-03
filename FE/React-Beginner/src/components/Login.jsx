
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useContext(AuthContext)

    // Redirect page
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(username, password)
            navigate('/');
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="d-flex align-items-center" style={{ height: '100vh' }}>
            <div className="container d-flex justify-content-center" >
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title text-center">
                                <h2>
                                    Login
                                </h2>
                                {error && <p className='text-danger'>{error}</p>}
                            </div>
                            <div className="row">
                                <form onSubmit={handleSubmit}>
                                    <label className='form-label'>Username: </label>
                                    <input
                                        className='form-control'
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <label className='form-label'>Password: </label>
                                    <input
                                        className='form-control'
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className="col d-flex justify-content-center mt-2">
                                        <button type='submit' className='btn btn-outline-success'>Login</button>
                                        <a className='btn btn-outline-primary' href='/register'>Register</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login