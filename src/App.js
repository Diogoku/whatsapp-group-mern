import React from "react";

// REACT-REDUX
import { useSelector } from "react-redux";

// REACT-ROUTER-DOM
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// CSS
import "./css/App.css";

// COMPONENTS
import Login from "./Login";
import Sidebar from "./Sidebar";
import Chat from "./Chat";

function App() {
  const { user } = useSelector((state) => state.userReducer);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route exact path="/">
                <h1>Home Screen</h1>
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
