import { useState } from "react";

const MovieSearchBar = (props) => {
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.getUserInput(userInput);
    setUserInput("");
  };

  return (
    <div className="movieSearchBar">
      <h2> What do you feel like watching ? </h2>
      <form action="submit" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="movieSearchInput"></label>
        <input
          type="text"
          id="movieSearchInput"
          className="movieSearchInput"
          placeholder="Movie Title..."
          onChange={handleChange}
          autoComplete="off"
          value={userInput}
          required
        />
        <input className="movieSearchBarBtn" type="submit" value="Search" />
      </form>
    </div>
  );
};

export default MovieSearchBar;
