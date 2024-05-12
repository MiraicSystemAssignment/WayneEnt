import React from 'react';
import axios from 'axios';

class LineMessaging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Hello, this is a message from your Line bot!',
      userId: 'Uf32e7663a18ff20b1ba30785bc2699e4', // Replace with the user's Line ID
      accessToken: 'ED+0kp5dBIX5z2PXGz2cfm3yZP//5WkH7EcIKbxReqWyd6zn2DYwkRzqPWU1U+4FSBE+pTCT5gaHbnWoOuIpgpsyS1TdidOhwwQ3p6/gIvr9QZBgTUYvcPKJBMZedPaIR6p0vcpHjO79GZ2aMrjlCAdB04t89/1O/w1cDnyilFU=' // Replace with your Line channel access token
    };
  }

  sendMessage = () => {
    const { message, userId, accessToken } = this.state;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    const data = {
      to: userId,
      messages: [
        {
          type: 'text',
          text: message
        }
      ]
    };

    const apiUrl = 'https://api.line.me/v2/bot/message/push';

    axios.post( apiUrl, data, { headers })
      .then(response => {
        console.log('Message sent successfully:', response);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.sendMessage}>Send Message</button>
      </div>
    );
  }
}

export default LineMessaging;
