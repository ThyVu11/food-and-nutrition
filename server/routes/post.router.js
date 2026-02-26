const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const moment = require("moment");

//-----------------Image-----------------

const multer = require('multer');
const path = require("path")
const multerDest = path.join(__dirname, '../uploads');
const upload = multer({ dest: multerDest });
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { uploadPost, generateSignedUrls } = require('../modules/imageHandler');

//-----------------Image-----------------


//-----------------Post-----------------
router.get("/",rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT usr.name AS owner_name,
      p.*,
      likes_agg.users_who_liked_array,
      likes_agg.like_id
    FROM posts p
    LEFT JOIN (
          SELECT l.post_id AS id,
            array_agg(u.name) AS users_who_liked_array,
            array_agg(l.id) AS like_id
          FROM likes l
          JOIN "user" u ON u.id = l.user_who_liked
      GROUP BY l.post_id
    ) likes_agg ON likes_agg.id = p.id
    JOIN "user" usr ON p.post_owner_id = usr.id
    ORDER BY p.id DESC;
    `;
  pool
    .query(queryText)
    .then((response) => {
      // generateSignedUrls(res, response.rows);
      res.send(response.rows);
    })
    .catch((error) => console.log(error));
});


router.post("/withoutImage", (req, res) => {
  let text = req.body.text;
  let time = req.body.time;
  let postOwnerId = req.user.id;
  const queryText =
    'INSERT INTO "posts" (content, time, post_owner_id) VALUES ($1, $2, $3)';
  pool
    .query(queryText, [text, time, postOwnerId])
    .then(() => res.sendStatus(201))
    .catch((error) => console.log(error));
});

router.post('/withImage', upload.array('file', 5), (req, res) => {
  uploadPost(req, res);
});



router.put("/", (req, res) => {
  console.log(req.body);
  let content = req.body.content;
  let id = req.body.id;

  const queryText = `UPDATE "posts" SET content = $1 WHERE id = $2;`;
  pool
    .query(queryText, [content, id])
    .then(() => res.sendStatus(201))
    .catch((error) => console.log(error));
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  const queryText = `DELETE FROM "posts" WHERE id = $1;`;
  pool
    .query(queryText, [id])
    .then(() => res.sendStatus(201))
    .catch((error) => console.log(error));
});
//-----------------Post-----------------

//-----------------Like-----------------

router.post("/like", (req, res) => {
  let post_id = req.body.id;
  let userWhoLiked = req.body.userWhoLiked;

  console.log(post_id, userWhoLiked);
  const queryText =
    'INSERT INTO "likes" (post_id, user_who_liked) VALUES ($1, $2)';
  pool
    .query(queryText, [post_id, userWhoLiked])
    .then(() => res.sendStatus(201))
    .catch((error) => console.log(error));
});

router.delete("/like/:post_id/:user_id", (req, res) => {
  let postId = req.params.post_id;
  let userWhoLiked = req.params.user_id;
  const queryText = `DELETE FROM "likes" WHERE post_id = $1 AND user_who_liked = $2;`;
  pool
    .query(queryText, [postId, userWhoLiked])
    .then(() => res.sendStatus(201))
    .catch((error) => console.log(error));
});
//-----------------Like-----------------

//-----------------Comment-----------------
router.post("/comment", (req, res) => {
  let post_id = req.body.id;
  let userWhoCommentedId = req.body.userWhoCommentedId;
  let content = req.body.contentComment;
  let time = req.body.time;

  const queryText =
    'INSERT INTO "comments" (post_id, users_who_commented_id, content, time) VALUES ($1, $2, $3, $4)';
  pool
    .query(queryText, [post_id, userWhoCommentedId, content, time])
    .then(() => res.sendStatus(201))
    .catch((error) => console.log(error));
});

router.get("/comment/:id", (req, res) => {
  postId = req.params.id;
  console.log("post Id---->",postId);
  const queryText = `
  SELECT posts.*, comments.*, "user".name
  FROM posts
  JOIN comments 
  ON posts.id = comments.post_id
  JOIN "user" 
  ON "user".id = comments.users_who_commented_id
  WHERE posts.id = $1
  ORDER BY comments.id
  ;
  `;
  pool
    .query(queryText, [postId])
    .then((result) => {
      console.table(result.rows);
      res.send(result.rows);
    })
    .catch((error) => console.log(error));
});

router.put("/comment", (req, res) => {
  let content = req.body.content;
  let id = req.body.id;

  const queryText = `UPDATE "comments" SET content = $1 WHERE id = $2;`;
  pool
    .query(queryText, [content, id])
    .then(() => res.sendStatus(201))
    .catch((error) => console.log(error));
});

router.delete("/comment/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  const queryText = `DELETE FROM "comments" WHERE id = $1;`;
  pool
    .query(queryText, [id])
    .then(() => res.sendStatus(201))
    .catch((error) => console.log(error));
});
//-----------------Comment-----------------

module.exports = router;
