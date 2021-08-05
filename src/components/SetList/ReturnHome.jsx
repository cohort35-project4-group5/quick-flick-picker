import { Link, Route } from "react-router-dom";
import MainPage from "../MainPage/MainPage";

const ReturnHome = () => {
	return (
		<div className="returnHome">
			<Link to="/"><p>Home</p></Link>
		</div>
	);
};
export default ReturnHome;
