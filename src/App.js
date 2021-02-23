import React, { useState, useEffect } from "react";
import Header from "./components/ResourcePage/Header";
import Page from "./components/ResourcePage";
import "./App.css";
import ResourceCard from "./components/ResourceCard";
import { getAllProjects } from "./Resources/Projects/dataService";
import { getAllPublications } from "./Resources/Publications/dataService";

function App() {
  const [projects, setProjects] = useState([]);
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const dataProjects = getAllProjects();
    dataProjects.then((projectsArray) => setProjects(projectsArray || []));
    const dataPulications = getAllPublications();
    dataPulications.then((publicationsArray) =>
      setPublications(publicationsArray || [])
    );
  }, []);

  return (
    <div className="App">
      <Page>
        <Header></Header>

        <div className="CardsField">
          <div className="SearchResultField">
            {projects.length > 0 &&
              projects.map((project) => (
                <ResourceCard
                  key={project.id}
                  type="project"
                  title={project.name}
                  link={project._links.self.href}
                ></ResourceCard>
              ))}
            {publications.length > 0 &&
              publications.map((publication) => (
                <ResourceCard
                  key={publication.id}
                  type="publication"
                  title={publication.name}
                  link={publication._links.self.href}
                ></ResourceCard>
              ))}
          </div>
        </div>
      </Page>
    </div>
  );
}

export default App;
