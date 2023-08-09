import React, { useEffect, useContext } from 'react';
import ChatContext from '../Context/Chat/ChatContext'
import MessageForm from './MessageForm';
import { Trash2 } from 'react-feather';
import client, { COLLECTION_ID_MESSAGES, DATABASE_ID, databases } from '../appwrite/appwriteConfig';

const Home = () => {

  const context = useContext(ChatContext);
  const { messages, getMessages, deleteMessage } = context;

  useEffect(() => {
    getMessages()

    client.subscribe([`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`], response => {
      // Callback will be executed on changes for documents A and all files.
      // console.log(response);

      if (response.events.includes("databases.*.collections.*.documents.*.create",)) {
        console.log("Message is created");
      }

      if (response.events.includes("databases.*.collections.*.documents.*.delete",)) {
        console.log("Message is deleted");
      }
    });
  }, [])

  return (
    <>
      <div className="home_container">
        <MessageForm />
        <div>
          {messages.map(message => (
            <div key={message.$id} className='message_wrapper'>

              <div className="message_header">
                <small className='message_timestamp'>{new Date(message.$createdAt).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</small>

                <Trash2 className="delete_btn" onClick={() => { deleteMessage(message.$id) }} />
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