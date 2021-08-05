import SetList from "../SetList/SetList";
import MovieDisplay from "../MovieDisplay/MovieDisplay";
import MainPage from "../MainPage/MainPage";
import ListModal from "../ListModal/ListModal";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Quick Flick Picker</h1>
        </header>
        <main>
          <Route exact path="/" component={MainPage} />
          <Route path="/list" component={SetList} />
        </main>
        <footer></footer>
      </div>
    </Router>
  );
}

export default App;
