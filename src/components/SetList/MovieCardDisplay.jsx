function MovieCardDisplay(props){
    const imageURL = "https://image.tmdb.org/t/p/w200";

    return (
		<div className="poster">
			<img
					src={`${imageURL}${props.posterPath}`}
					alt={props.altText}
				/>
		</div>
	)
}

export default MovieCardDisplay;