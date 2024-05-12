import React from 'react';


const Top = () => {
  return (
    <div>
      <style>
        {`
          * {
            padding: 0;
            margin: 0;
            text-decoration: none;
            list-style: none;
            box-sizing: border-box;
          }

          body {
            font-family: montserrat;
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
            background: #1b9bff;
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
              background: #2c3e50;
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
        `}
      </style>
      <link rel="stylesheet" href="style.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      <nav>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>
        <label className="logo">
          <img className="logo" src="bat_white.png" alt="Your Logo" />
        </label>
        <ul>
          <li><a className="active" href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Feedback</a></li>
        </ul>
      </nav>
      <section>


      </section>
    
    </div>
  );
};

export default Top;
