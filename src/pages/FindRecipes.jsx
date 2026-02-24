import React, { Component } from "react";

import { connect } from "react-redux";
import RecipeSummary from "../components/Recipes/RecipeSummary";

import { 
  // fade,
   withStyles
   } from "@mui/styles";
import {
  Grid,
  Container,
  Typography,
  InputBase,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  ListItemText,
  Chip,
  FormControlLabel,
  Switch,
  Card,
  Slider,
  List,
  ListSubheader,
  ListItem,
  Collapse,
  Divider,
  Fade,
  CircularProgress,
} from "@mui/material";
import "../components/Recipes/Recipes.css";
import SearchIcon from '@mui/icons-material/Search';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Pagination } from "@mui/material";
import { getRecipeReducer } from "../recipeToTest";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  sideSearchBar: {
    backgroundColor: "lightgray",
    borderRadius: "10px",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      // backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    display:"block"
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "auto",
    },
  },
  formControl: {
    width: 150,
    marginBottom: "10px",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  media: {
    height: 180,
    size: 80,
  },
  card: {
    height: "100%",
    width: "100%",
    minWidth: "50%",
  },
  nested: {
    paddingLeft: theme.spacing(2),
  },
  nutritionName: {
    paddingRight: theme.spacing(2),
  },
  pagination: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: theme.spacing(2),
    display: "flex",
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

let i = 0;
let showThisPage;
let apiRecipe = process.env.REACT_APP_API_RECIPE

class FindRecipes extends Component {
  state = {
    meal: "main course",
    myRecipes: false,
    input: "egg",
    id: "",
    diet: "none",
    calories: [150, 1500],
    fat: [5, 100],
    protein: [5, 100],
    intolerances: ["none"],
    expan: true,
    page: 1,
    rowPerPage: 25,
  };

  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_RECIPES",
      payload: {
        input: this.state.input,
        meal: this.state.meal,
        calories: this.state.calories,
        fat: this.state.fat,
        protein: this.state.protein,
        diet: this.state.diet,
        intolerances: this.state.intolerances,
      },
    });
  }

  handleInputOnChange = (event) => {
    this.setState({
      input: event.target.value,
    });
    // console.log(this.state.input)
    setTimeout(() => {
      this.props.dispatch({
        type: "FETCH_RECIPES",
        payload: {
          input: this.state.input,
          meal: this.state.meal,
          calories: this.state.calories,
          fat: this.state.fat,
          protein: this.state.protein,
          diet: this.state.diet,
          intolerances: this.state.intolerances,
        },
      });
    }, 100);
  };

  handleMealChange = (event) => {
    this.setState({
      meal: event.target.value,
    });
    setTimeout(() => {
      this.props.dispatch({
        type: "FETCH_RECIPES",
        payload: {
          input: this.state.input,
          meal: this.state.meal,
          calories: this.state.calories,
          fat: this.state.fat,
          protein: this.state.protein,
          diet: this.state.diet,
          intolerances: this.state.intolerances,
        },
      });
    }, 100);
  };

  handleDietChange = (event) => {
    this.setState({
      diet: event.target.value,
    });
    setTimeout(() => {
      this.props.dispatch({
        type: "FETCH_RECIPES",
        payload: {
          input: this.state.input,
          meal: this.state.meal,
          calories: this.state.calories,
          protein: this.state.protein,
          fat: this.state.fat,
          diet: this.state.diet,
          intolerances: this.state.intolerances,
        },
      });
    }, 100);
  };

  handleIntolerancesChange = (event) => {
    this.setState({
      intolerances: event.target.value,
    });
    setTimeout(() => {
      this.props.dispatch({
        type: "FETCH_RECIPES",
        payload: {
          input: this.state.input,
          meal: this.state.meal,
          calories: this.state.calories,
          fat: this.state.fat,
          protein: this.state.protein,
          diet: this.state.diet,
          intolerances: this.state.intolerances,
        },
      });
    }, 100);
  };

  handleCaloriesChange = (event, newValue) => {
    this.setState({
      calories: newValue,
    });
    setTimeout(() => {
      this.props.dispatch({
        type: "FETCH_RECIPES",
        payload: {
          input: this.state.input,
          meal: this.state.meal,
          calories: this.state.calories,
          fat: this.state.fat,
          protein: this.state.protein,
          diet: this.state.diet,
          intolerances: this.state.intolerances,
        },
      });
    }, 100);
  };

  handleFatChange = (event, newValue) => {
    this.setState({
      fat: newValue,
    });
    setTimeout(() => {
      this.props.dispatch({
        type: "FETCH_RECIPES",
        payload: {
          input: this.state.input,
          meal: this.state.meal,
          calories: this.state.calories,
          fat: this.state.fat,
          protein: this.state.protein,
          diet: this.state.diet,
          intolerances: this.state.intolerances,
        },
      });
    }, 100);
  };

  handleProteinChange = (event, newValue) => {
    this.setState({
      protein: newValue,
    });
    setTimeout(() => {
      this.props.dispatch({
        type: "FETCH_RECIPES",
        payload: {
          input: this.state.input,
          meal: this.state.meal,
          calories: this.state.calories,
          fat: this.state.fat,
          protein: this.state.protein,
          diet: this.state.diet,
          intolerances: this.state.intolerances,
        },
      });
    }, 100);
  };

  handleSwitchChange = () => {
    this.setState({
      myRecipes: !this.state.myRecipes,
    });
  };

  handleExpan = () => {
    this.setState({
      expan: !this.state.expan,
    });
  };

  handlePageChange = (event, value) => {
    this.setState({
      page: value,
    });
  };

  cardDisplayRecipe = (item) => {
    return (
      <Grid item xs={4} key={item.id}>
        <Card className={this.props.classes.card}>
          <RecipeSummary item={item} />
        </Card>
      </Grid>
    );
  };

  render() {
    const { classes } = this.props;
    
    if (this.state.page === 1) {
      showThisPage = this.props.getRecipe.slice(i, i + 25).map((item) => {
        window.scrollTo(0, 0);
        return this.cardDisplayRecipe(item)
      });
    } else if (this.state.page === 2) {
      showThisPage = this.props.getRecipe.slice(i + 25, i + 50).map((item) => {
        window.scrollTo(0, 0);
        console.log('item from page 2', item)
        return this.cardDisplayRecipe(item)
      });
    } else if (this.state.page === 3) {
      showThisPage = this.props.getRecipe.slice(i + 50, i + 75).map((item) => {
        window.scrollTo(0, 0);
        return this.cardDisplayRecipe(item)
      });
    } else if (this.state.page === 4) {
      showThisPage = this.props.getRecipe.slice(i + 75, i + 100).map((item) => {
        window.scrollTo(0, 0);
        return this.cardDisplayRecipe(item)
      });
    }
    // IF REACT_APP_API_RECIPE exists, map through the getRecipeReducer, if not, map through the getRecipeReducer from recipeToTest.js
    if (!apiRecipe){
      showThisPage = getRecipeReducer.map((item) => {
        return this.cardDisplayRecipe(item)
      });
    }
    

    return (
      <Container className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={3} className={classes.sideSearchBar}>
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div">
                  Search your recipes
                </ListSubheader>
              }
            >
              <ListItem>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    value={this.state.input}
                    placeholder="Search..."
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                    onChange={this.handleInputOnChange}
                  />
                </div>
              </ListItem>

              <Divider />
              <ListItem>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-checkbox-label">
                    Meal Options
                  </InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    value={this.state.meal}
                    onChange={this.handleMealChange}
                  >
                    {[
                      "breakfast",
                      "main course",
                      "dessert",
                      "drink",
                      "salad",
                    ].map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ListItem>

              <Divider />
              <ListItem onClick={this.handleExpan}>
                <ListItemText primary="Nutritions" />
                {this.state.expan ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.expan} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem className={classes.nested}>
                    <Typography
                      id="range-slider"
                      gutterBottom
                      className={classes.nutritionName}
                    >
                      Fat (g)
                    </Typography>
                    <Slider
                      value={this.state.fat}
                      min={5}
                      step={10}
                      max={100}
                      getAriaValueText={(value) => {
                        return `${value}`;
                      }}
                      onChange={this.handleFatChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                    />
                  </ListItem>
                  <ListItem className={classes.nested}>
                    <Typography
                      id="range-slider"
                      gutterBottom
                      className={classes.nutritionName}
                    >
                      Protein (g)
                    </Typography>
                    <Slider
                      value={this.state.protein}
                      min={5}
                      step={10}
                      max={100}
                      getAriaValueText={(value) => {
                        return `${value}`;
                      }}
                      onChange={this.handleProteinChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                    />
                  </ListItem>
                  <ListItem className={classes.nested}>
                    <Typography
                      id="range-slider"
                      gutterBottom
                      className={classes.nutritionName}
                    >
                      Calories
                    </Typography>
                    <Slider
                      value={this.state.calories}
                      min={150}
                      step={10}
                      max={1500}
                      getAriaValueText={(value) => {
                        return `${value}`;
                      }}
                      onChange={this.handleCaloriesChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                    />
                  </ListItem>
                </List>
              </Collapse>
            </List>

            <Divider />
            <ListItem>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-checkbox-label">Diet</InputLabel>
                <Select
                  labelId="demo-mutiple-checkbox-label"
                  id="demo-mutiple-checkbox"
                  value={this.state.diet}
                  onChange={this.handleDietChange}
                >
                  {[
                    "none",
                    "pescetarian",
                    "lacto vegetarian",
                    "ovo vegetarian",
                    "vegan",
                    "paleo",
                    "primal",
                    "vegetarian",
                  ].map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>

            <Divider />
            <ListItem>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-checkbox-label">
                  Exclude Ingredients Options
                </InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={this.state.intolerances}
                  onChange={this.handleIntolerancesChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {[
                    "none",
                    "dairy",
                    "egg",
                    "gluten",
                    "peanut",
                    "sesame",
                    "seafood",
                    "shellfish",
                    "soy",
                    "sulfite",
                    "tree nut",
                    "wheat",
                  ].map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>

            <Divider />
            <ListItem>
              <FormControlLabel
                label="My recipes"
                control={
                  <Switch
                    checked={this.state.myRecipes}
                    onChange={this.handleSwitchChange}
                    name="myRecipes"
                    color="primary"
                  />
                }
              />
            </ListItem>
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={1}>
              {/* {getRecipeReducer.length === 0 ? ( */}
              {!apiRecipe ? getRecipeReducer.length === 0  : this.props.getRecipe.length === 0 ? (
                <Grid item xs={12}>
                  <Fade in={true}>
                    <CircularProgress />
                  </Fade>
                </Grid>
              ) : (
                <>
                  <Grid container item xs={12} spacing={1}>
                    {showThisPage}
                  </Grid>
                  <Grid item xs={12}>
                    <Pagination
                      className={classes.pagination}
                      count={
                        this.props.getRecipe.length / this.state.rowPerPage
                      }
                      page={this.state.page}
                      onChange={this.handlePageChange}
                      color="primary"
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const putReduxStateToProps = (reduxState) => {
  return {
    getRecipe: reduxState.getRecipeReducer,
  };
};

export default connect(putReduxStateToProps)(
  withStyles(useStyles)(FindRecipes)
);
