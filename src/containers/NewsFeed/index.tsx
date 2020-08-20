import React, { Component } from "react";
import Post from "../../components/Post";
import Container from "../../components/Container";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";

class NewsFeed extends Component {
  render() {
    return (
      <Container>
        <div style={{ margin: "0 auto" }}>
          <Post image={"http://placekitten.com/300/200"}/>
        </div>
        <div style={{ margin: "0 auto" }}>
          <Post image={"http://placekitten.com/300/200"}/>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state : any) => {
  return state
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any,any,any>) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed)
