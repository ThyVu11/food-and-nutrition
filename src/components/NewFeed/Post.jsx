import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import clsx from "clsx";
import { withStyles } from "@mui/styles";
import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import { SimpleDialog } from "./UsersWhoLikedDialog";
import DisplayEditAndDelete from "../utils/DisplayEditAndDelete";
import Comment from "./Comments";
import ImageSlider from "../utils/ImageSlider";
import AddCommentForm from "../utils/AddCommentForm";

const moment = require("moment");

const useStyles = (theme) => ({
  root: {
    textAlign: "center",
  },
  paper: {
    marginBottom: "10px",
    marginTop: "5px",
  },
  cardAction: {
    marginLeft: "5px",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  paperComment: {
    marginBottom: "10px",
    marginTop: "-7px",
  },
  commentForm: {
    marginBottom: "10px",
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
});

const Post = (props) => {
  const { classes, post, user, comments } = props;

  const [countTime, setCountTime] = useState(
    moment.utc(props.post.time).fromNow()
  );
  const [editPost, setEditPost] = useState(false);
  const [contentPost, setContentPost] = useState(post.content);

  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(
    post.users_who_liked_array && post.users_who_liked_array[0]
  );

  useEffect(() => {
    if (post.users_who_liked_array === null) {
      setLiked(
        <IconButton>
          <FavoriteIcon color="primary" />
        </IconButton>
      );
    } else if (
      post.users_who_liked_array &&
      post.users_who_liked_array.indexOf(user.name) === -1
    ) {
      setLiked(
        <IconButton>
          <FavoriteIcon color="primary" />
        </IconButton>
      );
    } else {
      setLiked(
        <IconButton>
          <FavoriteIcon color="secondary" />
        </IconButton>
      );
    }
  }, [post.users_who_liked_array, user.name]);

  setInterval(function () {
    setCountTime(moment.utc(props.post.time).fromNow());
  }, 10000);

  //-----------------Post-----------------

  const handlePostOnChange = (e) => {
    setContentPost(e.target.value);
  };
  const handleSavePost = (e) => {
    props.dispatch({
      type: "EDIT_POST",
      payload: {
        id: post.id,
        content: contentPost,
      },
    });
    setEditPost(false);
  };
  const handleDeletePost = (e) => {
    props.dispatch({
      type: "DELETE_POST",
      payload: {
        id: post.id,
      },
    });
    setEditPost(false);
  };

  //-----------------Post-----------------

  //-----------------Like-----------------
  const handleLikeButton = () => {
    if (post.users_who_liked_array === null) {
      props.dispatch({
        type: "LIKE",
        payload: {
          id: post.id,
          userWhoLiked: user.id,
        },
      });
    } else if (
      post.users_who_liked_array &&
      post.users_who_liked_array.indexOf(user.name) === -1
    ) {
      console.log(user.name, " doesn't liked");
      props.dispatch({
        type: "LIKE",
        payload: {
          id: post.id,
          userWhoLiked: user.id,
        },
      });
    } else {
      console.log(user.name, " liked");
      props.dispatch({
        type: "UNLIKE",
        payload: {
          post_id: post.id,
          user_id: user.id,
        },
      });
    }
  };

  const handleClickDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = (value) => {
    setDialogOpen(false);
    setSelectedValue(value);
  };
  //-----------------Like-----------------

  //-----------------Comment-----------------
  const handleGetComment = () => {
    props.dispatch({
      type: "FETCH_COMMENT",
      payload: { postId: post.id },
    });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
    handleGetComment();
  };

  const handleCommentOnChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleAddComment = () => {
    // console.log("iiiipost id", post.id);
    setCommentText("");
    props.dispatch({
      type: "ADD_COMMENT",
      payload: {
        id: post.id,
        userWhoCommentedId: user.id,
        contentComment: commentText,
        time: new Date(),
      },
    });

    setTimeout(() => {
      handleGetComment();
    }, 500);
  };

  //-----------------Comment-----------------

  return (
    <>
      <Paper className={classes.paper}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
          }
          action={
            <DisplayEditAndDelete
              userId={user.id}
              type={"post"}
              postOrCommentUserId={post.post_owner_id}
              editPost={editPost}
              setEditPost={setEditPost}
              handleDeletePost={handleDeletePost}
            />
          }
          title={post.name}
          subheader={countTime}
        />

        <CardContent>
          {editPost ? (
            <>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={3}
                value={contentPost}
                variant="outlined"
                fullWidth
                onChange={handlePostOnChange}
              />
              <Button onClick={handleSavePost}>Save</Button>
            </>
          ) : (
            <Typography variant="body2" color="textSecondary" component="p">
              {post.content}
            </Typography>
          )}
        </CardContent>
       
        {/* {post.image.includes("empty") === true ? (
          ""
        ) : (
          <ImageSlider post={post} />
        )} */}

        <CardActions disableSpacing className={classes.cardAction}>
          <p onClick={handleClickDialogOpen}>
            {post.users_who_liked_array && post.users_who_liked_array.length}
          </p>
          <SimpleDialog
            open={dialogOpen}
            onClose={handleDialogClose}
            usersWhoLiked={post.users_who_liked_array}
            selectedValue={selectedValue}
          />
          <div onClick={() => handleLikeButton()}>{liked}</div>
          <Button
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            Comment
          </Button>
        </CardActions>
      </Paper>

      <Paper className={classes.paperComment}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Add comments</Typography>

            <AddCommentForm
              handleCommentOnChange={handleCommentOnChange}
              commentText={commentText}
              handleAddComment={handleAddComment}
            />

            {comments.map((comment) => (
              <Comment
                key={comment.id}
                post={post}
                expanded={expanded}
                comment={comment}
              />
            ))}
          </CardContent>
        </Collapse>
      </Paper>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  comments: state.comments,
});
export default connect(mapStateToProps)(withStyles(useStyles)(Post));
