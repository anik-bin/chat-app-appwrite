import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './Components/PrivateRoutes'
import { AuthProvider } from './Context/Auth/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ChatState from './Context/Chat/ChatState'

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider> 
          <ChatState>
            <div className="container">
              <Routes>
                <Route element={<PrivateRoutes />}>
                  <Route path='/' element={<Home />} />
                </Route>
                <Route path='Login/*' element={<Login />} />
                <Route path='Register/*' element={<Register />} />
              </Routes>
            </div>
          </ChatState>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
