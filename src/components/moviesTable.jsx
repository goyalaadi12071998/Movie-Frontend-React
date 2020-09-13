import React from 'react';
import Like from './common/like';
import { Link } from 'react-router-dom';

const MoviesTable = (props) => {
    
    const { moviesPaginationData, onDelete, onLike } = props;
    
    return (  
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
                        <Link to={`/movies/${movie._id}`}><td>{movie.title}</td></Link>
                        <td>{movie.genre.name}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td>{movie.numberInStock}</td>
                        <td>
                            <Like liked={movie.liked} onClick={() => onLike(movie)} />
                        </td>
                        <td>
                            <button onClick={() => onDelete(movie)} className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
 
export default MoviesTable;