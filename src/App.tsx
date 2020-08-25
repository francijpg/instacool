import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { History } from "history";

import Login from "./containers/Auth/Login";
import Register from "./containers/Auth/Register";
import NewsFeed from "./containers/NewsFeed";
import Navbar from "./components/Navbar";
import Profile from "./containers/Profile";
import services from "./services";

interface IAppProps {
  history: History;
  loadInitialData: () => void;
}
class App extends React.Component<IAppProps> {
  public state = {
    loading: true,
  };

  public componentDidMount() {
    const { auth } = services;
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { loadInitialData } = this.props;
        loadInitialData();
        if (["/", "/register"].indexOf(window.location.pathname) > -1) {
          const { history } = this.props;
          history.push("/app/newsfeed");
        }
      } else {
        // eslint-disable-next-line
        if (/\app\/./.test(location.pathname)) {
          const { history } = this.props;
          history.push("/");
        }
      }

      this.setState({
        loading: false,
      });
    });
  }

  public render() {
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
