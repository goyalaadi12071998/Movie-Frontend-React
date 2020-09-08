import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
class Movies extends Component {
    state = {  
        movies: getMovies()
    }

    handleDeleteMovie = (movie) => {
        //console.log(movie);
        const movies = this.state.movies.filter(mv => mv._id !== movie._id);
        //console.log(movies);
        this.setState({movies: movies});
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        //console.log(movies);
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies: movies});
    }

    render() { 
        const {length: totalMovies} = this.state.movies;
        if(totalMovies === 0) return <h3>There is no movie in the database.</h3>
        return (
            <React.Fragment>
                <h3>Showing results for {totalMovies} movies</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Rate</th>
                            <th>Stock</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>{movie.numberInStock}</td>
                                <td>
                                    <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
                                </td>
                                <td>
                                    <button onClick={() => this.handleDeleteMovie(movie)} className="btn btn-danger btn-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </React.Fragment>    
        );
    }
}
 
export default Movies;