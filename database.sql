
CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "name" VARCHAR (80)
);

CREATE TABLE "meal_plan"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL
        REFERENCES "user" (id)
     ON DELETE CASCADE,
    "meal_title" VARCHAR (200),
    "meal_type" VARCHAR (20),
    "meal_description" VARCHAR (500),
    "date" date,
    "recipe_id" int
);

CREATE TABLE "favorite_list"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL
        REFERENCES "user" (id)
     ON DELETE CASCADE,
    "recipe_id" INT NOT NULL,
    "title" VARCHAR (200) NOT NULL,
    "image" VARCHAR (300 )NOT NULL,
    "summary" text NOT NULL
);

CREATE TABLE "tried_list"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL
        REFERENCES "user" (id)
     ON DELETE CASCADE,
    "recipe_id" INT NOT NULL,
    "title" VARCHAR (200) NOT NULL,
    "image" VARCHAR (300 )NOT NULL,
    "summary" text NOT NULL
);

CREATE TABLE "payment"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL
        REFERENCES "user" (id)
         ON DELETE CASCADE,
    "amount" INT NOT NULL,
    "note" VARCHAR (200) NOT NULL,
    "date" date
);


CREATE TABLE "posts"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL
        REFERENCES "user" (id)
         ON DELETE CASCADE,
    "content" TEXT NOT NULL,
    "image" VARCHAR (200),
    "time" timestamp with time zone,
    "count_liked" INT DEFAULT 0
         REFERENCES "likes" (id)
         ON DELETE CASCADE,
    "comment_id" TEXT
);

CREATE TABLE "likes" (
    "id" SERIAL PRIMARY KEY,
    "post_id" INT NOT NULL
         REFERENCES "posts" (id)
         ON DELETE CASCADE,
    "user_who_liked" INT NOT NULL
         REFERENCES "user" (id)
         ON DELETE CASCADE
    );

CREATE TABLE "comments" (
    "id" SERIAL PRIMARY KEY,
    "post_id" INT NOT NULL
         REFERENCES "posts" (id)
         ON DELETE CASCADE,
	"content" TEXT NOT NULL,
    "users_who_commented_id" INT NOT NULL
         REFERENCES "user" (id)
         ON DELETE CASCADE,
	"time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

