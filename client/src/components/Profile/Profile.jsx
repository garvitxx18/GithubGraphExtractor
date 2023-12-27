import React, { useEffect, useState } from "react";
import "./Profile.css";

const Profile = (props) => {
  useEffect(() => {
    getProfile();
  }, []);
  const username = props.username;
  const [profileLink, setProfileLink] = useState("");
  console.log(username);
  async function getProfile(event) {
    const response = await fetch(
      "http://localhost:5000/api/getProfile?" +
        new URLSearchParams({
          username: username,
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setProfileLink(data.profile);
  }

  return (
    <div>
      <h2>Profile</h2>
      <img src={profileLink} alt="profile"></img>
    </div>
  );
};

export default Profile;
