import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Area from "./components/Area";

function App() {
  const [group, setGroup] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);

  const handleCreateGroup = (newGroup) => {
    const updatedGroups = [...group, newGroup];
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
    setGroup(updatedGroups);
    console.log(updatedGroups);
    console.log("groups", group);
  };
  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem("groups"));
    if (savedGroups) {
      setGroup(savedGroups);
      console.log("savedgroups", savedGroups);
    }
  }, []);

  const handleGroupClick = (clickedGroup) => {
    setSelectedGroup(clickedGroup);
    setIsMobileView(true);

    console.log("selected", selectedGroup);
  };
  const handleBack = () => {
    setIsMobileView(false);
  };

  return (
    <div className="notes-app">
      {isMobileView ? (
        <>
          <Sidebar
            group={group}
            onGroupClick={handleGroupClick}
            onCreateGroup={handleCreateGroup}
          />
          <Area groupItem={selectedGroup} />
        </>
      ) : (
        <>
          {!isMobileView && (
            <Sidebar
              group={group}
              onGroupClick={handleGroupClick}
              onCreateGroup={handleCreateGroup}
            />
          )}
          {isMobileView && (
            <Area groupItem={selectedGroup} handleBack={handleBack} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
