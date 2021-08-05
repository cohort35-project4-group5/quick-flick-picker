import { useState } from "react";

const MovieSearchBar = (props) => {
  const [userInput, setUserInput] = useState("matrix");

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.getUserInput(userInput);
  };

  return (
    <div className="movieSearchBar">
      <h2>What do you feel like watching?</h2>
      <form action="submit" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="movieSearchInput">
          Movie Title:
        </label>
        <input
          type="text"
          id="movieSearchInput"
          placeholder="Movie Title"
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
};

export default MovieSearchBar;
