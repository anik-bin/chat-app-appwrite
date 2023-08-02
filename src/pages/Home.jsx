import React, { useState, useEffect } from 'react'
import { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../appwrite/appwriteConfig'

const Home = () => {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessages()
  }, [])

  const handleSubmit = async (e)=>{
    e.preventDefault()

    
  }
  

  const getMessages = async () => {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_MESSAGES)
    console.log('Response:', response);
    setMessages(response.documents)
  }
  return (
    <>
      <div>
        {messages.map(messages=>(
          <div key={messages.$id}>
            <span>{messages.body}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home