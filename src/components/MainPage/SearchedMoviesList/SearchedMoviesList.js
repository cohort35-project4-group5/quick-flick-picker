import { useState, useEffect } from "react";

const SearchedMoviesList = (props) => {
  const [selectedList, setSelectedList] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");

  const handleChange = (e) => {
    setSelectedList(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const selectMovie = (selectedKey) => {
    setSelectedMovie(selectedKey);
  };

  useEffect(() => {
    setSelectedMovie("");
  }, [props]);

  const closeMovieDetails = () => {
    setSelectedMovie("");
  };

  return (
    <div className="searchedMoviesList">
      {selectedMovie !== "" ? (
        <div className="movieDetailsContainer">
          <div>
            {/* Insert Josh's movie display component */}
            <p>Display Movie ID: {selectedMovie}</p>
            <form
              className="addMovieForm"
              action="submit"
              onSubmit={handleSubmit}
            >
              <label htmlFor="movieListsSelect" className="sr-only">
                Category:
              </label>
              <select
                name="movieListsSelect"
                id="movieListsSelect"
                className="movieListsSelect"
                onChange={handleChange}
                value={selectedList}
                required
              >
                <option disabled value="">
                  Select Category
                </option>
                {props.movieLists.map((movieList, i) => {
                  return (
                    <option key={i} value={movieList.key}>
                      {movieList.listName}
                    </option>
                  );
                })}
              </select>
              <input type="submit" value="Add to List" />
            </form>
            <button onClick={closeMovieDetails}>Exit</button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <ul>
        {props.moviesArray.map((movieObj, i) => {
          return (
            <li
              key={`movie${i}`}
              className="movieContainer"
              onClick={() => selectMovie(movieObj.id)}
            >
              {/* <p>ID: {movieObj.id}</p> */}
              <div className="posterImg">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieObj.poster_path}`}
                  alt={`Poster of ${movieObj.title}`}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchedMoviesList;
