import React, { Component } from "react";
import Post from "../../components/Post";
import Container from "../../components/Container";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postDuck from "../../ducks/Posts";

interface INewsFeedProps {
  fetchPosts: () => void;
  fetched: boolean;
  loading: boolean;
  data: postDuck.IDataPosts;
  like: (a: string) => void;
  share: (a: string) => void;
}

class NewsFeed extends Component<INewsFeedProps> {
  constructor(props: INewsFeedProps) {
    super(props);
    const { fetchPosts, fetched } = props;
    if (fetched) {
      return;
    }
    fetchPosts();
  }

  private handleLike = (id: string) => () => {
    const { like } = this.props;
    like(id);
  };
  
  private handleShare = (id: string) => () => {
    const { share } = this.props;
    share(id);
  };

  render() {
    const { data } = this.props;
    return (
      <Container>
        {Object.keys(data).map((x) => {
          const post = data[x];
          return (
            <div key={x} style={{ margin: "0 auto" }}>
              <Post 
                like={this.handleLike(x)}
                share={this.handleShare(x)}
                image={post.imageURL} />
            </div>
          );
        })}
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { Posts: { data, fetched, fetching }, } = state;
  const loading = fetching || !fetched;

  return {
    data,
    fetched,
    loading,
  };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) =>
  bindActionCreators(postDuck, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
