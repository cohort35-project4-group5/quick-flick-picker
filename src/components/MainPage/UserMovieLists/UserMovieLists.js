// import { useEffect, useState } from "react";
// import firebase from "../../../firebase";

const UserMovieLists = (props) => {
  return (
    <div className="UserMovieLists">
      <h3>Movie WatchLists</h3>

      {/* Make a Link to Route it to the next page with <movie.key> */}
      <ul>
        {props.movieLists.map((movie, i) => {
          console.log(movie.key);
          return <li key={i}>{movie.listName}</li>;
        })}
      </ul>
    </div>
  );
};

export default UserMovieLists;
