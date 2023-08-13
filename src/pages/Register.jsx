import React, {useState} from 'react'
import { useAuth } from '../Context/Auth/AuthContext'
import { Link } from 'react-router-dom';

const Register = () => {

    const {handleRegister} = useAuth();

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }
  return (
    <>
        <div className="auth_container">
        <div className="form_wrapper">
          <form onSubmit={(e)=>{handleRegister(e, credentials)}}>
            <div className="field_wrapper">
              <label>Name:</label>
              <input
                type="text"
                required
                name="name"
                placeholder="Enter your name"
                value={credentials.name}
                onChange={handleChange} />
            </div>

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
              <label>Confirm Password:</label>
              <input
                type="password"
                required
                name="cpassword"
                placeholder="Confirm your password"
                value={credentials.cpassword}
                onChange={handleChange} />
            </div>

            <div className="field_wrapper">
              <input type="submit" value="Register" className='btn btn_main' />
            </div>
          </form>

          <p>Already have an account? Login <Link to='/login'>here</Link></p>
        </div>
      </div >
    </>
  )
}

export default Register