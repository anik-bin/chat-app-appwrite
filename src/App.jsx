import './App.css'
import Home from './pages/Home'
import ChatState from './Context/Chat/ChatState'

function App() {

  return (
    <>
      <ChatState>
      <Home />
      </ChatState>
    </>
  )
}

export default App
