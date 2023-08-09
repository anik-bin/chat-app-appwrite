import './App.css'
import Home from './pages/Home'
import ChatState from './Context/Chat/ChatState'

function App() {

  return (
    <>
      <ChatState>
      <div className="container">
      <Home />
      </div>
      </ChatState>
    </>
  )
}

export default App
