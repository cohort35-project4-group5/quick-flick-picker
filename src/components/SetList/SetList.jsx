import firebase from "../../firebase.js";
import { useState, useEffect } from "react";
import axios from "axios";

// npm install sweetalert2
// import Swal from 'sweetalert2'
import Swal from "sweetalert2";
import MovieCardDisplay from "./MovieCardDisplay.jsx";
import "./SetList.css";
import ListSearch from "../ListSearch/ListSearch.jsx";
import MovieDisplay from "../MovieDisplay/MovieDisplay.js";

const SetList = () => {
	const [list, setList] = useState([]);
	const [matchedMovie, setMatchedMovie] = useState("");
	const [newSearch, setNewSearch] = useState(false);

	// Get list from main page list of lists, pass as a prop
	const selectedList = "Oscar";

	const [movieData, setMovieData] = useState([]);

	const errorHandling = () => {
		Swal.fire({
			title: "Error!",
			text: "Unable to find that movie. Please try again!",
			icon: "error",
			confirmButtonText: "OK",
		});
	};

	useEffect(function () {
		const dbRef = firebase.database().ref();
		dbRef.on("value", function (response) {
			const data = response.val();
			const listObjects = [];
			for (let propertyName in data) {
				const listObject = {
					key: propertyName,
					listName: data[propertyName].listName,
					movieList: data[propertyName].movieList,
				};
				listObjects.push(listObject);
			}
			setList(listObjects);
		});
	}, []);

	let listToDisplay = [];
	for (const item in list) {
		if (list[item].listName === selectedList) {
			listToDisplay.push(list[item].movieList);
		}
	}
	listToDisplay = listToDisplay.shift();

	const IDArray = [];
	for (const movie in listToDisplay) {
		IDArray.push(listToDisplay[movie]);
	}

	useEffect(() => {
		let movieObjectsArray = [];
		const apiKey = "d29e1942e44de0965186873d8d6223e5";
		IDArray.map(async (id) => {
			const res = await axios({
				url: `https://api.themoviedb.org/3/movie/${id}`,
				params: {
					api_key: apiKey,
				},
			});
			movieObjectsArray.push(res.data);
			if (movieObjectsArray.length === IDArray.length) {
				setMovieData(movieObjectsArray);
			}
		});
	}, [list]);

	const genres = [];
	movieData.map((i) => {
		genres.push(i.genres);
	});
	// console.log(genres);

	const runTimes = [];
	movieData.map((i) => {
		runTimes.push(i.runtime);
	});
	// console.log(runTimes);

	const returnValue = (value) => {
		console.log(value);
		setMatchedMovie(value);
		setNewSearch(true);
	};
	console.log(matchedMovie);

	// useEffect = (()=>{

	// },[matchedMovie])

	return (
		<div className="wrapper">
			<ListSearch
				genres={genres}
				runTimes={runTimes}
				ids={IDArray}
				returnValue={returnValue}
			/>

			{newSearch === false ? (
				<div className="listMovies">
					<h2>{selectedList}</h2>
					<div className="posterContainer">
						{movieData.map((i) => {
							return (
								<MovieCardDisplay
									posterPath={i.poster_path}
									altText={i.title}
									key={i.id}
								/>
							);
						})}
					</div>
				</div>
			) : (
				<MovieDisplay movieID={matchedMovie} />
			)}
		</div>
	);
};
export default SetList;
