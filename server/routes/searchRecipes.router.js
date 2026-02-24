const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

let key = process.env.REACT_APP_API_RECIPE

router.get('/:input/:typeMeal/:minCalories/:maxCalories/:minFat/:maxFat/:minProtein/:maxProtein/:diet/:intolerances', (req, res) => {
  input = req.params.input;
  type = req.params.typeMeal;
  minCalories = req.params.minCalories;
  maxCalories = req.params.maxCalories;
  minFat = req.params.minFat;
  maxFat = req.params.maxFat;
  minProtein = req.params.minProtein;
  maxProtein = req.params.maxProtein;
  diet= req.params.diet;
  intolerances= req.params.intolerances

  console.log('----->', input, type, minCalories, maxCalories, minFat, maxFat, minProtein, maxProtein,diet,intolerances)

  const config = {
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": key,
      "useQueryString": true
    },
    params: {
      "number": "100",
      "query": input,
      "limitLicense": "false",
      "offset": "0",
      "type": type,
      "minCalories": minCalories,
      "maxCalories": maxCalories,
      "minFat": minFat,
      "maxFat": maxFat,
      "minProtein": minProtein,
      "maxProtein": maxProtein,
      "diet": diet,
      "intolerances":intolerances
    }
  }

  axios.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex", config)
    .then(result => {
      console.log('recipes data', result.data);
      
      res.send(result.data)
    }).catch(err => {
      console.log('Error from get recipes title', err);
      res.sendStatus(500);
    })
});


router.get('/:recipe-info/:id', (req, res) => {
  const id= req.params.id
  console.log('recipe info id', id)
  const config = {
    headers: {
      "content-type":"application/octet-stream",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": key,
      "useQueryString": true
    },
  }

  axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`, config)
    .then(result => {
      console.log('recipe info data', result.data);
      res.send(result.data)
    }).catch(err => {
      console.log('Error from get recipe info', err);
      res.sendStatus(500);
    })

});

router.get('/:recipe-summary/:id', (req, res) => {
  const id= req.params.id
  console.log('recipe summary id', id)
  const config = {
    headers: {
      "content-type":"application/octet-stream",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": key,
      "useQueryString": true
    },
  }

  axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/summary`, config)
    .then(result => {
      console.log('recipe summary data', result.data);
      res.send(result.data)
    }).catch(err => {
      console.log('Error from get recipe summary', err);
      res.sendStatus(500);
    })

});

router.get('/similar-recipe/:id', (req, res) => {
  const id= req.params.id
  console.log('similar recipe id', id)
  const config = {
    headers: {
      "content-type":"application/octet-stream",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": key,
      "useQueryString": true
    },
  }

  axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/similar`, config)
    .then(result => {
      console.log('similar recipe data', result.data);
      res.send(result.data)
    }).catch(err => {
      console.log('Error from get similar recipe', err);
      res.sendStatus(500);
    })
});

// IF REACT_APP_API_RECIPE exists, export router, else do not export router and do not use this file in server.js
if (process.env.REACT_APP_API_RECIPE){
module.exports = router;
}