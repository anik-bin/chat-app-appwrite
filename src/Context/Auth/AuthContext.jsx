import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUserAfterLogged()
    }, [])


    const getUserAfterLogged = async () => {
        try {
            const accountDetails = await account.get();
            setUser(accountDetails)
        } catch (error) {
            console.log(error);
        }

        setLoading(false)
    }

    const handleLogin = async (e, credentials) => {
        e.preventDefault();

        try {
            const response = await account.createEmailSession(credentials.email, credentials.password);
            
            const accountDetails = await account.get();
            setUser(accountDetails);
            navigate('/')
        } catch (error) {
            console.log(error);
        }


    }

    const handleLogout = async () => {
        const response = await account.deleteSession('current')
        setUser(null)
    }

    const handleRegister = async (e, credentials) => {
        e.preventDefault();

        if (credentials.password !== credentials.cpassword) {
            alert('Passwords do not match')
            return
        }

        try {
            let response = await account.create(
                ID.unique(),
                credentials.email,
                credentials.password,
                credentials.name,
            )

            await account.createEmailSession(credentials.email, credentials.password)
            const accountDetails = await account.get();
            setUser(accountDetails);
            navigate('/')
        } catch (error) {
            console.error(error);
        }
    }


    const contextData = {
        user,
        handleLogin,
        handleLogout,
        handleRegister
    }



    return <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading.....</p> : children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext;