import React, { Component, useEffect, useState } from "react";
import { MDBCol, MDBFormInline, MDBBtn } from "mdbreact";
import Profile from "../Profile/Profile";
import "./Main.css";
import Graph from "../Graph/Graph";

const Main = () => {
  const [username, setUserName] = useState("");
  const [totalContribution, setTotalContribution] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [display, setDisplay] = useState(false);
  const [days, setDays] = useState([]);

  useEffect(() => {
    console.log("i triggered");
  }, [totalContribution, graphData]);
  async function getData(event) {
    setDisplay(false);
    console.log("getData got triggered");
    const response = await fetch("http://localhost:5000/api/getContributions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    });
    const data = await response.json();
    setTotalContribution(data.totalContribution);
    setGraphData(data.contributionData.y);
    setDays(data.contributionData.x);
    setDisplay(true);
  }

  return (
    <div className="main-div">
      <MDBCol md="12">
        <MDBFormInline className="md-form mr-auto mb-4">
          <input
            className="form-control mr-sm-4"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <MDBBtn
            gradient="aqua"
            rounded
            size="sm"
            type="button"
            className="mr-auto"
            onClick={() => {
              getData();
            }}
          >
            Search
          </MDBBtn>
        </MDBFormInline>
      </MDBCol>
      <hr></hr>
      {display && <Profile username={username} />}
      {display && (
        <Graph
          totalContribution={totalContribution}
          graphData={graphData}
          days={days}
        />
      )}
    </div>
  );
};

export default Main;
