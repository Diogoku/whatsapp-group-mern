import React, { useState, useEffect } from "react";

// REACT-REDUX
import { useSelector } from "react-redux";

// FIREBASE
import db from "./firebase";

// COMPONENTS
import SidebarChat from "./SidebarChat";

// CSS
import "./css/sidebar.css";

// MATERIAL-UI ICONS
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutLined from "@material-ui/icons/SearchOutlined";
import { Avatar, IconButton } from "@material-ui/core";

function SideBar() {
  const { user } = useSelector((state) => state.userReducer);
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const unsubscribe = db
      .collection("rooms")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log(filter);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user ? user.photoURL : null} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutLined />
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            type="text"
            placeholder="Search or start new chat"
          />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms
          .filter((room) => {
            return room.data.roomName
              .toLowerCase()
              .startsWith(filter.toLowerCase());
          })
          .map((room) => {
            return (
              <SidebarChat
                key={room.id}
                id={room.id}
                name={room.data.roomName}
              />
            );
          })}
      </div>
    </div>
  );
}

export default SideBar;
