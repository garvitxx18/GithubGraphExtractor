const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const port = 5000;
const routes = require("./routes");
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World");
});

// async function getContributions(username) {
//   // const username = request.body.username;
//   const token = "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";
//   const headers = {
//     Authorization: `bearer ${token}`,
//   };

//   const body = {
//     query: `query {
//         user(login: "${username}") {
//             email
//             createdAt
//             contributionsCollection(from: "2019-09-28T23:05:23Z", to: "2020-09-28T23:05:23Z") {
//             contributionCalendar {
//                 totalContributions
//                 weeks {
//                 contributionDays {
//                     weekday
//                     date
//                     contributionCount
//                     color
//                 }
//                 }
//                 months  {
//                 name
//                     year
//                     firstDay
//                 totalWeeks

//                 }
//             }
//             }
//         }

//     }`,
//   };

//   try {
//     const response = await axios.post("https://api.github.com/graphql", body, {
//       headers: headers,
//     });
//     if (response) {
//       const data = response.data;
//       if (data && data.user && data.user.contributionsCollection) {
//         console.log(data.user.contributionsCollection);
//       } else {
//         console.error("Unexpected response structure:", data);
//       }
//       return data;
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error.message);
//     throw error;
//   }
// }

// getContributions("garvitxx18");

app.use("/api", routes);

app.listen(port, () => console.log("listening on port 5000"));
