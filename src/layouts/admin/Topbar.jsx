import React from "react";
import bat_white from "../../../public/bat_white.png";

const styles = {
    Header: {
        height: "10vh",
        width: "100%",
        color: "white",
        backgroundColor: "black",
        marginBottom: "1px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
    },
    Image: {
    height: "50px",
    marginRight: "600px"
  },
  Logout:{
    marginLeft: "550px",
    marginRight: "50px",
    fontFamily: "DM Serif Display"
  }
};

export default function Topbar(props) {
  return (
    <div style={styles.Header}>
      <img
        style={styles.Image}
        onClick={
          props.clicked
            ? () => props.handleClick(false)
            : () => props.handleClick(true)
        }
        src={bat_white}
        alt="batman"
      />
      <div style={styles.Logout}>Logout</div>
    </div>
  );
}
