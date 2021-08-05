import { Link, Route } from "react-router-dom";
import MainPage from "../MainPage/MainPage";

const ReturnHome = () => {
	return (
		<div className="returnHome">
			<Link to="/">Home</Link>
			<Route exact path="/" component={MainPage} />
		</div>
	);
};
export default ReturnHome;
