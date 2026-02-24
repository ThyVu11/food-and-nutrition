import React, { Component, useState } from "react";
import { connect } from "react-redux";
import toDate from "date-fns/toDate";
import * as dateFns from "date-fns";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";

import { withStyles } from "@mui/styles";
import {
  IconButton,
  Typography,
  Container,
  Popover,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  List,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  DialogActions,
  Grid,
} from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PrintIcon from "@mui/icons-material/Print";
import DateFnsUtils from "@date-io/date-fns";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from "@mui/lab/DatePicker";
import ComponentToPrint from "./ComponentToPrint";

const useStyles = (theme) => ({
  root:{
    flexGrow:1,
    flexShrink:0,
    //flexBasis: "100px"
  },
  media: {
    paddingTop: "56.25%",
    size: 80,
  },
  popover: {
    pointerEvents: "none",
  },
  padding: {
    padding: theme.spacing(2),
  },
  dialog: {
    display: "block",
  },
  icons: {
    //display: "float",
    position: "absolute",
    margin: "50px 10px 0px 85%",
  },
});

let printButton = (
  <IconButton
    aria-label="print"
    style={{
      //display: "float",
      position: "absolute",
      margin: "10px 0px 0px 80%",
    }}
  >
    <PrintIcon button="true" />
  </IconButton>
);

const Print = (props) => {
  const componentRef = useState();
  return (
    <div>
      <ReactToPrint
        trigger={() => printButton}
        content={() => componentRef.current}
      />
      <ComponentToPrint ref={el => (componentRef.current = el)} item ={props.item}/>
    </div>
  );
};

class RecipeDetail extends Component {
  state = {
    anchorEl: "",
    openListIcons: false,
    tag: "breakfast",
    checked: false,
    mealType: "",
    openAddToCalendarDialog: false,
    selectedDate: new Date(),
    addItemtoFavorite: [],
  };
  formatDate = (selectedDate) => {
    let dateFormat = "eee MMM d y xx";
    return dateFns.format(toDate(selectedDate), dateFormat);
  };

  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_MEAL_PLAN",
      payload: {
        date: this.formatDate(this.state.selectedDate),
      },
    });
    if (this.state.addItemtoFavorite.length === 0) {
      this.setState({
        addItemtoFavorite: [...this.state.addItemtoFavorite],
      });

      let notificationInfo = {
        userId: this.props.reduxState.user.id,
        notificationNumber: Number(
          this.state.addItemtoFavorite.length + 
          JSON.parse(localStorage.getItem("notification")).notificationNumber
        )
      }
      localStorage.setItem("notification", JSON.stringify(notificationInfo));
    }
  }

  handleOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      openListIcons: true,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      openListIcons: false,
    });
  };

  addToFavorite = async () => {
    let notificationInfo = {
      userId: this.props.reduxState.user.id,
      notificationNumber:this.state.addItemtoFavorite.length +1
      
    }
    console.log(notificationInfo)

    await this.setState({
      openListIcons: false,
      addItemtoFavorite: [...this.state.addItemtoFavorite, this.props.item],
    });
    await localStorage.setItem(
      "notification",JSON.stringify(notificationInfo)
    );

    this.props.dispatch({
      type: "ADD_FAVORITE_RECIPE",
      payload: {
        item: this.props.item,
      },
    });
    this.props.dispatch({
      type: "NOTIFICATION_BADGE",
      payload: {
        item: this.state.addItemtoFavorite,
      },
    });
  };

  addToCalendar = () => {
    this.setState({
      openAddToCalendarDialog: true,
    });
  };

  handleDialogClose = () => {
    this.setState({
      openAddToCalendarDialog: false,
    });
  };

  handleMealTypeChange = (event) => {
    this.setState({
      mealType: event.target.value,
    });
  };

  addThisRecipeToCalendar = () => {
    this.setState({
      openListIcons: false,
      openAddToCalendarDialog: false,
      mealType: "",
    });
    this.props.dispatch({
      type: "ADD_RECIPE_TO_CALENDAR",
      payload: {
        item: this.props.item,
        mealType: this.state.mealType,
        date: this.formatDate(this.state.selectedDate),
      },
    });
  };

  handleDateChange = (event) => {
    this.setState({
      selectedDate: event,
    });
    this.props.dispatch({
      type: "FETCH_MEAL_PLAN",
      payload: {
        date: this.formatDate(event),
      },
    });
  };

  handleBackToPlanningAnotherDay = () => {
    this.props.dispatch({
      type: "FETCH_MEAL_PLAN",
      payload: {
        date: this.formatDate(new Date()),
      },
    });
    this.handleDateChange(new Date());
  };

  render() {
    const { classes, item, reduxState } = this.props;

    const id = this.state.openListIcons ? "simple-popover" : undefined;

    let showOptionBreakfast = (
      <FormControlLabel
        value="breakfast"
        control={<Radio />}
        label="Breakfast"
      />
    );
    let showOptionLunch = (
      <FormControlLabel value="lunch" control={<Radio />} label="Lunch" />
    );
    let showOptionDinner = (
      <FormControlLabel value="dinner" control={<Radio />} label="Dinner" />
    );

    reduxState.getMealPlan.map((value) => {
      if (value.meal_type === "breakfast") {
        return showOptionBreakfast = (
          <div>
            <FormControlLabel
              value="breakfast"
              disabled
              control={<Radio />}
              label="Breakfast"
            />
          </div>
        );
      } else if (value.meal_type === "lunch") {
        return showOptionLunch = (
          <div>
            <FormControlLabel
              value="lunch"
              disabled
              control={<Radio />}
              label="Lunch"
            />
          </div>
        );
      } else if (value.meal_type === "dinner") {
        return showOptionDinner = (
          <div>
            <FormControlLabel
              value="dinner"
              disabled
              control={<Radio />}
              label="Dinner"
            />
          </div>
        );
      }
      return [];
    });

    return (
      <Container style={{ position: "relative" }} className ={classes.root}>
        
        <IconButton aria-label="settings" className={classes.icons} >
          <MoreVertIcon aria-describedby={id} onClick={this.handleOpen} />
          <Popover
            id={id}
            open={this.state.openListIcons}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button onClick={this.addToFavorite}>
                <ListItemIcon>
                  <FavoriteBorderIcon />
                </ListItemIcon>
                <ListItemText primary="Add to favorite" />
              </ListItem>
              <ListItem button onClick={this.addToCalendar}>
                <ListItemIcon>
                  <CalendarTodayIcon />
                </ListItemIcon>
                <ListItemText primary="Add to calender" />
              </ListItem>
            </List>
            <Divider />
          </Popover>
        </IconButton>
        <Print item={item}/>

        <Dialog
          // fullWidth="xs"
          maxWidth="xs"
          open={this.state.openAddToCalendarDialog}
          onClose={this.handleDialogClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogActions className={classes.dialog}>
            {reduxState.getMealPlan.length !== 3 ? (
              <>
                <DialogTitle id="max-width-dialog-title">
                  Let's plan your meal
                </DialogTitle>
                <DialogContent>
                  {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        // label="Date"
                        value={this.state.selectedDate}
                        onChange={(event) => this.handleDateChange(event)}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider> */}
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={this.state.mealType}
                      onChange={this.handleMealTypeChange}
                    >
                      {showOptionBreakfast}
                      {showOptionLunch}
                      {showOptionDinner}
                    </RadioGroup>
                  </FormControl>
                </DialogContent>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.addThisRecipeToCalendar}
                >
                  Add
                </Button>
              </>
            ) : (
              <>
                <Typography className={classes.padding}>
                  You planed meal for all day. Check your{" "}
                  <Link to="/calendar"> calendar</Link>{" "}
                </Typography>
                <Typography className={classes.padding}>
                  Or planning for another day?{" "}
                  <Button
                    onClick={this.handleBackToPlanningAnotherDay}
                    color="primary"
                  >
                    Back
                  </Button>{" "}
                </Typography>
              </>
            )}
            <Button onClick={this.handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(
  withStyles(useStyles)(RecipeDetail)
);
