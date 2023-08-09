import React, { useContext } from 'react'
import ChatContext from '../Context/Chat/ChatContext';

const MessageForm = () => {

    const context = useContext(ChatContext);
    const { messageBody, createMessage, setMessageBody } = context;

    const handleSubmit = async (e) => {
        e.preventDefault()
        createMessage();
    }
    return (
        <>
            <div className='message_form'>
                <form onSubmit={handleSubmit}>
                    <textarea required maxLength={"1000"} placeholder='Enter your message' onChange={(e) => {
                        setMessageBody(e.target.value)
                    }} value={messageBody}>
                    </textarea>

                    <div className="send_btn_wrapper">
                        <input className="btn btn_secondary" type="submit" value="Send" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default MessageForm