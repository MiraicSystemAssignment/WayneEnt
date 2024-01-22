import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";

const styles = {
    Sidebar: {
        minHeight: "100vh",
        width: "13%",
        backgroundColor: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    Item: {
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    Link: {
        textDecoration: "none",
        color: "white",
        fontFamily: "DM Serif Display"
    },
    Divider: {
        height: "1px",
        width: "100%",
        backgroundColor: "white"
    },
    SelectedItem: {
        height: "40px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        color: "black"
    },
    SelectedLink: {
        textDecoration: "none",
        color: "black",
        fontFamily: "DM Serif Display"
    }
}

export default function Sidebar(){
    const [selected, setSelected] = useState("/");
    
    return (
        <div style={styles.Sidebar}>
            <div style={selected==="/" ? styles.SelectedItem : styles.Item}>
                <Link style={selected==="/" ? styles.SelectedLink : styles.Link} to="/home/new">New Club</Link>
            </div>
            <div style={styles.Divider}></div>
            <div style={styles.Item}>
                <Link style={styles.Link} to="/clubs">Clubs</Link>
            </div>
            <div style={styles.divider}></div>
            <div style={styles.Item}>
                <Link style={styles.Link} to="/">Settings</Link>
            </div>
            <div style={styles.divider}></div>
        </div>
    );
}