import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Nav.css";

import { withStyles } from "@mui/styles";
import clsx from "clsx";

import {
  SwipeableDrawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemText,
  Badge,
  IconButton,
} from "@mui/material";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import FavoriteIcon from "@mui/icons-material/Favorite";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";

const useStyles = (theme) => ({
  list: {
    width: 350,
  },
  fullList: {
    width: "auto",
  },
  root: {
    backgroundColor: "#40543b1e",
    position: "fixed",
    marginTop: "0px",
    width: "100%",
    height: "70px",
    top: "0px",
     zIndex: theme.zIndex.drawer + 1,
  },
});

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Nav = (props) => {
  const { classes, user } = props;

  let notificationNumberInLocalStore = JSON.parse(
    localStorage.getItem("notification")
  )&& JSON.parse(
    localStorage.getItem("notification")
  ).notificationNumber;
  // let userIdInLocalStore = JSON.parse(localStorage.getItem("notification")).userId;

  const [state, setState] = React.useState({
    left: false,
  });
  const [count, setCount] = React.useState(notificationNumberInLocalStore);
  const [invisible, setInvisible] = React.useState(false);

  const handleEmptyCount = () => {
    let notificationInfo = {
      userId: user.id,
      notificationNumber: 0,
    };
    localStorage.setItem("notification", JSON.stringify(notificationInfo));
    setCount(
      JSON.parse(localStorage.getItem("notification")).notificationNumber
    );
  };

  useEffect(() => {
    if (notificationNumberInLocalStore > 0) {
      setInvisible(false);
    } else {
      setInvisible(true);
    }
    // setCount(notificationNumberInLocalStore);
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          <img src="images/logoName.png" alt="profile" width="310" />,
          "New Feed",
          "My Profile",
          "Recipes",
        ].map((text) => {
          if (text === "New Feed") {
            return (
              <Link className="nav-link-drawer" to={"/newfeed"} key={text}>
                <ListItem button>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            );
          } else if (text === "My Profile") {
            return (
              <Link
                className="nav-link-drawer"
                to={`/${props.user.name.replace(/\s/g, "").toLowerCase()}`}
                key={text}
              >
                <ListItem button>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            );
          } else if (text === "Recipes") {
            return (
              <Link className="nav-link-drawer" to={"/recipes"} key={text}>
                <ListItem button>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            );
          } else {
            return (
              <Link to="/home" key={text}>
                <ListItem button>
                  <img src="images/logoName.png" alt="profile" width="310" />
                </ListItem>
              </Link>
            );
          }
        })}
      </List>
      <Divider />
      <List>
        {["Log out"].map((text) => (
          <ListItem button key={text}>
            <ListItemText
              onClick={() => props.dispatch({ type: "LOGOUT" })}
              primary={text}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <HideOnScroll {...props}>
      <div className={classes.root}>
        {props.user.id && (
          <>
            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>
                  <RestaurantMenuIcon />
                </Button>
                <SwipeableDrawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                >
                  {list(anchor)}
                </SwipeableDrawer>
              </React.Fragment>
            ))}
          </>
        )}

        <Link to="/home">
          <h2 className="nav-title">
            <img
              className="logo"
              src="images/logo1.gif"
              alt="profile"
              height="130"
              width="130"
            />
          </h2>
        </Link>

        <div className="nav-right">
          {!props.user.id && (
            <Link className="nav-link" to="/sign-in">
              Sign in
            </Link>
          )}

          {props.user.id && (
            <>
              <div className="nav-right">
                {props.user.name ? (
                  <span className="profile">
                    Hi, <span className="user_name">{props.user.name}</span>
                  </span>
                ) : (
                  <span className="profile">
                    Hi, <span className="user_name">{props.user.email}</span>
                  </span>
                )}
              </div>

              <Link to="/favorite-recipes">
                <div
                  style={{
                    float: "left",
                    textAlign: "center",
                    padding: "13px 0px",
                  }}
                >
                  <IconButton aria-label="favorite" color="secondary">
                    <Badge
                      color="primary"
                      badgeContent={count}
                      invisible={invisible}
                    >
                      <FavoriteIcon onClick={handleEmptyCount} />
                    </Badge>
                  </IconButton>
                </div>
              </Link>
            </>
          )}
          {/* <Link className="nav-link" to="/about">
          About
      </Link> */}
        </div>
      </div>
    </HideOnScroll>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  setNotification: state.setNotification,
});

export default connect(mapStateToProps)(withStyles(useStyles)(Nav));
