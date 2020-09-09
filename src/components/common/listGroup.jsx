import React from 'react';

const ListGroup = (props) => {
    const { items, onItemSelect, selectedItem } = props;
    return (  
        <ul className="list-group">
            {items.map(item => (
                <li 
                    key={item._id} 
                    className={selectedItem===item?"list-group-item active":"list-group-item"}
                    onClick={() => onItemSelect(item)}
                >
                {item.name}
                </li> 
        ))}
        </ul>
    );
}
 
export default ListGroup;