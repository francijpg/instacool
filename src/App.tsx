import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./containers/Auth/Login";
import Register from "./containers/Auth/Register";
import NewsFeed from "./containers/NewsFeed";

function App() {
  return (
    <BrowserRouter>
      <Route exact={true} path="/" component={Login} />
      <Route exact={true} path="/register" component={Register} />
      <Route exact={true} path="/app/newsfeed" component={NewsFeed} />
    </BrowserRouter>
  );
}

export default App;
