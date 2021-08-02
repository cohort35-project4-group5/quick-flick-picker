const SearchedMoviesList = (props) => {
  return (
    <div className="searchedMoviesList">
      <ul>
        {props.moviesArray.map((movieObj, i) => {
          return (
            <li className="movieContainer" key={i}>
              <p>ID: {movieObj}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchedMoviesList;
