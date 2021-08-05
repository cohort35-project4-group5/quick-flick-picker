import SetList from "../SetList/SetList";
import MainPage from "../MainPage/MainPage";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className="App wrapper">
				<header>
					<h1>QuickFlickPix</h1>
				</header>
				<main>
					<Route exact path="/" component={MainPage} />
					<Route path="/list/:listname" component={SetList} />
				</main>
				<footer></footer>
			</div>
		</Router>
	);
}
export default App;
