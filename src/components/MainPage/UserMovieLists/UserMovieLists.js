import { useState } from "react";
import ListModal from "../../ListModal/ListModal";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserMovieLists = (props) => {
  const [toggleModal, setToggleModal] = useState(false);

  const openListManager = () => {
    setToggleModal(!toggleModal);
  };

  const errorHandling = () => {
    // Change text to suit the response needed
    let message =
      "This list is empty. Please add some movies to it on the home page!";
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
        "<div><h2 style='color:white;margin-bottom: 20px'>Heads Up!</h2><p style='color:white'>" +
        message +
        "</p></div>",
    });
  };

  return (
    <div className="userMovieLists">
      <div>
        <h3>My Movie Lists</h3>
        <ul>
          {props.movieLists.map((movie, i) => {
            return movie.movieList !== undefined ? (
              <Link key={i} to={`/list/${movie.listName}`}>
                <li>{movie.listName}</li>
              </Link>
            ) : (
              <li key={i} onClick={errorHandling}>
                {movie.listName}
              </li>
            );
          })}
        </ul>
        <button onClick={openListManager}>Manage Lists</button>
      </div>
      {toggleModal === true ? (
        <div className="listModalContainer">
          <ListModal />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default UserMovieLists;
