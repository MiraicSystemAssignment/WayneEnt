import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SentMessage = ({ text }) => (
  <div
    style={{
      backgroundColor: 'green',
      color: 'white',
      fontFamily: "Poppins",
      fontSize: "0.8rem",
      padding: '10px',
      borderRadius: '10px',
      marginBottom: '5px',
      maxWidth: '70%',
      textAlign: 'right',
      alignSelf: 'flex-end',
    }}
  >
    {text}
  </div>
);

const ReceivedMessage = ({ text }) => (
  <div
    style={{
      backgroundColor: '#0E050F',
      fontFamily: "Poppins",
      fontSize: "0.8rem",
      color: 'white',
      padding: '10px',
      borderRadius: '10px',
      marginBottom: '5px',
      maxWidth: '70%',
      textAlign: 'left',
      alignSelf: 'flex-start',
    }}
  >
    {text}
  </div>
);

const Line = (props) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const getMessages = async () =>{
      try {
        const { data } = await axios.post(`https://4e51-2a09-bac1-36a0-68-00-31-10d.ngrok-free.app/api/messages`, {id: props.lineUserId});
        if(data.length > 0) {
          setMessages(JSON.parse(data[0].texts));
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
    getMessages();
  }, []);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(
        'https://4e51-2a09-bac1-36a0-68-00-31-10d.ngrok-free.app/api/send-message',
        {
          to: props.lineUserId,
          events: [
            {
              type: 'text',
              text: inputMessage,
            },
          ],
        }
      );
      const anewone = [...messages, "S "+ inputMessage];
      setMessages(anewone);
      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <br /><br />
      <div style={{ display: 'flex', flexDirection: 'column', height: '200px', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          message.substring(0, 2) === "R " ? <ReceivedMessage key={index} text={message.substring(2)} /> : <SentMessage key={index} text={message.substring(2)} /> 
        ))}
      </div>
      <div style={{ display: 'inline-flex', alignItems: 'center', marginTop: '10px' }}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          style={{
            fontFamily: "Poppins",
            fontSize: "0.8rem",
            width: '200px',
            padding: '10px',
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '14px',
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            fontFamily: "Poppins",
            fontSize: "0.8rem",
            padding: '10px 20px',
            backgroundColor: 'green',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
      {error && <p style={{ fontSize: '14px', color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Line;
