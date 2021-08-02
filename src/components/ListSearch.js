import firebase from "./firebase";
import { useState } from 'react';


function ListSearch() {
    const {genre, setGenre}=useState('');
    const {time, setTime}=useState('');

	return (
		<div className="searchBox">
			<form>
				<label
					for="movieList">
					Choose
				</label>
				<select id="movieOptions" name="Movies">
					<option value="option">Option</option>
					<option value="option">Option</option>
					<option value="option">Option</option>
				</select>
				<input type="submit"></input>
                <select id="movieOptions" name="Movies">
					<option value="option">Option</option>
					<option value="option">Option</option>
					<option value="option">Option</option>
				</select>
				<input type="submit"></input>
			</form>

		</div>
	);
}
export default ListSearch;