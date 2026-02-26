import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import PostForm from "./PostForm";
import Post from "./Post";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: "10px",
  },
  name: {
    padding: theme.spacing(1),
  },
});

class PostSection extends Component {
  state = {
    newPostText: "",
    image: "",
    openListIcons: false,
  };

  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_ALL_POSTS",
    });
  }

  handleEditPost = () => {};

  render() {
    const { classes, posts } = this.props;

    return (
      <Grid item xs={6} className={classes.root}>
        <PostForm />
        {posts
          ? posts.map((post) => (
              <div key={post.id}>
                <Post post={post} />
              </div>
            ))
          : ""}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.allPost,
});

export default connect(mapStateToProps)(withStyles(useStyles)(PostSection));
