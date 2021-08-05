import { useState } from "react";
// import firebase from "../../../firebase";
import ListModal from "../../ListModal/ListModal";

const UserMovieLists = (props) => {
  const [toggleModal, setToggleModal] = useState(false);

  const openListManager = () => {
    setToggleModal(!toggleModal);
  };

  return (
    <div className="userMovieLists">
      <div>
        <h3>My Movie Lists</h3>
        {/* Make a Link to Route it to the next page with <movie.key> */}
        <ul>
          {props.movieLists.map((movie, i) => {
            return <li key={i}>{movie.listName}</li>;
          })}
        </ul>
        <button onClick={openListManager}>Manage Lists</button>
      </div>
      {toggleModal == true ? (
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
