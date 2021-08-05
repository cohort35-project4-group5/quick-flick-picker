import { ImCross } from "react-icons/im";
import firebase from "firebase";
import { useState } from "react";

function MovieCardDisplay(props) {
	const imageURL = "https://image.tmdb.org/t/p/w200";
	const [movieToDelete, setMovieToDelete] = useState(props.id);
	const [listItemToDelete, setListItemToDelete] = useState("");

	const handleMovieDelete = (e) => {
		e.preventDefault();
		setMovieToDelete(e.target.value);
		for (const listItem in props.list) {
			if (props.list[listItem] === movieToDelete) {
				setListItemToDelete(listItem);
			}
		}
		console.log(listItemToDelete, movieToDelete)

		if (listItemToDelete !== ''){
			const dbRef = firebase.database().ref();
			const selectedList = props.selectedList;
			const movieList = "movieList";
			dbRef
				.child(selectedList)
				.child(movieList)
				.child(listItemToDelete)
				.remove();
		}
	};

	return (
		<div className="listPoster">
			<div
				className="deleteMovie"
				value={props.id}
				onClick={handleMovieDelete}
				onKeyDown={e => e.key === 'Enter' && handleMovieDelete}
				tabIndex={0}
			>
				<span className="deleteMovieSymbol">
					<ImCross />
				</span>
			</div>
			<img src={`${imageURL}${props.posterPath}`} alt={props.altText} />
		</div>
	);
}

export default MovieCardDisplay;
