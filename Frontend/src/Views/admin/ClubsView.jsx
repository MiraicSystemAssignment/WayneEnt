import React, { useState, useEffect } from 'react';
import axios from "axios";
import { BsChatDotsFill, BsX } from "react-icons/bs";
import Line from './Line';

const styles = {
  table: {
    borderCollapse: 'collapse',
    width: '80%',
    margin: '20px auto',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
    backgroundColor: '#f2f2f2',
    color: '#333',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  td: {
    textAlign: 'center',
    border: '1px solid #ddd',
    padding: '8px',
    color: '#666',
    fontSize: '12px',
  },
  chatWindowContainer: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '9999',
  },
  chatWindow: {
    width: '300px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  chatHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  chatBody: {
    height: '20px',
    width: '500px',
    overflowY: 'auto',
    marginBottom: '10px', 
    paddingRight: '10px',  
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  receivedMessage: {
    backgroundColor: '#f2f2f2',
    color: '#333',
    padding: '10px',
    borderRadius: '10px',
    marginBottom: '5px',
    maxWidth: '70%',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  sentMessage: {
    backgroundColor: 'gray',
    color: 'black',
    padding: '10px',
    borderRadius: '10px',
    marginBottom: '5px',
    maxWidth: '70%',
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  chatInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  sendButton: {
    padding: '10px',
    backgroundColor: 'darkgreen',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  closeButton: {
    cursor: 'pointer',
  },
};


const ClubsView = () => {
  const id = window.location.pathname;
  const [data, setData] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/clubdata${id.slice(11)}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const toggleChatWindow = (userId) => {
    setShowChat(!showChat);
    setSelectedUserId(userId);
  };

  const handleSentMessage = (message) => {
    setSentMessages([...sentMessages, message]);
  };

  return (
    <>
      {data.length !== 0 && (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                {Object.keys(data[0]).map((item) => (
                  <th style={styles.th}>{item}</th>
                ))}
                <th style={styles.th}>Chat</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  {Object.entries(row).map(([key, value]) => (
                    <td style={styles.td}>{renderCellValue(key, value)}</td>
                  ))}
                  <td style={styles.td}>
                    <span style={{ cursor: 'pointer' }} onClick={() => toggleChatWindow(row.Line_id)}>
                      <BsChatDotsFill />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showChat && (
            <div style={styles.chatWindowContainer}>
              <div style={styles.chatWindow}>
                <div style={styles.chatHeader}>
                  <span style={{fontFamily: "Poppins",fontSize: "1 rem"}}>Line Chat</span>
                  <BsX style={styles.closeButton} onClick={toggleChatWindow} />
                </div>
                <div style={styles.chatBody}>
                  {/* Display received and sent messages based on selected user */}
                  {receivedMessages
                    .filter((msg) => msg.userId === selectedUserId)
                    .map((msg, index) => (
                      <div key={index} style={styles.receivedMessage}>
                        {msg.text}
                      </div>
                    ))}
                  {sentMessages
                    .filter((msg) => msg.userId === selectedUserId)
                    .map((msg, index) => (
                      <div key={index} style={styles.sentMessage}>
                        {msg.text}
                      </div>
                    ))}
                </div>
                {/* Line component for sending messages */}
                <Line
                  lineUserId={selectedUserId}
                  token={localStorage.getItem('token')}
                  onMessageSent={(message) => handleSentMessage({ userId: selectedUserId, text: message })}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

// Helper function to render cell values based on data type
const renderCellValue = (key, value) => {
  if (typeof value === 'string' && value.startsWith('{')) {
    const parsedValue = JSON.parse(value + '}');
    return `${parsedValue.Start} To ${parsedValue.End}`;
  } else if (typeof value === 'string' && value.startsWith('[')) {
    const parsedArray = JSON.parse(value);
    return parsedArray.filter((e) => e !== '').join(', ');
  } else if (typeof value === 'string' && value.startsWith('"')) {
    return JSON.parse(value);
  }
  return value;
};

export default ClubsView;