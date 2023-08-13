import React from 'react'
import { LogOut } from 'react-feather'
import { useAuth } from '../Context/Auth/AuthContext'

const Header = () => {


    const { user, handleLogout } = useAuth();
    return (
        <div className="header_wrapper">
            {user ? (
                <>
                    Welcome {user.name}

                    <LogOut className='header_link' onClick={handleLogout}/>
                </>
            ) : (
                <button>Login</button>
            )}
        </div>
    )
}

export default Header