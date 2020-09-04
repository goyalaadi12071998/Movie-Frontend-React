import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from '../components/common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';

class Movies extends Component {
    state = { 
        movies: getMovies(),
        pageSize: 3,
        currentPage: 1
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(singleMovie => singleMovie._id !== movie._id);
        this.setState({movies: movies});
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies: movies});
    };

    handlePageChange = page => {
        //console.log(page);
        this.setState({currentPage: page});
    }

    render() {
        if(this.state.movies.length === 0) return <h1>There is no movies in the database.</h1>
        const count = this.state.movies.length;
        const { movies: allMovies , currentPage , pageSize } = this.state;
        const movies = paginate(allMovies,currentPage,pageSize);
        return (
        <div>
            <div>
                <p ><strong>There are {this.state.movies.length} in the database.</strong></p>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)} /></td>
                                <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <Pagination
                    itemsCount={count}
                    pageSize={this.state.pageSize} 
                    onPageChange={this.handlePageChange} 
                    currentPage={this.state.currentPage}
                />
            </div>
        </div>
    )}
}
 
export default Movies;