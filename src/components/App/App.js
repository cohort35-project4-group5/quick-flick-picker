import SetList from "../SetList/SetList";
import MainPage from "../MainPage/MainPage";

function App() {
	return (
		<div className="App">
			<header>
				<h1>Quick Flick Picker</h1>
			</header>

			<main>
				{/* <MovieDisplay /> */}
				<MainPage />
				<SetList />
			</main>

			<footer></footer>
		</div>
	);
}

export default App;
