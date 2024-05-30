import React, { useState, useEffect } from "react";
import CardList from "../components/CardList.js";
import Searchbox from "../components/Searchbox.js";
// import { robots } from "./robots";
import Scroll from "../components/scroll.js";
import ErrorBoundry from "../components/errorboundry.js";
import "./App.css";

function App() {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setRobots(users));
    console.log(count);
  }, [count]); // only run if count changes.

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  if (robots.length === 0) {
    return <h1>Loading</h1>;
  } else {
    return (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Click me!
        </button>
        <Searchbox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
