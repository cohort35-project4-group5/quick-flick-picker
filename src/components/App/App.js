import SetList from "../SetList/SetList";
import MovieDisplay from "../MovieDisplay/MovieDisplay";
import MainPage from "../MainPage/MainPage";
import ListModal from "../ListModal/ListModal";

function App() {
	return (
		<div className="App">
			<header>
				<h1>Quick Flick Picker</h1>
			</header>


			<main>
				{/* <MovieDisplay /> */}
				{/* <MainPage /> */}
				<SetList />
				{/* <ListModal /> */}
			</main>

			<footer></footer>
		</div>
	);
}

export default App;
