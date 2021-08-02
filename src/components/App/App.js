import ListSearch from "../MovieDisplay/karim";
import MovieDisplay from "../MovieDisplay/MovieDisplay";

function App() {
	return (
		<div className="App">
			<header>
				<h1>Quick Flick Picker</h1>
			</header>

			<main>
				{/* <MovieDisplay /> */}
				<ListSearch/>
			</main>

			<footer></footer>
		</div>
	);
}

export default App;
