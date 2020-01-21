import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import homepage from "./components/homepage";
import dashboard from "./components/dashboard";
import profile from "./components/profile";
import commute from "./components/commute";
import notes from "./components/notes";
import dorm from "./components/dorm";
import comments from "./components/comments";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={homepage} />
        <Route path="/dashboard"  component={dashboard} />
        <Route path="/profile"  component={profile} />
        <Route path="/commute"  component={commute} />
        <Route path="/notes"  component={notes} />
        <Route path="/dorm"  component={dorm} />
        <Route path="/comments"  component={comments} />
      </Switch>
    </Router>
  );
}

export default App;
