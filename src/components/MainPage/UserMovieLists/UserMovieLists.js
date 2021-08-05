import { useState } from "react";
// import firebase from "../../../firebase";
import ListModal from "../../ListModal/ListModal";
import { Link, Route } from "react-router-dom";
import SetList from "../../SetList/SetList";

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
            return (
              <li key={i}>
                <Link to={`/list/${movie.listName}`}>{movie.listName}</Link>
              </li>
            );
          })}
          <Route path="/list/:listname" component={SetList} />
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
