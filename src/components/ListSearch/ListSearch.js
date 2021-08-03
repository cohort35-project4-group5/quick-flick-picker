import firebase from "../../firebase";
import { useEffect, useState } from "react";
import { axios } from "react";

function ListSearch() {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("");
  const [time, setTime] = useState("");
  const [movedata, setMovieData] = useState([]);

  useEffect(function () {
    const dbRef = firebase.database().ref();

    dbRef.on("value", function (response) {
      const data = response.val();
      const movieObject = [];
      for (let propertyName in data) {
        const listObject = {
          key: propertyName,
          listName: data[propertyName].listName,
          movieList: data[propertyName].movieList,
        };
        movieObject.push(listObject);
      }

      console.log(movieObject);
      setMovies(movieObject);
    });
  }, []);

  useEffect(() => {
    let movieObjectsArray = [];
    const apiKey = "d29e1942e44de0965186873d8d6223e5";
    movies.map((movie) => {
      return axios({
        url: `https://api.themoviedb.org/3/movie/`,
        params: {
          key: apiKey,
          movie_id: movie.id,
        },
      }).then((res) => {
        movieObjectsArray.push(res.data);
        setMovieData(movieObjectsArray);
      });
    });
  }, []);

  const [userChoice, setUserChoice] = useState("placeholder");
  // Event listener - when user selects from the dropdown, update userChoice state to the value
  const handleUserChoice = (e) => {
    setUserChoice(e.target.value);
  };
  // Event listener - when user submits the form, call filterPhotos (created at App.js) function to filter the photos and updated the filteredPhotos state on the parent App component, so the page will reflect
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submittt!!");
    filterList(userChoice);
  };

  return (
    <div className="searchBox">
      <form onSubmit={handleSubmit}>
        {movies.map(function (movie) {
          return <li>{movie}</li>;
        })}
        <label for="movieList">Choose Your Movie from</label>
        <select id="TimeOptions" name="Movies" onChange={handleUserChoice}>
          <option value="time1">Option</option>
          <option value="time2">Option</option>
          <option value="time3">Option</option>
        </select>

        <select id="Genres" name="Movies">
          <option value="option">Option</option>
          <option value="option">Option</option>
          <option value="option">Option</option>
        </select>
        <input type="submit"></input>
      </form>
    </div>
  );
}
export default ListSearch;
