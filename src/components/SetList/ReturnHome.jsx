import { Link, Route } from "react-router-dom";
import MainPage from "../MainPage/MainPage";

const ReturnHome = () => {
	return (
		<Link to="/">
			<div className="returnHome">
				<p>Home</p>
				<Route exact path="/" component={MainPage} />
			</div>
		</Link>
	);
};
export default ReturnHome;
