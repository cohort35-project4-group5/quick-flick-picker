import { useState } from "react";

const ListSearch = (props) => {
	const [genre, setGenre] = useState("");
	const [runTime, setRunTime] = useState("");
	const genresArray = props.genres;
	const runTimesArray = props.runTimes;

	let uniqueGenres = [];
	for (const genres in genresArray) {
		for (const genre in genresArray[genres]) {
			if (!uniqueGenres.includes(genresArray[genres][genre].name)) {
				uniqueGenres.push(genresArray[genres][genre].name);
			}
		}
	}

	const handleGenreOption = (e) => {
		setGenre(e.target.value);
	};

	const handleRunTimeOption = (e) => {
		setRunTime(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="searchBox">
			<form onSubmit={handleSubmit}>
				<label for="movieList">I want to watch a </label>
				<select id="genres" name="genres" onChange={handleGenreOption}>
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
					<option value="89">Less than 1.5 hours</option>
					<option value="119">Less than 2 hours</option>
					<option value="120">All the time in the world!</option>
				</select>
				<button type="submit">Find a movie!</button>
			</form>
			<br />
		</div>
	);
};
export default ListSearch;
