import { useEffect, useState } from "react";
import axios from "axios";
import firebase from "../../firebase";

import MovieSearchBar from "./MovieSearchBar/MovieSearchBar";
import SearchedMoviesList from "./SearchedMoviesList/SearchedMoviesList";
import UserMovieLists from "./UserMovieLists/UserMovieLists";

const MainPage = () => {
  const defaultMovieToShow = "";
  const [userInput, setUserInput] = useState(defaultMovieToShow);
  const [moviesArray, setMoviesArray] = useState([]);
  const [movieLists, setMovieLists] = useState([]);

  useEffect(() => {
    const apiKey = "b1d6597a25d870717493d54e43e127e0";
    const apiUrl = "https://api.themoviedb.org/3/search/movie";

    if (userInput !== "") {
      axios({
        url: apiUrl,
        method: "GET",
        dataResponse: "json",
        params: {
          format: "json",
          api_key: apiKey,
          query: userInput,
        },
      }).then((res) => {
        console.log(res.data.results);
        const movieIdArray = res.data.results.map((movieObj) => {
          return movieObj.id;
        });
        console.log(movieIdArray);
        setMoviesArray(movieIdArray);
      });
    }
  }, [userInput]);

  useEffect(() => {
    const dbRef = firebase.database().ref();

    dbRef.on("value", (snapshot) => {
      const myData = snapshot.val();
      const moviesArray = [];
      for (let key in myData) {
        const itemObj = {
          key: key,
          listName: myData[key].listName,
          movieList: myData[key].movieList,
        };
        moviesArray.push(itemObj);
      }
      console.log(moviesArray);
      setMovieLists(moviesArray);
    });
  }, []);

  const getUserInput = (userInput) => {
    setUserInput(userInput);
  };

  return (
    <div className="mainPage">
      <MovieSearchBar getUserInput={getUserInput} />
      <SearchedMoviesList moviesArray={moviesArray} movieLists={movieLists} />
      <UserMovieLists movieLists={movieLists} />
    </div>
  );
};

export default MainPage;
