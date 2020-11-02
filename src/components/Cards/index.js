import React from 'react';

import './styles.css';

export default function Cards({ cards }) {
  return (
    <div className='col-sm-3 mt-3 mb-3'>
      <div className='card text-center'>
        <div className='card-footer'>
          <img src={cards.img} className='card-img-top' alt={cards.name} />
          <div className='card-body mt-3'>
            <h5 className='card-title'>{cards.name}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
