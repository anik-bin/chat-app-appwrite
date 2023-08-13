import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/Auth/AuthContext'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const { user, handleLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [])


  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className="auth_container">
        <div className="form_wrapper">
          <form onSubmit={(e)=>{handleLogin(e, credentials)}}>
            <div className="field_wrapper">
              <label>Email:</label>
              <input
                type="email"
                required
                name="email"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={handleChange} />
            </div>

            <div className="field_wrapper">
              <label>Password:</label>
              <input
                type="password"
                required
                name="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange} />
            </div>

            <div className="field_wrapper">
              <input type="submit" value="Login" className='btn btn_main' />
            </div>
          </form>

          <p>Don't have an account? Register <Link to='/register'>here</Link></p>
        </div>
      </div >
    </>
  )
}

export default Login