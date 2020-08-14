import React, { Component } from "react";
import Post from "../../components/Post";
import Container from "../../components/Container";

export default class NewsFeed extends Component {
  render() {
    return (
      <Container>
        <div style={{ margin: "0 auto" }}>
          <Post image={"http://placekitten.com/300/200"}/>
        </div>
      </Container>
    );
  }
}
