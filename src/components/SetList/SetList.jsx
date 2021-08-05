import firebase from "../../firebase.js";
import { useState, useEffect } from "react";
import axios from "axios";

// npm install sweetalert2
// import Swal from 'sweetalert2'
import Swal from "sweetalert2";
import MovieCardDisplay from "./MovieCardDisplay.jsx";
import ListSearch from "../ListSearch/ListSearch.jsx";
import MovieDisplay from "../MovieDisplay/MovieDisplay.js";
import ReturnHome from "./ReturnHome.jsx";

const SetList = (props) => {
	const [list, setList] = useState([]);
	const [matchedMovie, setMatchedMovie] = useState("");
	const [newSearch, setNewSearch] = useState(false);

	// Get list from main page list of lists, pass as a prop
	const selectedList = props.match.params.listname;

	const [movieData, setMovieData] = useState([]);

	// const errorHandling = () => {
	// 	Swal.fire({
	// 		title: "Error!",
	// 		text: "Unable to find that movie. Please try again!",
	// 		icon: "error",
	// 		confirmButtonText: "OK",
	// 	});
	// };

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

	// Figure out ListKey to pass listkey value to movieCardDisplay;
	let targetKey = "";
	let listToDisplay = [];
	for (const item in list) {
		if (list[item].listName === selectedList) {
			listToDisplay.push(list[item].movieList);
			targetKey = list[item].key;
		}
	}
	listToDisplay = listToDisplay.shift();

	let IDArray = [];
	for (const movie in listToDisplay) {
		IDArray.push(listToDisplay[movie]);
	}
	// Filter IDArray to prevent duplicates being added to list
	IDArray = IDArray.filter((item, pos) => {
		return IDArray.indexOf(item) == pos;
	});

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

	const runTimes = [];
	movieData.map((i) => {
		runTimes.push(i.runtime);
	});

	const returnValue = (value) => {
		setMatchedMovie(value);
		setNewSearch(true);
	};

	return (
		<div className="wrapper">
			<ListSearch
				genres={genres}
				runTimes={runTimes}
				ids={IDArray}
				returnValue={returnValue}
			/>
			<ReturnHome/>

			{newSearch === false ? (
				<div className="listMovies">
					<h2>{selectedList}</h2>
					<div className="posterContainer">
						{movieData.map((i) => {
							return (
								<MovieCardDisplay
									posterPath={i.poster_path}
									altText={i.title}
									selectedList={targetKey}
									list={listToDisplay}
									id={i.id}
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
