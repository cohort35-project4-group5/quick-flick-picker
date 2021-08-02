import firebase from "../../firebase.js";
import { useEffect, useState } from "react";
import { axios } from "react";

function ListSearch() {
	const [movies, setMovies] = useState([]);

	// Get list from main page list of lists, pass as a prop
	const [selectedList, setSelectedList] = useState("Oscar");

	// const [genre, setGenre] = useState('');
	// const [time, setTime] = useState('');
	const [movieData, setMovieData] = useState([]);

	useEffect(function () {
		const dbRef = firebase.database().ref();
		dbRef.on("value", function (response) {
			const data = response.val();
			const movieObject = [];
			for (let propertyName in data) {
				const listObject = {
					key: propertyName,
					listName: data[propertyName].listName,
					movieList: data[propertyName].movieList,
				};
				movieObject.push(listObject);
			}
			setMovies(movieObject);
		});
	}, []);

	const listToDisplay = [];
	for (const movie in movies) {
		if (movies[movie].listName === selectedList) {
			listToDisplay.push(movies[movie].movieList);
		}
	}

	console.log(listToDisplay);

	const IDArray = [];
	listToDisplay[0].forEach(([key, value]) => {
		console.log(key);
		IDArray.push(value);
	});

	console.log(IDArray);

	// useEffect(() => {
	// 	let movieObjectsArray = [];
	// 	const apiKey = "d29e1942e44de0965186873d8d6223e5";
	// 	movies.map((movie) => {
	// 		return axios({
	// 			url: `https://api.themoviedb.org/3/movie/`,
	// 			params: {
	// 				key: apiKey,
	// 				// pass in key from firebase list as movie_id parameter
	// 				movie_id: movie,
	// 			},
	// 		}).then((res) => {
	// 			movieObjectsArray.push(res.data);
	// 			setMovieData(movieObjectsArray);
	// 		});
	// 	});
	// }, []);

	// const {} = movieData;
	return (
		<div className="searchBox">
			<h2>{}</h2>
			<form>
				{movieData.map(function (movie) {
					return <li>{movie}</li>;
				})}
				<label for="movieList">Choose Your Movie from</label>
				<select id="TimeOptions" name="Movies">
					<option value="time1">Option</option>
					<option value="time2">Option</option>
					<option value="time3">Option</option>
				</select>
				<select id="Genres" name="Movies">
					<option value="option">Option</option>
					<option value="option">Option</option>
					<option value="option">Option</option>
				</select>
				<input type="submit"></input>
			</form>
		</div>
	);
}

export default ListSearch;
