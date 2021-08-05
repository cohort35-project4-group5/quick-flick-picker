import { useEffect, useState } from "react";
import axios from "axios";
import firebase from "../../firebase";
import Swal from "sweetalert2";
import MovieSearchBar from "./MovieSearchBar/MovieSearchBar";
import SearchedMoviesList from "./SearchedMoviesList/SearchedMoviesList";
import UserMovieLists from "./UserMovieLists/UserMovieLists";

const MainPage = () => {
  const defaultMovieToShow = "movie";
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
        if (res.data.results.length === 0) {
          setUserInput("");
          // Change text to suit the response needed
          let message = "Coudln't find that movie. Please try another title!";
          Swal.fire({
            background: "#242424",
            icon: "warning",
            iconColor: "#e50914",
            confirmButtonText: "OK",
            confirmButtonColor: "#e50914",
            allowEnterKey: true,
            allowEscapeKey: true,
            html:
              // Change title to suit the application
              "<div><h2 style='color:white;margin-bottom: 20px'>Error!</h2><p style='color:white'>" +
              message +
              "</p></div>",
          });
        } else {
          setMoviesArray(res.data.results);
        }
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
      setMovieLists(moviesArray);
    });
  }, []);

  const getUserInput = (userInput) => {
    setUserInput(userInput);
  };

  return (
    <div className="mainPage">
      <MovieSearchBar getUserInput={getUserInput} />
      <section className="mainPageFlexContainer">
        <SearchedMoviesList moviesArray={moviesArray} movieLists={movieLists} />
        <UserMovieLists movieLists={movieLists} />
      </section>
    </div>
  );
};

export default MainPage;
