import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Events = () => {
  const [clubs, setClubs] = useState([]);
  const [clubIds, setClubIds] = useState([]);
  const [userProfileJson, setUserProfileJson] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const getClubs = () => {
      axios.get(`https://wayne.di-devs.com/api/clubs`)
        .then(({ data }) => {
          setClubIds(data.map(item => item.id));
          setClubs(data.map(club => (JSON.parse(club.form_data).find(item => item.type === 'form name').name)));
        })
        .catch(err => console.log(err));
    };
    getClubs();
  }, []);

  const displayUserProfile = () => {
    const storedUserProfile = localStorage.getItem('userProfile');
    if (storedUserProfile) {
      setUserProfileJson(JSON.stringify(JSON.parse(storedUserProfile), null, 2));
    }
  };

  
  useEffect(() => {
    displayUserProfile();
  }, []);

  const handleClubClick = (index) =>{
    if(userProfileJson){
      axios.get(`https://wayne.di-devs.com/api/user/${clubIds[index]}/${JSON.parse(userProfileJson).userId}`)
    .then(({data})=> data.find(item => item.Line_id === JSON.parse(userProfileJson).userId) ? navigate(`/Card/${clubs[index]}`) : navigate(`/${clubIds[index]}`)).catch(err=> console.log(err));
  }else{
    alert('Please Login First');
  }
  }
 
  const BtnClick = () => {
    window.location.href = 'member';
  };

  return (
    <div>
      <style>{`
          * {
            padding: 0;
            margin: 0;
            text-decoration: none;
            list-style: none;
            box-sizing: border-box;
          }

          body {
            font-family: poppins;
            overflow-x: hidden;
            margin: 0;
            padding: 0;
          }

          nav {
            background: black;
            height: 80px;
            width: 100%;
          }

          img.logo {
            height: 50px; 
            width: auto; 
            margin-right: 10px; 
            margin-top: 15px; 
          }

          nav ul {
            float: right;
            margin-right: 20px;
          }

          nav ul li {
            display: inline-block;
            line-height: 80px;
            margin: 0 5px;
          }

          nav ul li a {
            color: white;
            font-size: 17px;
            padding: 7px 13px;
            border-radius: 3px;
            text-transform: uppercase;
          }

          a.active, a:hover {
            background: red;
            transition: .5s;
          }

          .checkbtn {
            font-size: 30px;
            color: white;
            float: right;
            line-height: 80px;
            margin-right: 40px;
            cursor: pointer;
            display: none;
          }

          #check {
            display: none;
          }

          @media (max-width: 952px) {
            label.logo {
              font-size: 30px;
              padding-left: 50px;
            }
            nav ul li a {
              font-size: 16px;
            }
          }

          @media (max-width: 858px) {
            .checkbtn {
              display: block;
            }
            ul {
              position: fixed;
              width: 100%;
              height: 100vh;
              background: #333333;
              top: 80px;
              left: -100%;
              text-align: center;
              transition: all .5s;
            }
            nav ul li {
              display: block;
              margin: 50px 0;
              line-height: 30px;
            }
            nav ul li a {
              font-size: 20px;
            }
            a:hover, a.active {
              background: none;
              color: #0082e6;
            }
            #check:checked ~ ul {
              left: 0;
            }
          }

          @media (max-width: 858px) {
            label.logo {
              font-size: 30px;
              padding-left: 10px; 
              order: 2; 
            }

            img.logo {
              margin-right: 0; 
              margin-left: 10px; 
            }

            nav ul {
              float: none; 
              margin: 0; 
              text-align: center; 
            }

            nav ul li {
              display: block;
              margin: 10px 0; 
              line-height: 30px;
            }
          }

          section {
            background-color:#fff;
          }
          
          @media (max-width: 412px) {
            section {
              padding: 10px;
            }
          }

          footer {
            background-color: black;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            position: fixed;
            bottom: 0;
            width: 100%;
            left: 0; 
            bottom: -10px;
          }

          footer p {
            margin: 0;
            color: #fff;
          }

          .btn {
            background-color: #1b9bff;
            color: #fff;
            padding: 10px 15px; 
            border: none;
            border-radius: 5px; 
            font-size: 18px;
            cursor: pointer;
            transition: background-color 0.3s ease; 
            margin-top: 20px; 
          }

          .btn:hover {
            background-color: #155fa0; 
          }

          h2 {
            text-align: center;
            margin-top: 50px;
            border-bottom: 2px solid #ccc;
            padding-bottom: 10px;
          }

          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .column {
            float: left;
            width: 25%;
            padding: 0 10px;
            box-sizing: border-box;
          }

          .row {
            margin: 0 -5px;
            padding-left: 4.5px;
            overflow-x: hidden;
          }

          .row:after {
            content: "";
            display: table;
            clear: both;
          }

          @media screen and (max-width: 600px) {
            .column {
              width: 100%;
              display: block;
              margin-bottom: 20px;
            }
          }

          .card {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            padding: 16px;
            text-align: center;
            width: 90%;
            margin: 0 auto;
            margin-bottom: 20px;
            cursor: pointer;
            border-radius: 6px
          }

          .link:hover {
            background: none;
            color: inherit;
          }

          .json-container {
            margin-top: 20px;
            padding: 20px;
            background-color: #f0f0f0;
            border-radius: 5px;
          }

          .json-title {
            text-align: center;
            margin-bottom: 10px;
            font-size: 20px;
          }

          .json-code {
            white-space: pre-wrap;
            word-wrap: break-word;
            font-size: 14px;
            font-family: monospace;
          }
        `}
      </style>
      <nav>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>
        <label className="logo">
          <img className="logo" src="bat_white.png" alt="Your Logo" />
        </label>
        <ul>
          <button className='btn' onClick={BtnClick}>Back</button>
        </ul>
      </nav>
      <section>
        <br />
        <h2>Choose your forms</h2>
        <br />
        <div className="row">
          {clubs.map((club, index) => (
            <div key={index} onClick={()=>handleClubClick(index)} className="column link" style={{ textDecoration: 'none' }}>
              <div className="card">
                <h3 style={{ color: 'black' }}>{club}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer>
        <p>&copy; 2024 Wayen Enterprises. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Events;
