import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import {paginate} from '../utils/paginate';
import {getGenres} from '../services/fakeGenreService';
import ListGroup from './common/listGroup';

class Movies extends Component {
    state = {  
        movies: [],
        genres: [],
        pageSize: 3,
        currentPage:1,

    }

    componentDidMount() {
        const genres = [{name: 'All Genres'},...getGenres()]
        this.setState({movies: getMovies() , genres: genres});
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

    handlePageChange = (page) => {
        console.log(page);
        this.setState({currentPage: page});
    }

    handleGenreSelect = (genre) => {
        console.log(genre);
        this.setState({selectedGenre: genre, currentPage:1});
    }

    render() { 
        const {length: totalMovies} = this.state.movies;
        const { pageSize, currentPage , movies , selectedGenre } = this.state;
        if(totalMovies === 0) return <h3>There is no movie in the database.</h3>

        const filtered = selectedGenre && selectedGenre._id ? movies.filter(m => m.genre._id === selectedGenre._id) : movies;
        
        const moviesPaginationData = paginate(filtered,currentPage,pageSize);
        console.log(this.state.genres);
        return (
            <div className="container-fluid" style={{margin:"20px"}}> 
                <div className="row">
                    <div className="col-lg-2">
                        <ListGroup 
                            items={this.state.genres} 
                            onItemSelect={this.handleGenreSelect}
                            selectedItem={this.state.selectedGenre}
                        />
                    </div>
                    <div className="col-lg-10">
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
                                {moviesPaginationData.map(movie => (
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
                        <Pagination 
                            itemsCount={filtered.length} 
                            pageSize={pageSize} 
                            onPageChange={this.handlePageChange} 
                            currentPage={currentPage}
                        />
                    </div>    
                </div>
            </div>    
        );
    }
}
 
export default Movies;