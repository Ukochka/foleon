import React, { useState, useEffect } from "react";
import Header from "./components/ResourcePage/Header";
import Page from "./components/ResourcePage";
import "./App.css";
import ResourceCard from "./components/ResourceCard";

function App() {
  const [projects, setProjects] = useState({ hits: [] });
  useEffect(() => {
    // fetch("https://api.foleon.com/v2/magazine/title", {
    fetch("https://api.foleon.com/v2/magazine/edition", {
      method: "GET",
      headers: {
        Authorization: "Bearer 2a4cf99a690bcde8284b1d77cefb9960125fdc39",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setProjects(res._embedded.edition);
        console.log("DATA ", res._embedded.edition);
      });
  }, []);

  return (
    <div className="App">
      <Page>
        <Header></Header>
        <div className="CardsField">
          {projects.length > 0 &&
            projects.map((project) => (
              <ResourceCard
                key={project.id}
                title={project.name}
                link={project._links.self.href}
              ></ResourceCard>
            ))}
        </div>
      </Page>
    </div>
  );
}

export default App;
