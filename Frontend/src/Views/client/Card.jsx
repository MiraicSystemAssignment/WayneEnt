import React, {useState, useEffect} from 'react'

const styles = {
    OuterBox: {
      marginTop: "10vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    InnerBox: {
        display: "flex",
        flexDirection: "column",
        minHeight: "10vh",
        minWidth: "25%",
        backgroundColor: "black",
        color: "white",
        fontFamily: "poppins",
        justifyContent: "center",
        alignItems: "center"
    },
    Item: {
      width: "99%",
      textAlign: "center",
      backgroundColor: 'white',
      color: 'black',
      marginBottom: "2%",
      border: "solid black 0.1rem"
    },
    Items: {
      width: "100%",
      textAlign: "center",
      backgroundColor: 'black',
      color: 'white',
      marginBottom: "1%"
    },
    Img: {
      marginTop: "4%",
      borderRadius: "20%",
      height: "12rem",
      marginBottom: "7%"
    },
    Note: {
      marginTop: "10vh",
      fontFamily: "poppins",
      backgroundColor: "black",
      color: "white",
      paddingLeft: "2vh",
      paddingRight: "2vh"
    }
}

export default function Card() {
  const [userProfileJson, setUserProfileJson] = useState(null); 
  const name = window.location.pathname.slice(6).replace(/%20/g, '');

  const displayUserProfile = () => {
    const storedUserProfile = localStorage.getItem('userProfile');
    if (storedUserProfile) {
      setUserProfileJson(JSON.stringify(JSON.parse(storedUserProfile), null, 2));
    }
  };
  useEffect(() => {
    displayUserProfile();
  }, []);

  return (
    <div style={styles.OuterBox}>
      <div style={styles.InnerBox}>
        <div style={styles.Item}>Membership Card</div>
        <div style={styles.Items}>{name}</div>
        {userProfileJson != null && 
        <>
        <img style={styles.Img} src={JSON.parse(userProfileJson).pictureUrl} alt='profile pic'/>
        <div style={styles.Items}>{JSON.parse(userProfileJson).displayName}</div>
        <div style={styles.Items}>{JSON.parse(userProfileJson).userId}</div>
        </>}
      </div>
      <div style={styles.Note}>
        Note: You are already registered with this Club!
      </div>
    </div>
  )
}
