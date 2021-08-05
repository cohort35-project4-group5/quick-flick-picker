import { useState } from "react";
import ListModal from "../../ListModal/ListModal";
import { Link } from "react-router-dom";

const UserMovieLists = (props) => {
  const [toggleModal, setToggleModal] = useState(false);
  const toggleListManager = () => {
    setToggleModal(!toggleModal);
  };

  return (
    <div className="userMovieLists">
      <div>
        <h3>My Movie Lists</h3>
        <ul>
          {props.movieLists.map((movie, i) => {
            return (
              <Link key={i} to={`/list/${movie.listName}`}>
                <li>{movie.listName}</li>
              </Link>
            );
          })}
        </ul>
        <button onClick={toggleListManager}>Manage Lists</button>
      </div>
      {toggleModal === true ? (
        <ListModal toggleListManager={toggleListManager} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default UserMovieLists;
