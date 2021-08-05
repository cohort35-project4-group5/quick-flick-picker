import { useState } from "react";
import ListModal from "../../ListModal/ListModal";
import { Link } from "react-router-dom";

const UserMovieLists = (props) => {
	const [toggleModal, setToggleModal] = useState(false);

	const openListManager = () => {
		setToggleModal(!toggleModal);
	};

	return (
		<div className="userMovieLists">
			<div>
				<h3>My Movie Lists</h3>
				<ul>
					{props.movieLists.map((movie, i) => {
						return (
							<Link to={`/list/${movie.listName}`}>
								<li key={i}>{movie.listName}</li>
							</Link>
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
