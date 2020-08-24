import React, { Component } from "react";
import ProfileImg from "../../components/ProfileImg";
import Button from "../../components/Button";
import Card from "../../components/Card";
import * as postDuck from "../../ducks/Posts";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import services from '../../services'

const { auth } = services   

const style = {
  container: {
    padding: "15px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between", //add 100% spaces beetween all element contend (profile and button), good for work with columns
    marginBottom: "10px",
  },
};

interface IProfileProps {
  fetchPosts: () => void;
  fetched: boolean;
  loading: boolean;
  data: postDuck.IDataPosts;
}

class Profile extends Component<IProfileProps> {
  constructor(props: IProfileProps) {
    super(props);
    const { fetchPosts, fetched } = props;
    if (fetched) {
      return;
    }
    fetchPosts();
  }

  render() {
    return (
      <div style={style.container}>
        <div style={style.row}>
          <ProfileImg />
          <Button>Agregar</Button>
        </div>
        <div style={style.row}>
          <Card><img src="http://placekitten.com/100/100" alt=""/></Card>
          <Card><img src="http://placekitten.com/100/100" alt=""/></Card>
          <Card><img src="http://placekitten.com/100/100" alt=""/></Card>
        </div>
        <div style={style.row}>
          <Card><img src="http://placekitten.com/100/100" alt=""/></Card>
          <Card><img src="http://placekitten.com/100/100" alt=""/></Card>
          <Card><img src="http://placekitten.com/100/100" alt=""/></Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { Posts: { data, fetched, fetching }, } = state;
  const loading = fetching || !fetched;

  console.log(auth.currentUser && auth.currentUser.uid)

  return {
    data,
    fetched,
    loading,
  };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) =>
  bindActionCreators(postDuck, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);