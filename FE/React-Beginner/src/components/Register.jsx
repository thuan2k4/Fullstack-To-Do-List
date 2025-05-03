import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { register } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await register(username, email, password)
            navigate('/login')
        } catch (err) {
            setError(err.message)
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
                                    Register
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
                                        placeholder="Username"
                                    />
                                    <label className='form-label'>Email: </label>
                                    <input
                                        className='form-control'
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                    />
                                    <label className='form-label'>Password: </label>
                                    <input
                                        className='form-control'
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                    />
                                    <div className="col d-flex justify-content-center mt-2">
                                        <button type='submit' className='btn btn-outline-success'>Register</button>
                                        <a className='btn btn-outline-primary' href='/login'>Back to Login</a>
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

export default Register