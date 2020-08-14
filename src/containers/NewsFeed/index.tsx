import React, { Component } from 'react'
import Post from "../../components/Post";
import Container from "../../components/Container";

export default class NewsFeed extends Component {
  render() {
    return (
      <Container>
        <div><Post /></div>
      </Container>
    )
  }
}
