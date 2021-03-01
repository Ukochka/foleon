import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "./components/ResourcePage/Header";
import Page from "./components/ResourcePage";
import SearchBar from "./components/Search";
import Tabs from "./components/Tabs/Tabs";
import "./App.scss";
import ResourceCard from "./components/ResourceCard";
import { getAllProjects } from "./Resources/Projects/dataService";
import {
  getPublicationPerProject,
  getPublications,
} from "./Resources/Publications/dataService";
import { withNamespaces } from "react-i18next";

import "./locales/i18n";

function App({ t }) {
  const [searchInput, setSearchInput] = useState("");
  const [activeTab, setActiveTab] = useState({
    label: t("allPublications"),
    projectId: null,
  });
  const [pageCount, setPageCount] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [projects, setProjects] = useState([]);
  const [publications, setPublications] = useState([]);
  const [allPublications, setAllPublications] = useState([]);

  const getTabs = () => {
    const publicationTab = (name, id) => (
      <div label={name} projectId={id} key={id}>
        <div className="CardsField">
          <InfiniteScroll
            dataLength={publications.length}
            next={fetchNextPublications.bind(null, pageCount, 20)}
            hasMore={hasMore}
            className="SearchResultField"
          >
            {publications.length > 0 &&
              publications.map((publication) => (
                <ResourceCard
                  key={publication.id}
                  type="publication"
                  title={publication.name}
                  link={publication._links.self.href}
                ></ResourceCard>
              ))}
          </InfiniteScroll>
        </div>
      </div>
    );
    const tabs = [publicationTab(t("allPublications"), null)];
    projects.map((prj) => tabs.push(publicationTab(prj.name, prj.id)));
    return tabs;
  };

  const fetchData = async () => {
    const dataProjects = await getAllProjects();
    await setProjects(dataProjects || []);

    const dataPulications = await getPublications(1, 20);

    await setAllPublications(dataPulications || []);
    await setPublications(dataPulications || []);
  };

  const fetchNextPublications = async (page, limit) => {
    if (publications.length >= 126) {
      setHasMore(false);
      return;
    }
    const data = await getPublications(page, limit);

    await setPublications(publications.concat(data));
    await setPageCount(pageCount + 1);
  };

  const updateInput = (searchInput) => {
    const filteredPublications = allPublications.filter((publication) => {
      return publication.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    setSearchInput(searchInput);
    setPublications(filteredPublications);
  };
  const onSelectedTabChanged = async (activeTab) => {
    setActiveTab({ label: activeTab.label, projectId: activeTab.projectId });
    const publication = await getPublicationPerProject(activeTab.projectId);
    setPublications(publication);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Page>
        <Header t={t}></Header>
        <div className="SearchField">
          <SearchBar input={searchInput} onChange={updateInput} t={t} />
        </div>
        <div className="TabsField">
          <Tabs onClickTabItem={onSelectedTabChanged} activeTab={activeTab}>
            {getTabs()}
          </Tabs>
        </div>
      </Page>
    </div>
  );
}

export default withNamespaces()(App);
