import SetList from "../SetList/SetList";
import MovieCardDisplay from "../SetList/SetList";
import ListSearch from "../ListSearch/ListSearch";

function App() {
	return (
		<div className="App">
			<header>
				<h1>Quick Flick Picker</h1>
			</header>

			<main>
				{/* <MovieDisplay /> */}

				<SetList/>
			</main>

			<footer></footer>
		</div>
	);
}

export default App;
