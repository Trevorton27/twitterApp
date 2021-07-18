const { default: axios } = require("axios");
const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const token =
  "AAAAAAAAAAAAAAAAAAAAAChVRgEAAAAAyXZ3VakgE7I5ycTefsVpoyGFug0%3DGfgQoVK9GyXe84B8CegSA0sCQ7XNTK6WlCfVsYiChiLYC3Tpc0";

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/api/getUser/:username", (req, res) => {
  const user = req.params.username;
  axios
    .get(
      `https://api.twitter.com/2/users/by/username/${user}?user.fields=location,profile_image_url,public_metrics`,
      { headers: { authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      console.log(response);
      const user = response.data.data;
      user.author_id = user.id;
      response.status !== 404 ? res.send(user) : res.send({ status: 404 });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/api/getUserTweets/:userID", (req, res) => {
  const id = req.params.userID;
  axios
    .get(
      `https://api.twitter.com/2/users/${id}/tweets?max_results=10&expansions=author_id&tweet.fields=author_id,created_at,id,text&user.fields=profile_image_url,username,url`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      const numberOfTweets = response.data.meta.result_count;

      if (numberOfTweets === 0) res.send({ status: 404 });
      else {
        const usersArray = response.data.includes.users;
        const tweetsArray = response.data.data;
        let tweetsWithUserInfo = [];

        for (let i = 0; i < tweetsArray.length; i++) {
          tweetsArray[i].created_at = tweetsArray[i].created_at.split("T");
          console.log(tweetsArray[i]);
          tweetsWithUserInfo[i] = { ...usersArray[0], ...tweetsArray[i] };
        }

        res.send(tweetsWithUserInfo);
      }
    })
    .catch((error) => {
      res.send({ status: 404 });
      console.log(error);
    });
});

app.get("/api/getTweets/:searchedText", (req, res) => {
  const searchedText = req.params.searchedText;
  axios
    .get(
      `https://api.twitter.com/2/tweets/search/recent?query=${searchedText}&tweet.fields=author_id,created_at&expansions=author_id&user.fields=description,id,location,name,profile_image_url,username`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      const numberOfTweets = response.data.meta.result_count;

      if (numberOfTweets === 0) res.send({ status: 404 });
      else {
        const usersArray = response.data.includes.users;
        const tweetsArray = response.data.data;
        let tweetsWithUsers = [];

        for (let i = 0; i < tweetsArray.length; i++) {
          tweetsWithUsers[i] = { ...usersArray[i], ...tweetsArray[i] };
        }
        res.send(tweetsWithUsers);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/api/defaultFavoriteUsers", (req, res) => {
  axios
    .get(
      "https://api.twitter.com/2/users/by?usernames=elonmusk,tonystark,ufc&user.fields=location,profile_image_url,public_metrics",
      {
        headers: { authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      const favorites = response.data.data;
      for (let i = 0; i < favorites.length; i++)
        favorites[i].author_id = favorites[i].id;
      console.log();
      res.send(response.data.data);
    });
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});
