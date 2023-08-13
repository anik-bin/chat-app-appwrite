import React, { useEffect, useContext } from 'react';
import ChatContext from '../Context/Chat/ChatContext'
import MessageForm from './MessageForm';
import { Trash2 } from 'react-feather';
import client, { COLLECTION_ID_MESSAGES, DATABASE_ID } from '../appwrite/appwriteConfig';
import Header from '../Components/Header';
import { useAuth } from '../Context/Auth/AuthContext'

const Home = () => {

  const context = useContext(ChatContext);
  const { messages, getMessages, deleteMessage, setMessages } = context;
  const {user} = useAuth()

  useEffect(() => {
    getMessages()

    const unsubscribe = client.subscribe([`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`], response => {
      // Callback will be executed on changes for documents A and all files.
      // console.log(response);

      if (response.events.includes("databases.*.collections.*.documents.*.create",)) {
        console.log("Message is created");
        setMessages(prevState => [response.payload, ...prevState])
      }

      if (response.events.includes("databases.*.collections.*.documents.*.delete",)) {
        console.log("Message is deleted");
        setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
      }
    });

    return () => {
      unsubscribe(); // this unsubsribes the event. This also makes sure that we only get 1 event in this useEffect call
    }
  }, [])

  return (
    <>
      <Header />
      <div className="home_container">
        <MessageForm />
        <div>
          {messages.map(message => (
            <div key={message.$id} className='message_wrapper'>

              <div className="message_header">

                <p>
                  {message?.username ? (
                    <span>{message.username}</span>
                  ) : (
                    <span>Anonymous</span>
                  )}
                  <small className='message_timestamp'>{new Date(message.$createdAt).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</small>
                </p>

                {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && <Trash2 className="delete_btn" onClick={() => { deleteMessage(message.$id) }} />}

              </div>

              <div className="message_body">
                <span>{message.body}</span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home