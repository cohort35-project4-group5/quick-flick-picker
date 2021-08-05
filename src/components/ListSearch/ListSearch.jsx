import { useState } from "react";
import Swal from "sweetalert2";
import MovieSearchBar from "../MainPage/MovieSearchBar/MovieSearchBar";
import MovieDisplay from "../MovieDisplay/MovieDisplay";

const ListSearch = (props) => {
	const [genre, setGenre] = useState("Action");
	const [runTime, setRunTime] = useState(89);
	const genresArray = props.genres;
	const runTimesArray = props.runTimes;
	const idsArray = props.ids;

	let uniqueGenres = [];

	for (const genres in genresArray) {
		for (const genre in genresArray[genres]) {
			if (!uniqueGenres.includes(genresArray[genres][genre].name)) {
				uniqueGenres.push(genresArray[genres][genre].name);
			}
		}
	}

	const errorHandling = () => {
		Swal.fire({
			title: "Error!",
			text: "No movies match your search. Please try again!",
			icon: "error",
			confirmButtonText: "OK",
		});
	};

	const returnRandomMatchedMovie = (array) => {
		return array[Math.floor(Math.random() * array.length)];
	};

	const handleGenreOption = (e) => {
		setGenre(e.target.value);
	};

	const handleRunTimeOption = (e) => {
		setRunTime(e.target.value);
	};

	let matchedMovies = [];
	const handleSubmit = (e) => {
		e.preventDefault();
		let movieGenres = [];
		let allMovieGenres = [];

		for (let i = 0; i < idsArray.length; i++) {
			for (let j = 0; j < genresArray[i].length; j++) {
				movieGenres.push(genresArray[i][j].name);
				if (movieGenres.length === genresArray[i].length) {
					allMovieGenres.push(movieGenres);
					movieGenres = [];
				}
			}
			if (
				allMovieGenres[i].includes(genre) &&
				runTimesArray[i] <= runTime
			) {
				matchedMovies.push(idsArray[i]);
			}
		}
		if (matchedMovies.length === 0){
			errorHandling();
		}
		const suggestedMovie = returnRandomMatchedMovie(matchedMovies);
		props.returnValue(suggestedMovie);
	};

	return (
			<div className="searchBox">
				<form onSubmit={handleSubmit}>
					<label for="movieList">I want to watch a </label>
					<select
						id="genres"
						name="genres"
						onChange={handleGenreOption}
					>
						{uniqueGenres.map((i) => {
							return <option value={i}>{i}</option>;
						})}
					</select>
					<label htmlFor="movieList"> movie and I have </label>
					<select
						id="runTimes"
						name="runTimes"
						onChange={handleRunTimeOption}
					>
						<option value={89}>Less than 1.5 hours</option>
						<option value={119}>Less than 2 hours</option>
						<option value={999}>All the time in the world!</option>
					</select>
					<button type="submit">Find a movie!</button>
				</form>
				<br />
			</div>
	);
};
export default ListSearch;
