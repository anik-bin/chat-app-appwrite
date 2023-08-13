import React, {useState} from 'react'
import { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../../appwrite/appwriteConfig'
import { ID, Query, Role, Permission } from 'appwrite'
import ChatContext from './ChatContext'
import { useAuth } from '../Auth/AuthContext'

const ChatState = (props) => {

  
  const messageInitial = [];
  
  const [messages, setMessages] = useState(messageInitial)
  const [messageBody, setMessageBody] = useState('')
  const { user }= useAuth();

  const createMessage = async () => {
    let payload = {
      user_id: user.$id,
      username: user.name,
      body: messageBody
    }


    let permissions = [
      Permission.write(Role.user(user.$id))
    ]

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload,
      permissions
    );
    setMessageBody('')
  }

  const getMessages = async () => {
    const response = await databases.listDocuments(DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [
        Query.orderDesc('$createdAt'),
        Query.limit(20)
      ]
    )
    // console.log('Response:', response);
    setMessages(response.documents)
  }

  const deleteMessage = async (message_id) => {
    databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id);
    // setMessages(prevState=> prevState.filter(message => message.$id !== message_id))
  }

  return (
    <ChatContext.Provider value={{messages, setMessages, messageBody, createMessage, getMessages, setMessageBody, deleteMessage}}>
      {props.children}
    </ChatContext.Provider>
  )
}

export default ChatState