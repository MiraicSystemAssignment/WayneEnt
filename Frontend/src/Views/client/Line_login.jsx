import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import Events from './Events';
import Cards from "./Card";
import Eventform from "./Eventform";

const Line_login = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
          const tokenParams = {
            grant_type: 'authorization_code',
            client_id: import.meta.env.VITE_CHANNEL_ID,
            client_secret: import.meta.env.VITE_CHANNEL_SECRET,
            redirect_uri: import.meta.env.VITE_CALLBACK_URL,
            code,
          };

          const tokenResponse = await axios.post(
            'https://api.line.me/oauth2/v2.1/token',
            qs.stringify(tokenParams),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );

          const { access_token } = tokenResponse.data;

          const profileResponse = await axios.get('https://api.line.me/v2/profile', {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });

          const userProfile = profileResponse.data;
          setUserProfile(userProfile);

          
          console.log("User Profile:", userProfile);

          localStorage.setItem('userProfile', JSON.stringify(userProfile)); 
          setIsLoading(false); 
          <div>
            <Events userProfile={userProfile} />
            <Cards user={userProfile} />
            <Eventform user={userProfile} />
          </div>
        }
      } catch (error) {
        console.error('Error during authentication callback:', error);
        setIsLoading(false); 
      }
    };

    handleAuthCallback();
  }, []);

  useEffect(() => {
    const storedUserProfile = localStorage.getItem('userProfile');
    if (storedUserProfile) {
      setUserProfile(JSON.parse(storedUserProfile));
    }
  }, []);

  const handleLogin = () => {
    setIsLoading(true); 
    const params = {
      response_type: 'code',
      client_id: import.meta.env.VITE_CHANNEL_ID,
      redirect_uri: import.meta.env.VITE_CALLBACK_URL,
      state: 'random_state_string', // optional
      scope: 'profile openid email', // specify required scopes
    };
    const queryParams = qs.stringify(params);
    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?${queryParams}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('userProfile'); 
    setUserProfile(null); 
    window.location.href = '/client/login'; 
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "20px", backgroundColor: "#fff", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ border: "5px black", borderRadius: "15px", padding: "30px", boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.1)", maxWidth: "400px", width: "100%" }}>
          <h1 style={{ marginBottom: "20px", color: "black" }}>{userProfile ? 'My Profile' : 'Login'}</h1>
          {!userProfile ? (
            <button style={{ padding: "10px 20px", fontSize: "16px", borderRadius: "5px", backgroundColor: "#00c300", color: "#fff", border: "none", cursor: "pointer" }} onClick={handleLogin}>Login with Line</button>
          ) : (
            <div>
              <div style={{ borderRadius: "50%", overflow: "hidden", width: "150px", height: "150px", margin: "0 auto" }}>
                <img src={userProfile.pictureUrl} alt="User Picture" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ marginTop: "20px" }}>
                <h2 style={{ marginBottom: "10px", color: "#333" }}>User Name</h2>
                <p style={{ fontSize: "18px", fontWeight: "bold", color: "black" }}>{userProfile.displayName}</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button style={{ padding: "10px 20px", fontSize: "16px", borderRadius: "5px", backgroundColor: "#ff0000", color: "#fff", border: "none", cursor: "pointer", marginRight: "1px" }} onClick={handleLogout}>Logout</button>
                  <a href="/member" style={{ textDecoration: 'none' }}>
                    <button style={{ padding: "10px 20px", fontSize: "16px", borderRadius: "5px", backgroundColor: "green", color: "#fff", border: "none", cursor: "pointer", marginLeft: "1px" }}>Go to Home</button>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Line_login;
