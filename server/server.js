const express = require("express");
require("dotenv").config();

const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const sessionMiddleware = require("./modules/session-middleware");

const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const shelfRouter = require("./routes/shelf.router");
const landingPage = require("./routes/landingpage.router");
const searchRecipes = require("./routes/searchRecipes.router");
const calendar = require("./routes/calendar.router");
const favorite = require("./routes/favorite.router");
const payment = require("./routes/payment.router");
const post = require("./routes/post.router");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for the React dev server so browser can send cookies
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/shelf", shelfRouter);
app.use("/api/landingpage", landingPage);
app.use("/api/searchRecipes", searchRecipes);
app.use("/api/mealPlan", calendar);
app.use("/api/favorite-recipe", favorite);
app.use("/api/payment", payment);
app.use("/api/post", post);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.SERVER_PORT || process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
