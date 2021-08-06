import { useState, useEffect } from "react";
import MovieDisplay from "../../MovieDisplay/MovieDisplay";
import firebase from "../../../firebase";
import { FaTimesCircle } from 'react-icons/fa';


const SearchedMoviesList = (props) => {
  const [selectedList, setSelectedList] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");

  const handleChange = (e) => {
    setSelectedList(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref();
    if (selectedList !== "") {
      dbRef.child(selectedList).child("movieList").push(selectedMovie);
    }
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
            <MovieDisplay movieID={selectedMovie} />

            <form
              className="addMovieForm"
              action="submit"
              onSubmit={handleSubmit}
            >
              <label htmlFor="movieListsSelect" className="sr-only">
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
                  Select List
                </option>
                {props.movieLists.map((movieList, i) => {
                  return (
                    <option key={i} value={movieList.key}>
                      {movieList.listName}
                    </option>
                  );
                })}
              </select>
              <input className="addToList" type="submit" value="Add to List" />
            </form>
            <button className="closeBtn" onClick={closeMovieDetails}><FaTimesCircle/></button>
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
            >

              {/* <p>ID: {movieObj.id}</p> */}
              <div className="posterImg" >
                <img onClick={() => selectMovie(movieObj.id)}
                  onKeyDown={e => e.key === 'Enter' && selectMovie(movieObj.id)}
                  tabIndex={0}
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
