import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import {
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import Ingreadients from "./Ingreadients";

const useStyles = (theme) => ({
  root: {
    margin: "40px",
  },
  media: {
    paddingTop: "56.25%",
    size: 10,
    // margin: "auto 250px"
  },
});

class ComponentToPrint extends Component {
  render() {
    const { item, classes } = this.props;
    return (
      <div className={classes.root}>
        <CardHeader
          title={item.title}
          subheader={
            "Cooking: " +
            item.readyInMinutes +
            " mins" +
            "  ,   " +
            "Serving: " +
            item.servings
          }
        />
        <CardMedia
          className={classes.media}
          image={item.image}
          title={item.title}
        />
        <CardContent>
          <Typography paragraph>Ingreadients: </Typography>
          {item.extendedIngredients.map((i, key) => {
            return (
              <div key={key}>
                <Ingreadients i={i} />
              </div>
            );
          })}
          <Divider />
          <Typography paragraph>Directions: </Typography>
          <ol>
            {item.analyzedInstructions[0].steps.map((step) => (
              <li key={step.id}>{step.step}</li>
            ))}
          </ol>
        </CardContent>
      </div>
    );
  }
}

export default withStyles(useStyles)(ComponentToPrint);
