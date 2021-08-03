// import { useEffect, useState } from "react";
// import firebase from "../../../firebase";

const UserMovieLists = (props) => {
  return (
    <div className="userMovieLists">
      <h3>My Movie Lists</h3>
      {/* Make a Link to Route it to the next page with <movie.key> */}
      <ul>
        {props.movieLists.map((movie, i) => {
          return <li key={i}>{movie.listName}</li>;
        })}
      </ul>
      <button>Manage Lists</button>
    </div>
  );
};

export default UserMovieLists;
