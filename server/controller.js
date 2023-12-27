const axios = require("axios");

const getContributionCounts = async (contributionData) => {
  const contributionCounts = [];
  const days = [];
  contributionData.forEach((entry) => {
    entry.contributionDays.forEach((day) => {
      // contributionCounts.push({ x: day.date, y: day.contributionCount });
      contributionCounts.push(day.contributionCount);
      days.push(day.date);
    });
  });
  return { x: days, y: contributionCounts };
};

const transform = async (data) => {
  const totalContributions =
    data.data.data.user.contributionsCollection.contributionCalendar
      .totalContributions;
  const contributionData =
    data.data.data.user.contributionsCollection.contributionCalendar.weeks;

  const completeData = await getContributionCounts(contributionData);

  return {
    totalContribution: totalContributions,
    contributionData: completeData,
  };
};

const getContributions = async (req, res) => {
  const username = req.body.username;
  const token = "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";
  const headers = {
    Authorization: `bearer ${token}`,
  };

  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const iso8601Today = today.toISOString();
  const iso8601OneYearAgo = oneYearAgo.toISOString();

  const body = {
    query: `query {
        user(login: "${username}") {
            email
            createdAt
            contributionsCollection(from: "${iso8601OneYearAgo}", to: "${iso8601Today}") {
            contributionCalendar {
                totalContributions
                weeks {
                contributionDays {
                    weekday
                    date
                    contributionCount
                    color
                }
                }
                months  {
                name
                    year
                    firstDay
                totalWeeks

                }
            }
            }
        }

    }`,
  };

  try {
    const response = await axios.post("https://api.github.com/graphql", body, {
      headers: headers,
    });
    const data = await transform(response);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProfile = async (req, res) => {
  const username = req.query.username;
  const token =
    "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";
  const headers = {
    Authorization: `bearer ${token}`,
  };

  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const data = response.data;
    res.json({ profile: data.avatar_url });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getContributions,
  getProfile,
};
