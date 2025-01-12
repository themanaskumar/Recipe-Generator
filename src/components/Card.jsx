import React from 'react';
import './Card.css';

const Card = (props) => {
  return (
    <div className='card'>
        <img src={props.imgPath} alt={props.altText} />
        <h2>{props.title}</h2>
        <button onClick={props.onViewClick}>View</button>
    </div>
  )
}

export default Card
