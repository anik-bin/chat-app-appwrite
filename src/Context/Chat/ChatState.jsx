import React, {useState} from 'react'
import { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../../appwrite/appwriteConfig'
import { ID, Query } from 'appwrite'
import ChatContext from './ChatContext'

const ChatState = (props) => {

  const messageInitial = [];

  const [messages, setMessages] = useState(messageInitial)
  const [messageBody, setMessageBody] = useState('')

  const createMessage = async () => {
    let payload = {
      body: messageBody
    }

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload
    );

    // console.log('Created', response);

    setMessages(prevState => [response, ...messages])
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
    setMessages(prevState=> messages.filter(message => message.$id !== message_id))
  }

  return (
    <ChatContext.Provider value={{messages, messageBody, createMessage, getMessages, setMessageBody, deleteMessage}}>
      {props.children}
    </ChatContext.Provider>
  )
}

export default ChatState