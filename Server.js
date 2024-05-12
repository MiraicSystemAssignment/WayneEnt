import dotenv from "dotenv";
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
global.__dirname = path.resolve();
import * as menuBounds from './Richmenus/menubounds.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // CORS to enable run our backend in other ports also

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// To check the database connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database!');
  }
});


app.post('/api/wayne_ent', (req, res) => {
  const formData = req.body.formData;

  const sql = 'INSERT INTO clubs (form_data) VALUES (?)';

  connection.query(sql, [JSON.stringify(formData)], (err, result) => {
    if (err) {
      console.error('Error saving form data:', err);
      res.status(500).json({ error: 'Internal Server Error', message: err.message });
    } else {
      console.log('Form data saved successfully');
      res.status(200).json({ success: true });
    }
  });
});

app.get('/api/clubs', (req, res)=>{
   connection.query('SELECT * from clubs', (err, result)=>{
    if(err){
      res.send(err);
    }else if(result){
      res.send(result);
    }})
})

app.get('/api/club/:id', (req, res)=>{
  connection.query(`SELECT * from clubs where id =(?)`,[req.params.id], (err, result)=>{
    if(err){
      res.send(err);
    }else if(result){
      res.send(result);
    }
  })
})

app.get('/api/user/:id/:line', (req,res)=>{
  const userId = req.params.line;
  connection.query(`SELECT * FROM group${req.params.id} where Line_id ='${userId}'`, (err, result)=>{
    if(err){
      res.send(false);
    }else if(result){
      res.send(true);
    }
  })
});

app.post('/api/create/:clubid', (req, res)=>{
  const form = req.body.form;
  const formData = req.body.formData;
  connection.query(`create table if not exists group${req.params.clubid}(
    Line_id VARCHAR(35) primary key
    ${form.map((item, index)=>(index!==0 ? `${item.name.replace(/\s/g, '_')} VARCHAR (40)` : null)).join(',')}
  );`, (err, result)=>{
    if(err){
      console.log(err);
      res.send(err);
    }else if(result){
      res.send(result);
    }
  });
})
app.post('/api/insert/:clubid', (req, res)=>{
  const form = req.body.form;
  const formData = req.body.formData;
  console.log(formData);
  connection.query(`INSERT INTO group${req.params.clubid} (${form.map((item,index)=>(index!==0 ? `${item.name.replace(/\s/g, '_')}` : `Line_id`)).join(',')}) 
  VALUES (${[JSON.stringify(JSON.parse(req.body.user).userId), formData.map((item, index)=> (((typeof item) === "string" ) ? JSON.stringify(item) : (typeof item) === "object") ? `'${JSON.stringify(item)}'` : item).slice(1).join(',')]});`, (err, result)=>{
    if(err){
      console.log(err);
      res.send(err);
    }else if(result){
      res.send(result);
    }
  });
});

app.get('/api/clubdata/:id', (req,res)=>{
  connection.query(`SELECT * FROM group${req.params.id}` ,(err, result)=>{
    if (err){
      res.send(err);
    }else if(result){
      res.send(result);
    }
  })
})

app.post('/api/richmenu1/:type', (req,res)=>{
  const type = req.params.type;
  const urls = req.body.uris;
  const config = {
    headers: {
      "Authorization":"Bearer WYpFxegG/Aj/UprPcZ7eon/b+OgKPRdxc5hrcypBYzymBoh23Xt7ESVfL8oBuND8C6q08aNrLmtTwBMMcMJ717BfIjtRP6cwMPWs1SeDi4OP7eXn1Cf2lxF9X7i8qbWgTWxwgTm275Ojt8gxy7eVGQdB04t89/1O/w1cDnyilFU",
      "Content-Type": "application/json",
    },
  };

  const data = {
    size: {
      width: 2500,
      height: 1686,
    },
    selected: false,
    name: "Test the default rich menu",
    chatBarText: "Tap to open",
    areas: urls.map((url, index)=>(
      {
        bounds: {
          x: menuBounds[`areas_${urls.length}_${type}`][index].x,
          y: menuBounds[`areas_${urls.length}_${type}`][index].y,
          width: menuBounds[`areas_${urls.length}_${type}`][index].width,
          height: menuBounds[`areas_${urls.length}_${type}`][index].height,
        },
        action: {
          type: "uri",
          label: `Tap area ${index}`,
          uri: url
        }
      }
    )) 
  };
  
  axios
    .post("https://api.line.me/v2/bot/richmenu", data, config)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
})

app.post('/api/richmenu2/:id', (req,res)=>{
  const richMenuId = req.body.menuId;
  const imageName = req.body.imageName;
  const imageUrl = `./Frontend/public/Images/Areas-${req.params.id}/type-${imageName}.jpeg`;
  const imageBuffer = fs.readFileSync(imageUrl);
  const channelAccessToken = 'WYpFxegG/Aj/UprPcZ7eon/b+OgKPRdxc5hrcypBYzymBoh23Xt7ESVfL8oBuND8C6q08aNrLmtTwBMMcMJ717BfIjtRP6cwMPWs1SeDi4OP7eXn1Cf2lxF9X7i8qbWgTWxwgTm275Ojt8gxy7eVGQdB04t89/1O/w1cDnyilFU';
  const apiUrl = `https://api-data.line.me/v2/bot/richmenu/${richMenuId}/content`;
  const headers = {
    'Authorization': `Bearer ${channelAccessToken}`,
    'Content-Type': 'image/png',
  };

  axios.post(apiUrl, imageBuffer, { headers })
  .then(response => {
    console.log(response);
    res.send('success');
  })
  .catch(error => {
    console.log(error);
    res.status(200).json(error);
  });
})

app.post('/api/richmenu3', (req,res)=>{
  const richMenuId = req.body.menuId;
  const channelAccessToken = 'WYpFxegG/Aj/UprPcZ7eon/b+OgKPRdxc5hrcypBYzymBoh23Xt7ESVfL8oBuND8C6q08aNrLmtTwBMMcMJ717BfIjtRP6cwMPWs1SeDi4OP7eXn1Cf2lxF9X7i8qbWgTWxwgTm275Ojt8gxy7eVGQdB04t89/1O/w1cDnyilFU';

const url = `https://api.line.me/v2/bot/user/all/richmenu/${richMenuId}`;

const headers = {
  'Authorization': `Bearer ${channelAccessToken}`,
};

axios.post(url, null, { headers })
  .then(response => {
    res.send(response.data);
  })
  .catch(error => {
    res.send(error.response.data);
  });
});

app.get('/api/images/:id', (req,res)=>{
  fs.readdir(path.join(__dirname, `/Frontend/public/Images/Areas-${req.params.id}`), (err, files)=>{
    if(err){
      res.send(err);
    }else{
      res.send(files.map(file=> file));
    }
  })
})

// Line Messaging API Intigration

// Endpoint to handle sending messages

app.post('/create-chats', async (req,res)=>{
  connection.query(`CREATE TABLE IF NOT EXISTS CHATS(
    userId VARCHAR(100) PRIMARY KEY,
    texts JSON
  )` ,(error, result)=>{
    if(error){
      res.send(error);
    }else{
      res.send(result);
    }
  })
})

app.post('/api/receive-message', async (req,res)=>{
  console.log(req.body.events)
  if(req.body.events[0].type === "message"){
    connection.query(`SELECT texts FROM CHATS where userId = ?`,[req.body.events[0].source.userId], (error, result)=>{
      if(error){
        console.log("error")
      }else{
        if(result[0] !== undefined){
          console.log([...JSON.parse(result[0].texts), "good"])
          
          connection.query(`UPDATE CHATS SET texts = ? WHERE userId = ?`, [JSON.stringify([...JSON.parse(result[0].texts), `R ${req.body.events[0].message.text}`]),req.body.events[0].source.userId], (error, result)=>{
            if(error){
              console.log(error);
            }else{
              console.log(result);
            }
          })
        }else{
          connection.query(`INSERT INTO CHATS (userId, texts) VALUES (?,?)`, [req.body.events[0].source.userId, JSON.stringify(["R "+req.body.events[0].message.text])], (error, result)=>{
            if(error){
              console.log(error);
            }else{
              console.log(result);
            }
          })
        }
      }
    })
  }
})

app.post('/api/messages', (req,res)=>{
  connection.query(`SELECT texts from CHATS where userId = ?`, [req.body.id], (error, result)=>{
    if(error){
      console.log(error);
      res.send(error);
    }else{
      res.send(result);
    }
  })
})

app.post('/api/send-message', async (req, res) => {
  try {
    const { to, events } = req.body;
    // Log the data received from the request body
    
    console.log('Events:', events);

    connection.query(`SELECT texts FROM CHATS where userId = ?`,[to], (error, result)=>{
      if(error){
        console.log("error")
      }else{
        if(result[0] !== undefined){
          console.log([...JSON.parse(result[0].texts)])
          
          connection.query(`UPDATE CHATS SET texts = ? WHERE userId = ?`, [JSON.stringify([...JSON.parse(result[0].texts), `S ${events[0].text}`]),to], (error, result)=>{
            if(error){
              console.log(error);
            }else{
              console.log(result);
            }
          })
        }else{
          connection.query(`INSERT INTO CHATS (userId, texts) VALUES (?,?)`, [to, JSON.stringify(["S "+events[0].text])], (error, result)=>{
            if(error){
              console.log(error);
            }else{
              console.log(result);
            }
          })
        }
      }
    })

    const options = {
      method: 'POST',
      url: 'https://api.line.me/v2/bot/message/push',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer WYpFxegG/Aj/UprPcZ7eon/b+OgKPRdxc5hrcypBYzymBoh23Xt7ESVfL8oBuND8C6q08aNrLmtTwBMMcMJ717BfIjtRP6cwMPWs1SeDi4OP7eXn1Cf2lxF9X7i8qbWgTWxwgTm275Ojt8gxy7eVGQdB04t89/1O/w1cDnyilFU=`, // Replace with your Line Channel Access Token
      },
      data: {
        to: to,
        messages: events,
      },
    };

    const response = await axios(options);
    
    res.sendStatus(200);
  } catch (error) {
    console.error('Error sending message:', error.response.data);
    res.sendStatus(500);
  }
});

app.use(express.static(path.join(__dirname, 'Frontend', 'dist')));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'), function (err) {
      if (err) {
          res.status(500).send(err);
      }
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
