import React, { useState, useEffect } from "react";

// FIREBASE
import db from "./firebase";
import firebase from "firebase";

// REACT-ROUTER-DOM
import { Link } from "react-router-dom";

// CSS
import "./css/sidebarChat.css";

// MATERIAL-UI
import { Avatar } from "@material-ui/core";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("please enter name for chat");

    if (roomName) {
      db.collection("rooms").add({
        roomName: roomName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>

          <div className="sidebarChat__info__bottom">
            <p>{messages[0]?.message}</p>
            <span>
              {new Date(messages[0]?.timestamp?.toDate()).toUTCString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
