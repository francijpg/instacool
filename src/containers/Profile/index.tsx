import React, { Component } from "react";
import ProfileImg from "../../components/ProfileImg";
import Button from "../../components/Button";
import Card from "../../components/Card";
import * as postDuck from "../../ducks/Posts";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import services from "../../services";
import { chunk } from "lodash";
import { submit } from "redux-form";

const { auth } = services;

const style = {
  container: {
    padding: "15px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between", //add 100% spaces beetween all element contend (profile and button), good for work with columns
    marginBottom: "10px",
  },
  img: {
    width: "100px",
  },
};

export interface IProfileProps {
  fetchPosts: () => void;
  submitProfileImage: () => void;
  handleProfileImageSubmit: (a: { file: File }) => void;
  fetched: boolean;
  loading: boolean;
  data: postDuck.IPost[][];
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
    const { data, submitProfileImage, handleProfileImageSubmit } = this.props;
    return (
      <div style={style.container}>
        <div style={style.row}>
          <ProfileImg
            onSubmit={handleProfileImageSubmit}
            submitProfileImage={submitProfileImage}
          />
          <Button>Agregar</Button>
        </div>
        {data.map((x, i) => (
          <div key={i} style={style.row}>
            {x.map((y) => (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Card key={y.imageURL}>
                <img style={style.img} src={y.imageURL} alt="" />
              </Card>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const {
    Posts: { data, fetched, fetching },
  } = state;
  const loading = fetching || !fetched;

  const filtered = Object.keys(data).reduce((acc, el) => {
    if (data[el].userId !== (auth.currentUser && auth.currentUser.uid)) {
      return acc;
    }
    return acc.concat(data[el]);
  }, [] as postDuck.IPost[]);

  return {
    data: chunk(filtered, 3),
    fetched,
    loading,
  };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) =>
  bindActionCreators(
    {
      ...postDuck,
      submitProfileImage: () => submit("profileImg"),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
