import SetList from "../SetList/SetList";
import MainPage from "../MainPage/MainPage";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Link to="/">
            <h1>QuickFlickPix</h1>
          </Link>
        </header>
        <main>
          <Route exact path="/" component={MainPage} />
          <Route path="/list/:listname" component={SetList} />
        </main>
        <footer>
          <a href="https://junocollege.com/">Create at Juno College</a>
        </footer>
      </div>
    </Router>
  );
}
export default App;
