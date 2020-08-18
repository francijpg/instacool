import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./containers/Auth/Login";
import Register from "./containers/Auth/Register";
import NewsFeed from "./containers/NewsFeed";
import Navbar from "./components/Navbar";
import Profile from "./containers/Profile";
import services from "./services";

class App extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const { auth } = services;
    auth.onAuthStateChanged((user) => {
      console.log(user);
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { loading } = this.state;
    return loading ? (
      "loading"
    ) : (
      <BrowserRouter>
        <Route exact={true} path="/" component={Login} />
        <Route exact={true} path="/register" component={Register} />
        <Route path="/app" component={Navbar} />
        <Route exact={true} path="/app/newsfeed" component={NewsFeed} />
        <Route exact={true} path="/app/profile" component={Profile} />
      </BrowserRouter>
    );
  }
}

export default App;
